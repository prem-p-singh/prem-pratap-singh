#!/usr/bin/env python3
"""
Blog → Image + LinkedIn-post pipeline (single run).

For a published blog post, this script:
  1. Picks the target blog (latest by date or specified slug)
  2. Asks GPT-5.4 to write a Nature-Plants-style figure prompt for the post
  3. Generates that image via OpenAI's image API (gpt-image-1)
  4. Saves the figure to public/blog/<slug>/social-figure.png
  5. Asks GPT-5.4 to draft a LinkedIn post (with hook, ~75 words)
  6. Runs the humanizer over the post text
  7. Saves the post text to blog_automation/drafts/social/<slug>--linkedin.md
  8. Emails everything (post text inline + figure attached) to the user

Output is *never* posted automatically — LinkedIn does not provide a
public personal-posting API. The user copies the post text into LinkedIn
and uploads the attached image manually.

Usage
-----
    python blog_automation/social_post.py                      # latest blog
    python blog_automation/social_post.py --slug <slug>        # specific
    python blog_automation/social_post.py --no-image           # text only
    python blog_automation/social_post.py --offline            # mock, no API
"""

from __future__ import annotations

import argparse
import base64
import logging
import os
import re
import smtplib
import sys
import time
from email.mime.application import MIMEApplication
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional

import yaml

# Reuse helpers from the existing pipeline so behavior stays consistent.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_draft import (  # noqa: E402
    humanize_text,
    humanizer_selftest,
    load_config,
    call_openai_with_retry,
)

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("social_post")


# ── Blog selection ───────────────────────────────────────────────────────────

def split_frontmatter_and_body(raw: str) -> tuple[dict, str]:
    if raw.startswith("---\n"):
        end_idx = raw.find("\n---\n", 4)
        if end_idx != -1:
            fm_text = raw[4:end_idx]
            body = raw[end_idx + 5 :].strip()
            try:
                fm = yaml.safe_load(fm_text) or {}
            except Exception:
                fm = {}
            return fm, body
    return {}, raw.strip()


def _safe_slug(slug: str) -> str:
    """Strict slug validator: only [a-z0-9-_], no path separators or traversal."""
    if not re.fullmatch(r"[a-z0-9][a-z0-9_\-]{0,128}", slug or ""):
        raise ValueError(
            f"Invalid slug '{slug}'. Slugs may contain only lowercase letters, "
            "digits, hyphens, and underscores."
        )
    return slug


def find_blog_post(slug: Optional[str], content_dir: Path) -> tuple[Path, dict, str]:
    # Resolve content_dir to its canonical absolute path so we can verify the
    # final file lives inside it (defense in depth against path traversal).
    content_dir = content_dir.resolve()
    if slug:
        slug = _safe_slug(slug)
        path = (content_dir / f"{slug}.mdx").resolve()
        if not path.is_file() or content_dir not in path.parents:
            raise FileNotFoundError(f"No published post found for slug '{slug}'")
    else:
        candidates = sorted(content_dir.glob("*.mdx"))
        if not candidates:
            raise FileNotFoundError(f"No published posts in {content_dir}")
        # Sort by date in frontmatter, fall back to mtime
        def _date_key(p: Path) -> str:
            raw = p.read_text(encoding="utf-8")
            fm, _ = split_frontmatter_and_body(raw)
            return str(fm.get("date") or p.stat().st_mtime)
        candidates.sort(key=_date_key)
        path = candidates[-1]

    raw = path.read_text(encoding="utf-8")
    fm, body = split_frontmatter_and_body(raw)
    return path, fm, body


# ── Prompt builders ──────────────────────────────────────────────────────────

def build_image_prompt_request(title: str, description: str, body: str) -> str:
    body_snippet = body[:2500]
    return f"""
You are designing a single hero figure for a research blog post.

Blog title: {title}
Blog description: {description}

Blog body excerpt:
\"\"\"{body_snippet}\"\"\"

Write ONE image-generation prompt (text only, no preamble) that captures
the central scientific thesis of the post. The figure should:
- Be a clean editorial scientific illustration in the style of a Nature
  Plants journal cover. Muted earth tones, sage green, terracotta, deep
  purple accents, soft cream background.
- Be conceptual, not literal. Use cross-sections, point-cloud
  representations, or microscopy-style insets where relevant.
- Avoid any human figures, logos, or readable text labels other than
  short panel descriptors.
- Use a 16:9 aspect ratio framing.

Keep the prompt under 220 words. Output only the prompt text, no JSON, no
markdown headers, no quotes around it.
""".strip()


