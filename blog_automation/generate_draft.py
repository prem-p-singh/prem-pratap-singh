#!/usr/bin/env python3
import argparse
import datetime as dt
import os
import re
import smtplib
import urllib.parse
from pathlib import Path
from typing import Dict, List, Tuple

import feedparser
import requests
import yaml
from PyPDF2 import PdfReader
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

STOPWORDS = {
    "the", "and", "for", "with", "that", "from", "this", "are", "was", "were", "have", "has",
    "had", "into", "your", "you", "our", "their", "about", "using", "used", "use", "based",
    "study", "research", "analysis", "results", "method", "methods", "model", "models", "data",
    "journal", "university", "department", "email", "phone", "address", "curriculum", "vitae",
    # Common name fragments that leak from CV author/reference lists
    "singh", "kumar", "prem", "pratap", "prof", "dr",
    "gupta", "sharma", "verma", "mishra", "pandey", "yadav", "jain", "agrawal",
    "wang", "zhang", "chen", "li", "liu", "yang",
}


def load_config(path: Path) -> Dict:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def extract_text_from_pdf(pdf_path: Path) -> str:
    if not pdf_path.exists():
        raise FileNotFoundError(f"CV PDF not found: {pdf_path}. Set CV_PDF_PATH env var or update config.yaml.")
    reader = PdfReader(str(pdf_path))
    text_parts = []
    for page in reader.pages:
        text_parts.append(page.extract_text() or "")
    return "\n".join(text_parts)


def extract_keywords(text: str, top_n: int) -> List[str]:
    words = re.findall(r"[A-Za-z][A-Za-z\-]{3,}", text.lower())
    freq: Dict[str, int] = {}
    for w in words:
        if w in STOPWORDS:
            continue
        freq[w] = freq.get(w, 0) + 1
    ranked = sorted(freq.items(), key=lambda kv: kv[1], reverse=True)
    return [w for w, _ in ranked[:top_n]]


def fetch_arxiv(keyword: str, max_items: int) -> List[Dict]:
    q = requests.utils.quote(keyword)
    url = f"https://export.arxiv.org/api/query?search_query=all:{q}&start=0&max_results={max_items}"
    feed = feedparser.parse(url)
    out = []
    for e in feed.entries[:max_items]:
        out.append({
            "title": e.get("title", "").strip().replace("\n", " "),
            "link": e.get("link", ""),
            "summary": (e.get("summary", "") or "").strip().replace("\n", " "),
            "source": "arXiv",
        })
    return out


def fetch_google_news(keyword: str, max_items: int) -> List[Dict]:
    q = requests.utils.quote(keyword)
    url = f"https://news.google.com/rss/search?q={q}%20when:1d&hl=en-US&gl=US&ceid=US:en"
    feed = feedparser.parse(url)
    out = []
    for e in feed.entries[:max_items]:
        out.append({
            "title": e.get("title", "").strip().replace("\n", " "),
            "link": e.get("link", ""),
            "summary": (e.get("summary", "") or "").strip().replace("\n", " "),
            "source": "Google News",
        })
    return out


def gather_sources(keywords: List[str], max_per_keyword: int, use_news: bool) -> List[Dict]:
    seen = set()
    merged = []
    for kw in keywords:
        items = fetch_arxiv(kw, max_per_keyword)
        if use_news:
            items.extend(fetch_google_news(kw, max_per_keyword))
        for item in items:
            key = item["link"]
            if not key or key in seen:
                continue
            seen.add(key)
            item["keyword"] = kw
            merged.append(item)
    return merged[:30]


def sample_sources(keywords: List[str]) -> List[Dict]:
    out = []
    for i, kw in enumerate(keywords[:5], start=1):
        out.append(
            {
                "title": f"Sample update {i} for {kw}",
                "link": f"https://example.com/{kw.replace(' ', '-')}/{i}",
                "summary": f"Synthetic source for offline local testing of {kw}.",
                "source": "Sample",
                "keyword": kw,
            }
        )
    return out


def markdown_links(sources: List[Dict]) -> str:
    lines = []
    for i, s in enumerate(sources, start=1):
        lines.append(f"{i}. [{s['title']}]({s['link']}) ({s['source']}, keyword: `{s['keyword']}`)")
    return "\n".join(lines)


def build_prompt(site_title: str, keywords: List[str], sources: List[Dict], today: str) -> str:
    links_md = markdown_links(sources)
    return f"""
You are writing a blog post draft for {site_title}.
Date: {today}

Required outcome:
- Return valid MDX body content only (no frontmatter block).
- Start with a short intro paragraph (no top-level # heading).
- Include sections: ## Why this matters, ## What changed today, ## My research angle, ## References.
- Keep factual claims grounded in provided sources.
- In References, include markdown links exactly from the provided list.
- Tone: professional, thoughtful, suitable for a personal research website.
- Keep it concise (700-1100 words).

Author keyword profile:
{', '.join(keywords)}

Source links:
{links_md}
""".strip()


