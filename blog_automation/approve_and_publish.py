#!/usr/bin/env python3
import argparse
import difflib
import logging
import os
import re
import shutil
import subprocess
import tempfile
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


def get_editor() -> str:
    """Return the user's preferred editor."""
    for var in ("VISUAL", "EDITOR"):
        editor = os.environ.get(var)
        if editor:
            return editor
    # Fallback chain: VS Code > nano > vi
    for candidate in ("code --wait", "nano", "vi"):
        binary = candidate.split()[0]
        if shutil.which(binary):
            return candidate
    return "vi"


def open_in_editor(file_path: Path) -> str:
    """Open a file in the user's editor and return the edited content."""
    editor = get_editor()
    log.info(f"Opening draft in editor: {editor}")
    log.info("Save and close the editor when you are done editing.")
    cmd = editor.split() + [str(file_path)]
    subprocess.run(cmd)
    return file_path.read_text(encoding="utf-8")


ALLOWED_IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}


def copy_figures(figure_paths: list[str], slug: str) -> list[tuple[str, str]]:
    """Copy figure files to public/blog/<slug>/ and return (filename, web_path) pairs."""
    dest_dir = Path("./public/blog") / slug
    dest_dir.mkdir(parents=True, exist_ok=True)

    copied = []
    for fig in figure_paths:
        fig_path = Path(fig).resolve()
        if not fig_path.exists():
            log.warning(f"Figure not found, skipping: {fig_path}")
            continue
        if fig_path.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
            log.warning(f"Unsupported image format, skipping: {fig_path.name}")
            continue

        dest_file = dest_dir / fig_path.name
        # Handle name collisions
        if dest_file.exists():
            stem = fig_path.stem
            suffix = fig_path.suffix
            i = 2
            while dest_file.exists():
                dest_file = dest_dir / f"{stem}-{i}{suffix}"
                i += 1

        shutil.copy2(fig_path, dest_file)
        web_path = f"/blog/{slug}/{dest_file.name}"
        log.info(f"Copied figure: {fig_path.name} -> {dest_file}")
        copied.append((dest_file.name, web_path))

    return copied


def insert_figures_into_body(raw_text: str, figures: list[tuple[str, str]], position: str = "before_references") -> str:
    """Insert figure markdown into the blog body.

    figures: list of (filename, web_path) tuples
    position: 'before_references' inserts a Figures section above ## References
    """
    if not figures:
        return raw_text

    figure_block_lines = ["\n## Figures\n"]
    for i, (filename, web_path) in enumerate(figures, 1):
        caption = Path(filename).stem.replace("-", " ").replace("_", " ").title()
        figure_block_lines.append(f"![{caption}]({web_path})")
        figure_block_lines.append(f"*Figure {i}: {caption}*\n")

    figure_block = "\n".join(figure_block_lines)

    if position == "before_references":
        ref_match = re.search(r"\n(## References)", raw_text)
        if ref_match:
            insert_at = ref_match.start()
            return raw_text[:insert_at] + "\n" + figure_block + "\n" + raw_text[insert_at:]

    # Fallback: append before the end
    return raw_text.rstrip() + "\n\n" + figure_block + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Approve and publish pending MDX draft to content/blog")
    parser.add_argument("--config", default="./blog_automation/config/config.yaml")
    parser.add_argument("--file", default=None, help="Specific pending draft file")
    parser.add_argument("--yes", action="store_true", help="Skip interactive confirmation")
    parser.add_argument("--force", action="store_true", help="Bypass quality guards and publish anyway")
    parser.add_argument("--title", default=None, help="Override the draft title before publishing")
    parser.add_argument("--description", default=None, help="Override the draft description before publishing")
    parser.add_argument("--edit", action="store_true", help="Open draft in your editor before publishing")
    parser.add_argument(
        "--figures", nargs="+", metavar="IMAGE",
        help="One or more image files to include (png, jpg, gif, webp, svg)"
    )
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
    raw_text = src.read_text(encoding="utf-8")

    # ── Edit mode: open in editor ───────────────────────────────────────────
    if args.edit:
        # Work on a temp copy so the original stays intact if editor is aborted
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".mdx", prefix="blog-edit-", delete=False, encoding="utf-8"
        ) as tmp:
            tmp.write(raw_text)
            tmp_path = Path(tmp.name)
        try:
            raw_text = open_in_editor(tmp_path)
            # Write edits back to the original pending file
            src.write_text(raw_text, encoding="utf-8")
            log.info("Draft updated with your edits.")
        finally:
            tmp_path.unlink(missing_ok=True)
    else:
        # Show preview if not editing
        log.info("Preview (first 35 lines):")
        for i, line in enumerate(raw_text.splitlines()):
            if i >= 35:
                break
            print(line.rstrip("\n"))

    # ── Figures: copy images and insert into body ───────────────────────────
    slug = extract_slug_from_filename(src)
    if args.figures:
        copied_figures = copy_figures(args.figures, slug)
        if copied_figures:
            raw_text = insert_figures_into_body(raw_text, copied_figures)
            log.info(f"Inserted {len(copied_figures)} figure(s) into draft.")
        else:
            log.warning("No valid figures were copied.")

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

    # Apply title/description overrides if provided
    if args.title or args.description:
        frontmatter, body = split_frontmatter_and_body(raw_text)
        if frontmatter:
            if args.title:
                safe_title = args.title.replace('"', '\\"')
                frontmatter = re.sub(
                    r'^title:\s*".*?"',
                    f'title: "{safe_title}"',
                    frontmatter,
                    flags=re.MULTILINE,
                )
                log.info(f"Title overridden to: {args.title}")
            if args.description:
                safe_desc = args.description.replace('"', '\\"')
                frontmatter = re.sub(
                    r'^description:\s*".*?"',
                    f'description: "{safe_desc}"',
                    frontmatter,
                    flags=re.MULTILINE,
                )
                log.info(f"Description overridden to: {args.description}")
            raw_text = frontmatter + body + "\n"

    if not args.yes:
        reply = input("Publish this draft to content/blog for your website? [y/N]: ").strip().lower()
        if reply != "y":
            log.info("Cancelled. Draft remains pending.")
            return

    dst = ensure_unique_destination(content_dir, slug)

    # Strip the PENDING_APPROVAL marker before publishing
    clean_text = re.sub(r"\n*>\s*Status:\s*PENDING_APPROVAL\s*\n*", "\n", raw_text).rstrip() + "\n"
    with dst.open("w", encoding="utf-8") as f:
        f.write(clean_text)
    src.unlink()
    log.info(f"Published to site content: {dst}")
    if args.figures:
        log.info(f"Figures saved to: public/blog/{slug}/")
    log.info("Next: commit and deploy your site to make it live.")


if __name__ == "__main__":
    main()