def build_linkedin_post_request(title: str, description: str, body: str, blog_url: str) -> str:
    body_snippet = body[:3500]
    return f"""
You are drafting a LinkedIn post that drives readers to a research blog.

Blog title: {title}
Blog description: {description}
Blog URL: {blog_url}

Blog body excerpt:
\"\"\"{body_snippet}\"\"\"

Write a LinkedIn post that follows ALL of these rules:

1. Open with a 1-3 word punchy hook on the first line, optionally followed
   by a one-line setup that creates a pattern break above the LinkedIn
   "see more" fold. Example pattern: "Resistant. Susceptible. Stressed."
2. Total length: 70-110 words (NOT including the URL or hashtags).
3. Use 2-3 specific concrete claims from the blog (named techniques,
   organisms, methods). No vague language.
4. End with a soft CTA line, NOT "click here" or marketing language.
5. Add the URL on its own line, optionally prefixed with the link emoji 🔗.
6. End with 4-5 relevant hashtags on a final line.

Hard style constraints:
- NO em dashes (—). Use commas, semicolons, or rewrite.
- NO marketing buzzwords: leverage, synergy, passionate, cutting-edge,
  innovative, dynamic, robust, groundbreaking, paradigm shift, next-gen.
- NO filler phrases: "in order to", "it is worth noting", "I am
  confident that".
- NO -ing padding ("leveraging my expertise" → state the expertise).
- NO rule-of-three flourishes unless there are genuinely three items.
- Plain, direct, researcher voice.

Output the post text only. No surrounding quotes. No JSON. No commentary
before or after.
""".strip()


# ── OpenAI image generation ──────────────────────────────────────────────────

def generate_image(prompt: str, cfg: dict) -> bytes:
    """Generate a hero image and return raw PNG bytes."""
    if OpenAI is None:
        raise RuntimeError("openai package not available")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    image_model = cfg.get("social", {}).get("image_model", "gpt-image-1")
    image_size = cfg.get("social", {}).get("image_size", "1536x1024")
    image_quality = cfg.get("social", {}).get("image_quality", "medium")

    max_retries = int(cfg.get("llm", {}).get("max_retries", 3))
    base_delay = float(cfg.get("llm", {}).get("retry_base_delay", 2.0))

    client = OpenAI(api_key=api_key)
    last_error: Optional[Exception] = None
    for attempt in range(1, max_retries + 1):
        try:
            log.info(f"Image API attempt {attempt}/{max_retries} (model={image_model}, size={image_size})")
            resp = client.images.generate(
                model=image_model,
                prompt=prompt,
                size=image_size,
                quality=image_quality,
                n=1,
            )
            data = resp.data[0]
            if getattr(data, "b64_json", None):
                return base64.b64decode(data.b64_json)
            url = getattr(data, "url", None)
            if url:
                import requests
                r = requests.get(url, timeout=30)
                r.raise_for_status()
                return r.content
            raise RuntimeError("Image API returned neither b64_json nor url")
        except Exception as e:
            last_error = e
            delay = base_delay * (2 ** (attempt - 1))
            log.warning(f"Image API attempt {attempt} failed: {e}. Retrying in {delay:.1f}s...")
            time.sleep(delay)
    raise RuntimeError(f"Image generation failed after {max_retries} attempts: {last_error}")


# ── Email delivery ───────────────────────────────────────────────────────────

