#!/usr/bin/env python3
import argparse
import difflib
import logging
import re
import shutil
import time
from pathlib import Path

import requests
import yaml

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("approve_publish")


def load_config(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def list_pending(pending_dir: Path):
    return sorted(pending_dir.glob("*.mdx"))


def extract_slug_from_filename(path: Path) -> str:
    name = path.stem
    if "--" in name:
        return name.split("--", 1)[1]
    return name


def ensure_unique_destination(base_dir: Path, slug: str) -> Path:
    candidate = base_dir / f"{slug}.mdx"
    if not candidate.exists():
        return candidate

    i = 2
    while True:
        candidate = base_dir / f"{slug}-{i}.mdx"
        if not candidate.exists():
            return candidate
        i += 1


def split_frontmatter_and_body(raw: str):
    if raw.startswith("---\n"):
        end_idx = raw.find("\n---\n", 4)
        if end_idx != -1:
            return raw[: end_idx + 5], raw[end_idx + 5 :].strip()
    return "", raw.strip()


def normalize_text(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"`[^`]+`", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text.lower())
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_reference_links(body: str):
    match = re.search(r"^##\s+References\s*$([\s\S]*)", body, flags=re.M)
    if not match:
        return []
    refs_block = match.group(1)
    return re.findall(r"\[[^\]]+\]\((https?://[^)]+)\)", refs_block)


def check_links_reachable(links, timeout_sec: int, delay: float = 0.5):
    bad = []
    for i, link in enumerate(links):
        # Rate limit between requests
        if i > 0 and delay > 0:
            time.sleep(delay)
        try:
            log.info(f"  Checking link {i + 1}/{len(links)}: {link[:80]}")
            r = requests.head(link, allow_redirects=True, timeout=timeout_sec)
            if r.status_code >= 400 or r.status_code < 200:
                r = requests.get(link, allow_redirects=True, timeout=timeout_sec)
                if r.status_code >= 400 or r.status_code < 200:
                    log.warning(f"  Unreachable ({r.status_code}): {link}")
                    bad.append((link, r.status_code))
        except Exception:
            log.warning(f"  Error reaching: {link}")
            bad.append((link, "error"))
    return bad


def max_similarity_with_existing(draft_body: str, content_dir: Path):
    draft_norm = normalize_text(draft_body)
    max_ratio = 0.0
    max_file = None

    for p in sorted(content_dir.glob("*.mdx")):
        try:
            raw = p.read_text(encoding="utf-8")
        except Exception:
            continue
        _, body = split_frontmatter_and_body(raw)
        body_norm = normalize_text(body)
        if not body_norm:
            continue
        ratio = difflib.SequenceMatcher(None, draft_norm, body_norm).ratio()
        if ratio > max_ratio:
            max_ratio = ratio
            max_file = p
    return max_ratio, max_file


def run_quality_guards(raw_text: str, cfg: dict, content_dir: Path):
    guards = cfg.get("guards", {})
    min_links = int(guards.get("min_reference_links", 4))
    check_reachability = bool(guards.get("check_link_reachability", True))
    timeout_sec = int(guards.get("link_timeout_seconds", 8))
    link_check_delay = float(guards.get("link_check_delay", 0.5))
    plagiarism_threshold = float(guards.get("max_similarity_ratio", 0.72))

    _, body = split_frontmatter_and_body(raw_text)
    refs = extract_reference_links(body)
    errors = []

    # Guard 1: References section exists
    if "## References" not in body:
        log.warning("Missing '## References' section")
        errors.append("Missing '## References' section.")

    # Guard 2: Minimum reference links
    if len(refs) < min_links:
        log.warning(f"Reference links too few: {len(refs)}/{min_links}")
        errors.append(f"Reference links too few: found {len(refs)}, need at least {min_links}.")
    else:
        log.info(f"Reference links: {len(refs)} (min: {min_links})")

    # Guard 3: Link reachability (rate-limited)
    if check_reachability and refs:
        log.info(f"Checking {len(refs)} reference links (delay={link_check_delay}s)...")
        bad_links = check_links_reachable(refs, timeout_sec, delay=link_check_delay)
        if bad_links:
            bad_preview = ", ".join(f"{u} ({s})" for u, s in bad_links[:3])
            log.warning(f"Unreachable links: {bad_preview}")
            errors.append(f"Unreachable reference links detected: {bad_preview}")
        else:
            log.info("All reference links reachable")

    # Guard 4: Plagiarism/similarity check
    log.info("Running similarity check against existing posts...")
    sim_ratio, sim_file = max_similarity_with_existing(body, content_dir)
    if sim_ratio > plagiarism_threshold:
        log.warning(f"High similarity: {sim_ratio:.2f} (threshold: {plagiarism_threshold})")
        errors.append(
            f"Plagiarism/self-duplication risk: similarity {sim_ratio:.2f} exceeds {plagiarism_threshold:.2f}"
            + (f" (closest: {sim_file})" if sim_file else "")
        )
    else:
        log.info(f"Similarity check passed: {sim_ratio:.2f} (threshold: {plagiarism_threshold})")

    return errors


def main() -> None:
    parser = argparse.ArgumentParser(description="Approve and publish pending MDX draft to content/blog")
    parser.add_argument("--config", default="./blog_automation/config/config.yaml")
    parser.add_argument("--file", default=None, help="Specific pending draft file")
    parser.add_argument("--yes", action="store_true", help="Skip interactive confirmation")
    parser.add_argument("--force", action="store_true", help="Bypass quality guards and publish anyway")
    args = parser.parse_args()

    cfg = load_config(Path(args.config))
    pending_dir = Path("./blog_automation/drafts/pending")
    content_dir = Path(cfg["site"]["blog_content_dir"])
    content_dir.mkdir(parents=True, exist_ok=True)

    if args.file:
        src = Path(args.file)
        if not src.exists():
            raise FileNotFoundError(f"Draft not found: {src}")
    else:
        drafts = list_pending(pending_dir)
        if not drafts:
            log.info("No pending drafts to publish.")
            return
        src = drafts[-1]

    log.info(f"Selected draft: {src}")
    log.info("Preview (first 35 lines):")
    raw_text = ""
    with src.open("r", encoding="utf-8") as f:
        raw_text = f.read()
        for i, line in enumerate(raw_text.splitlines()):
            if i >= 35:
                break
            print(line.rstrip("\n"))

    if not args.force:
        log.info("Running quality guards...")
        errors = run_quality_guards(raw_text, cfg, content_dir)
        if errors:
            log.error("Quality guards blocked publishing:")
            for e in errors:
                log.error(f"  - {e}")
            log.info("Fix draft and try again, or use --force to override.")
            return
        log.info("All quality guards passed.")
    else:
        log.info("Quality guards skipped (--force)")

    if not args.yes:
        reply = input("Publish this draft to content/blog for your website? [y/N]: ").strip().lower()
        if reply != "y":
            log.info("Cancelled. Draft remains pending.")
            return

    slug = extract_slug_from_filename(src)
    dst = ensure_unique_destination(content_dir, slug)

    # Strip the PENDING_APPROVAL marker before publishing
    clean_text = re.sub(r"\n*>\s*Status:\s*PENDING_APPROVAL\s*\n*", "\n", raw_text).rstrip() + "\n"
    with dst.open("w", encoding="utf-8") as f:
        f.write(clean_text)
    src.unlink()
    log.info(f"Published to site content: {dst}")
    log.info("Next: commit and deploy your site to make it live.")


if __name__ == "__main__":
    main()