def generate_with_openai(prompt: str, model: str) -> str:
    if OpenAI is None:
        raise RuntimeError("openai package not available")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    client = OpenAI(api_key=api_key)
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )
    return resp.choices[0].message.content.strip()


def build_title(keywords: List[str], today: str) -> str:
    key = keywords[0].replace("-", " ").title() if keywords else "Research"
    return f"Daily Research Update: {key} ({today})"


def build_description(keywords: List[str]) -> str:
    short = ", ".join(k.replace("-", " ") for k in keywords[:4])
    return f"A daily brief linking current developments in {short}."


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9\s-]", "", text.lower())
    slug = re.sub(r"[\s_-]+", "-", slug).strip("-")
    return slug[:90]


def build_frontmatter(title: str, date_iso: str, description: str, tags: List[str]) -> str:
    tags_line = "[" + ", ".join(f'\"{t}\"' for t in tags[:6]) + "]"
    safe_title = title.replace('"', '\\"')
    safe_description = description.replace('"', '\\"')
    return (
        "---\n"
        f'title: "{safe_title}"\n'
        f'date: "{date_iso}"\n'
        f'description: "{safe_description}"\n'
        f"tags: {tags_line}\n"
        "---\n"
    )


def save_pending_mdx(frontmatter: str, body: str, pending_dir: Path, title: str) -> Tuple[Path, str]:
    pending_dir.mkdir(parents=True, exist_ok=True)
    ts = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    base_slug = slugify(title)
    filename = f"{ts}--{base_slug}.mdx"
    path = pending_dir / filename
    with path.open("w", encoding="utf-8") as f:
        f.write(frontmatter)
        f.write("\n")
        f.write(body.strip())
        f.write("\n")
    return path, base_slug


def build_publish_url(cfg: Dict, draft_filename: str, slug: str) -> str:
    """Build a GitHub Actions workflow_dispatch URL for one-click publish."""
    gh = cfg.get("github", {})
    owner = gh.get("owner", "")
    repo = gh.get("repo", "")
    if not owner or not repo:
        return ""
    # GitHub workflow_dispatch URL that pre-fills the inputs
    return (
        f"https://github.com/{owner}/{repo}/actions/workflows/publish-draft.yml"
        f"?inputs%5Bdraft_filename%5D={urllib.parse.quote(draft_filename)}"
        f"&inputs%5Bslug%5D={urllib.parse.quote(slug)}"
    )