def send_social_email(
    cfg: dict,
    subject: str,
    plain_text: str,
    html_body: str,
    image_bytes: Optional[bytes],
    image_filename: str,
    blog_url: str,
) -> None:
    email_cfg = cfg.get("notifications", {}).get("email", {})
    if not email_cfg.get("enabled", False):
        log.info("Email notifications disabled in config; skipping email.")
        return

    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", str(email_cfg.get("port", 587))))
    smtp_user = os.getenv("SMTP_USERNAME")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    email_from = os.getenv("EMAIL_FROM")
    email_to = os.getenv("EMAIL_TO")
    if not all([smtp_host, smtp_user, smtp_pass, email_from, email_to]):
        raise RuntimeError("Email enabled but SMTP env vars are incomplete.")

    outer = MIMEMultipart("mixed")
    outer["Subject"] = subject
    outer["From"] = email_from
    outer["To"] = email_to

    body_part = MIMEMultipart("alternative")
    body_part.attach(MIMEText(plain_text, "plain"))
    if html_body:
        body_part.attach(MIMEText(html_body, "html"))
    outer.attach(body_part)

    if image_bytes:
        img = MIMEImage(image_bytes, _subtype="png")
        img.add_header("Content-Disposition", "attachment", filename=image_filename)
        outer.attach(img)

    with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(outer)


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Generate hero image + LinkedIn post for a blog.")
    parser.add_argument("--config", default="./blog_automation/config/config.yaml")
    parser.add_argument("--slug", default=None, help="Specific published-post slug (default: latest)")
    parser.add_argument("--no-image", action="store_true", help="Skip image generation (text only)")
    parser.add_argument("--no-email", action="store_true", help="Skip email notification")
    parser.add_argument("--offline", action="store_true", help="Mock everything; no API calls")
    args = parser.parse_args()

    cfg = load_config(Path(args.config))
    site_url = cfg.get("site", {}).get("base_url", "https://www.prempsingh.com")
    content_dir = Path(cfg["site"]["blog_content_dir"])
    model = cfg["llm"].get("model", "gpt-5.4")

    # Pre-flight: catch humanizer regex bugs before any paid call.
    humanizer_selftest()

    # 1. Find the blog post
    path, fm, body = find_blog_post(args.slug, content_dir)
    slug = path.stem
    title = str(fm.get("title", slug))
    description = str(fm.get("description", ""))
    blog_url = f"{site_url.rstrip('/')}/blog/{slug}"
    log.info(f"Target blog: {slug}")
    log.info(f"Title: {title}")

    # 2. Build the image prompt via LLM (so each post gets a tailored figure)
    image_bytes: Optional[bytes] = None
    image_filename = f"{slug}--social.png"
    image_prompt = ""
    if not args.no_image:
        if args.offline:
            image_prompt = "[OFFLINE] mock image prompt for " + slug
            log.info("Skipping image generation (offline mode).")
        else:
            log.info("Drafting image prompt via LLM...")
            image_prompt = call_openai_with_retry(
                build_image_prompt_request(title, description, body), model, cfg
            )
            log.info(f"Image prompt ({len(image_prompt)} chars) drafted.")
            log.info("Generating image via OpenAI image API...")
            image_bytes = generate_image(image_prompt, cfg)
            log.info(f"Image generated ({len(image_bytes)} bytes).")

            # Save image to public/blog/<slug>/social-figure.png
            out_dir = Path("./public/blog") / slug
            out_dir.mkdir(parents=True, exist_ok=True)
            out_path = out_dir / "social-figure.png"
            out_path.write_bytes(image_bytes)
            log.info(f"Image saved: {out_path}")

    # 3. Draft the LinkedIn post via LLM, then humanize
    if args.offline:
        post_text = (
            "Resistant. Susceptible. Stressed.\n\n"
            "[OFFLINE] mock LinkedIn post for " + slug + ".\n\n"
            f"🔗 {blog_url}\n\n"
            "#PlantPathology #Viticulture #MultiOmics #GrapevineResearch"
        )
    else:
        log.info("Drafting LinkedIn post via LLM...")
        post_raw = call_openai_with_retry(
            build_linkedin_post_request(title, description, body, blog_url), model, cfg
        )
        post_text = humanize_text(post_raw)
        log.info(f"LinkedIn post ready ({len(post_text.split())} words).")

        # ── Domain guard: force the canonical blog URL ──
        # If the LLM hallucinated a different URL or omitted yours, fix it.
        allowed_host = re.sub(r"^https?://", "", site_url).rstrip("/")
        # Strip any URL not pointing to your domain
        def _strip_foreign_urls(m: re.Match) -> str:
            url = m.group(0)
            host_match = re.match(r"https?://([^/\s]+)", url)
            if host_match and allowed_host in host_match.group(1):
                return url
            return ""
        post_text = re.sub(r"https?://\S+", _strip_foreign_urls, post_text)
        # Make sure the canonical URL is present exactly once
        if blog_url not in post_text:
            post_text = post_text.rstrip() + f"\n\n🔗 {blog_url}\n"
            log.warning("LLM omitted blog URL; appended canonical URL.")

    # 4. Save post text + image-prompt next to it
    social_dir = Path("./blog_automation/drafts/social") / slug
    social_dir.mkdir(parents=True, exist_ok=True)
    text_path = social_dir / "linkedin.md"
    text_path.write_text(post_text + "\n", encoding="utf-8")
    log.info(f"LinkedIn post saved: {text_path}")
    if image_prompt:
        (social_dir / "image-prompt.txt").write_text(image_prompt + "\n", encoding="utf-8")

    # 5. Email the artifacts
    if not args.no_email:
        plain = (
            f"Blog: {title}\n"
            f"URL: {blog_url}\n\n"
            f"--- LinkedIn post ---\n\n"
            f"{post_text}\n\n"
            f"--- end ---\n\n"
            f"Image attached as {image_filename}.\n"
            f"Saved locally: {text_path}\n"
        )
        # Convert post text to HTML with line breaks preserved
        post_html = (
            post_text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\n", "<br>")
        )
        html = f"""
<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;color:#222;max-width:640px;margin:auto;padding:24px">
  <p style="color:#888;font-size:13px">New social-post draft for your blog.</p>
  <h2 style="margin-top:8px">{title}</h2>
  <p><a href="{blog_url}">{blog_url}</a></p>
  <hr style="border:none;border-top:1px solid #eee;margin:18px 0">
  <h3 style="margin-bottom:6px">LinkedIn post</h3>
  <div style="background:#fafafa;padding:14px 16px;border-radius:6px;border:1px solid #eee">
    <p style="margin:0">{post_html}</p>
  </div>
  <p style="color:#888;font-size:13px;margin-top:18px">
    Hero figure attached. Copy the post text above into LinkedIn and upload the attached image.
  </p>
</body></html>
""".strip()
        try:
            send_social_email(
                cfg,
                subject=f"[Blog → Social] {title}",
                plain_text=plain,
                html_body=html,
                image_bytes=image_bytes,
                image_filename=image_filename,
                blog_url=blog_url,
            )
            log.info("Notification email sent.")
        except Exception as e:
            log.warning(f"Email send failed (artifacts already saved): {e}")

    log.info("Done.")
    log.info(f"Files:")
    log.info(f"  - {text_path}")
    if image_bytes:
        log.info(f"  - public/blog/{slug}/social-figure.png")


if __name__ == "__main__":
    main()