def build_email_html(slug: str, draft_filename: str, draft_preview: str, publish_url: str) -> str:
    """Build an HTML email with draft preview and one-click publish button."""
    preview_html = draft_preview.replace("\n", "<br>").replace(" ", "&nbsp;")
    publish_button = ""
    if publish_url:
        publish_button = f"""
        <div style="margin: 24px 0; text-align: center;">
          <a href="{publish_url}"
             style="display: inline-block; padding: 14px 32px; background: #0e7490;
                    color: white; text-decoration: none; border-radius: 8px;
                    font-size: 16px; font-weight: 600;">
            &#9889; Publish This Draft Now
          </a>
          <p style="margin-top: 8px; font-size: 12px; color: #78716c;">
            Opens GitHub Actions &mdash; click &ldquo;Run workflow&rdquo; to publish instantly
          </p>
        </div>
        """

    return f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px; margin: 0 auto; color: #1c1917;">
      <div style="background: linear-gradient(135deg, #0e7490, #d97706); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 20px;">&#128221; New Blog Draft Ready</h1>
        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
          Slug: <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">{slug}</code>
        </p>
      </div>

      <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-top: none;
                  padding: 20px; border-radius: 0 0 12px 12px;">
        {publish_button}

        <h3 style="margin: 16px 0 8px; color: #0e7490; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          Draft Preview
        </h3>
        <div style="background: white; border: 1px solid #e7e5e4; border-radius: 8px;
                    padding: 16px; font-family: monospace; font-size: 12px;
                    line-height: 1.5; color: #44403c; max-height: 400px; overflow-y: auto;">
          {preview_html}
        </div>

        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e7e5e4;">
          <p style="font-size: 13px; color: #78716c; margin: 0;">
            <strong>Or publish manually:</strong><br>
            <code style="background: #f5f5f4; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
              python blog_automation/approve_and_publish.py
            </code>
          </p>
        </div>
      </div>
    </div>
    """


def send_email_notification(cfg: Dict, subject: str, plain_text: str, html_body: str = ""):
    email_cfg = cfg.get("notifications", {}).get("email", {})
    if not email_cfg.get("enabled", False):
        return

    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", str(email_cfg.get("port", 587))))
    smtp_user = os.getenv("SMTP_USERNAME")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    email_from = os.getenv("EMAIL_FROM")
    email_to = os.getenv("EMAIL_TO")
    if not all([smtp_host, smtp_user, smtp_pass, email_from, email_to]):
        raise RuntimeError("Email notification enabled but SMTP env vars are incomplete.")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = email_from
    msg["To"] = email_to

    msg.attach(MIMEText(plain_text, "plain"))
    if html_body:
        msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


def send_telegram_notification(cfg: Dict, message: str):
    tg_cfg = cfg.get("notifications", {}).get("telegram", {})
    if not tg_cfg.get("enabled", False):
        return

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        raise RuntimeError("Telegram notification enabled but TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID missing.")

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    resp = requests.post(url, json={"chat_id": chat_id, "text": message}, timeout=20)
    if resp.status_code >= 300:
        raise RuntimeError(f"Telegram notification failed: {resp.status_code} {resp.text}")


def notify_new_draft(cfg: Dict, draft_path: Path, slug: str, draft_content: str):
    draft_filename = draft_path.name
    subject = f"[Blog Draft] New pending draft: {slug}"

    # Build one-click publish URL
    publish_url = build_publish_url(cfg, draft_filename, slug)

    # Plain text fallback
    plain_text = (
        f"A new pending draft was created.\n\n"
        f"File: {draft_path}\n"
        f"Slug: {slug}\n\n"
    )
    if publish_url:
        plain_text += f"Publish instantly:\n{publish_url}\n\n"
    plain_text += (
        "Or publish manually:\n"
        "python blog_automation/approve_and_publish.py"
    )

    # Draft preview (first 30 lines)
    preview_lines = draft_content.strip().splitlines()[:30]
    draft_preview = "\n".join(preview_lines)

    # HTML email with publish button
    html_body = build_email_html(slug, draft_filename, draft_preview, publish_url)

    strict = bool(cfg.get("notifications", {}).get("fail_on_error", False))
    errors = []

    try:
        send_email_notification(cfg, subject, plain_text, html_body)
    except Exception as e:
        errors.append(f"Email: {e}")

    try:
        send_telegram_notification(cfg, plain_text)
    except Exception as e:
        errors.append(f"Telegram: {e}")

    if errors:
        text = " | ".join(errors)
        if strict:
            raise RuntimeError(f"Notification error(s): {text}")
        print(f"Warning: notification error(s): {text}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a daily MDX blog draft from CV keywords + daily updates")
    parser.add_argument("--config", default="./blog_automation/config/config.yaml", help="Path to YAML config")
    parser.add_argument("--offline", action="store_true", help="Use synthetic sources and skip network/LLM for local testing")
    args = parser.parse_args()

    cfg = load_config(Path(args.config))
    cv_path = Path(os.getenv("CV_PDF_PATH", cfg["content"]["cv_pdf_path"]))
    manual_keywords = cfg["content"].get("manual_keywords", [])
    keyword_count = int(cfg["content"].get("keyword_count", 10))
    max_per_keyword = int(cfg["content"].get("max_sources_per_keyword", 2))

    cv_text = extract_text_from_pdf(cv_path)
    cv_keywords = extract_keywords(cv_text, keyword_count)
    keywords = list(dict.fromkeys(manual_keywords + cv_keywords))[:keyword_count]

    use_news = bool(cfg["feeds"].get("google_news_rss", True))
    if args.offline:
        sources = sample_sources(keywords)
    else:
        sources = gather_sources(keywords, max_per_keyword, use_news)
    if not sources:
        raise RuntimeError("No sources fetched. Check internet connectivity or keyword quality.")

    today = dt.date.today().isoformat()
    site_title = cfg["site"]["title"]
    use_openai = bool(cfg["llm"].get("use_openai", True))
    model = cfg["llm"].get("model", "gpt-4o-mini")

    if use_openai and not args.offline:
        prompt = build_prompt(site_title, keywords, sources, today)
        body = generate_with_openai(prompt, model)
    else:
        body = (
            "This is a generated daily summary draft.\n\n"
            "## Why this matters\n\n"
            "## What changed today\n\n"
            "## My research angle\n\n"
            "## References\n\n"
            + markdown_links(sources[:10])
        )

    title = build_title(keywords, today)
    description = build_description(keywords)
    tags = [k.replace("-", " ") for k in keywords[:6]]
    frontmatter = build_frontmatter(title, today, description, tags)
    body += "\n\n> Status: PENDING_APPROVAL\n"

    full_content = frontmatter + "\n" + body.strip() + "\n"
    out, slug = save_pending_mdx(frontmatter, body, Path("./blog_automation/drafts/pending"), title)
    print(f"Draft created: {out}")
    print(f"Suggested slug: {slug}")
    notify_new_draft(cfg, out, slug, full_content)


if __name__ == "__main__":
    main()
