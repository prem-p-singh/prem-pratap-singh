#!/usr/bin/env python3
import argparse
import datetime as dt
import json
import logging
import os
import re
import smtplib
import time
import urllib.parse
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple

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

# Try to import specific OpenAI error types for retry logic
try:
    from openai import (
        RateLimitError,
        APITimeoutError,
        APIConnectionError,
        InternalServerError,
        AuthenticationError,
    )
except Exception:
    RateLimitError = None
    APITimeoutError = None
    APIConnectionError = None
    InternalServerError = None
    AuthenticationError = None

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("generate_draft")


# ── DiagnosticReport ─────────────────────────────────────────────────────────
@dataclass
class StepResult:
    name: str
    ok: bool
    duration_s: float = 0.0
    detail: str = ""


@dataclass
class VerifyResult:
    check: str
    passed: bool
    detail: str = ""


@dataclass
class DiagnosticReport:
    steps: List[StepResult] = field(default_factory=list)
    verifications: List[VerifyResult] = field(default_factory=list)

    def add_step(self, name: str, ok: bool, duration_s: float = 0.0, detail: str = ""):
        self.steps.append(StepResult(name=name, ok=ok, duration_s=duration_s, detail=detail))

    def add_verify(self, check: str, passed: bool, detail: str = ""):
        self.verifications.append(VerifyResult(check=check, passed=passed, detail=detail))

    @property
    def all_steps_ok(self) -> bool:
        return all(s.ok for s in self.steps)

    @property
    def all_checks_passed(self) -> bool:
        return all(v.passed for v in self.verifications)

    def troubleshooting_tips(self) -> List[str]:
        tips = []
        for s in self.steps:
            if not s.ok:
                if "keyword" in s.name.lower():
                    tips.append("Keyword extraction failed — ensure CV PDF exists and is readable.")
                elif "source" in s.name.lower() and "rank" not in s.name.lower():
                    tips.append("Source gathering failed — check internet connectivity and feed URLs.")
                elif "rank" in s.name.lower():
                    tips.append("Source ranking failed — check OpenAI API key and quota. Pipeline continues with unranked sources.")
                elif "draft" in s.name.lower() or "generation" in s.name.lower():
                    tips.append("Draft generation failed — check OpenAI API key, quota, and model availability.")
        for v in self.verifications:
            if not v.passed:
                if "word count" in v.check.lower():
                    tips.append(f"Word count issue: {v.detail}. Consider adjusting the prompt's length instructions or config min_words/max_words.")
                elif "section" in v.check.lower():
                    tips.append(f"Missing sections: {v.detail}. The LLM may have deviated from the prompt structure.")
                elif "reference accuracy" in v.check.lower():
                    tips.append(f"Reference accuracy issue: {v.detail}. The LLM hallucinated URLs that were auto-replaced with real fetched sources.")
                elif "reference" in v.check.lower():
                    tips.append("Few or no reference links found. Check that sources were passed to the LLM prompt.")
                elif "artifact" in v.check.lower():
                    tips.append(f"LLM artifacts detected: {v.detail}. These are auto-stripped but indicate prompt issues.")
        return tips

    def summary_text(self) -> str:
        lines = ["", "=" * 60, "PIPELINE DIAGNOSTIC REPORT", "=" * 60, ""]
        lines.append("Pipeline Steps:")
        for s in self.steps:
            status = "[OK]  " if s.ok else "[FAIL]"
            dur = f"({s.duration_s:.1f}s)" if s.duration_s > 0 else ""
            detail = f" -- {s.detail}" if s.detail else ""
            lines.append(f"  {status} {s.name} {dur}{detail}")

        if self.verifications:
            lines.append("")
            lines.append("Content Verification:")
            for v in self.verifications:
                status = "[PASS]" if v.passed else "[WARN]"
                detail = f" -- {v.detail}" if v.detail else ""
                lines.append(f"  {status} {v.check}{detail}")

        tips = self.troubleshooting_tips()
        if tips:
            lines.append("")
            lines.append("Troubleshooting Tips:")
            for tip in tips:
                lines.append(f"  • {tip}")

        lines.append("")
        lines.append("=" * 60)
        return "\n".join(lines)

    def html_table(self) -> str:
        rows_steps = ""
        for s in self.steps:
            icon = "✅" if s.ok else "❌"
            dur = f"{s.duration_s:.1f}s" if s.duration_s > 0 else "—"
            detail = s.detail or "—"
            rows_steps += f"<tr><td>{icon}</td><td>{s.name}</td><td>{dur}</td><td>{detail}</td></tr>\n"

        rows_verify = ""
        for v in self.verifications:
            icon = "✅" if v.passed else "⚠️"
            detail = v.detail or "—"
            rows_verify += f"<tr><td>{icon}</td><td>{v.check}</td><td colspan='2'>{detail}</td></tr>\n"

        tips_html = ""
        tips = self.troubleshooting_tips()
        if tips:
            tip_items = "".join(f"<li>{t}</li>" for t in tips)
            tips_html = f"""
            <h4 style="margin: 12px 0 6px; color: #b91c1c;">Troubleshooting Tips</h4>
            <ul style="font-size: 12px; color: #78716c; padding-left: 20px;">{tip_items}</ul>
            """

        return f"""
        <h4 style="margin: 12px 0 6px; color: #0e7490;">Pipeline Steps</h4>
        <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <tr style="background: #f5f5f4; text-align: left;">
            <th style="padding: 4px 8px;"></th><th style="padding: 4px 8px;">Step</th>
            <th style="padding: 4px 8px;">Time</th><th style="padding: 4px 8px;">Detail</th>
          </tr>
          {rows_steps}
        </table>
        <h4 style="margin: 12px 0 6px; color: #0e7490;">Content Verification</h4>
        <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <tr style="background: #f5f5f4; text-align: left;">
            <th style="padding: 4px 8px;"></th><th style="padding: 4px 8px;">Check</th>
            <th colspan="2" style="padding: 4px 8px;">Detail</th>
          </tr>
          {rows_verify}
        </table>
        {tips_html}
        """


# ── Stopwords ────────────────────────────────────────────────────────────────
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


# ── Config & PDF ─────────────────────────────────────────────────────────────
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


# ── Source Gathering ─────────────────────────────────────────────────────────
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


# ── Source Ranking ───────────────────────────────────────────────────────────
def build_ranking_prompt(sources: List[Dict], keywords: List[str]) -> str:
    """Build a prompt to rank sources by importance, popularity, innovation, and recency."""
    source_list = []
    for i, s in enumerate(sources):
        source_list.append(
            f"[{i}] Title: {s['title']}\n"
            f"    Source: {s['source']} | Keyword: {s.get('keyword', 'N/A')}\n"
            f"    Summary: {s.get('summary', 'No summary')[:200]}"
        )
    sources_text = "\n\n".join(source_list)

    return f"""You are a research article curator for a plant scientist specializing in: {', '.join(keywords)}.

Below is a list of articles fetched from arXiv and Google News. Rate EACH article on a scale of 1-10 based on these criteria:
- **Importance**: How significant is this for plant science / the author's research areas?
- **Popularity**: Is this likely a widely discussed or high-impact finding?
- **Innovation**: Does this present a novel method, discovery, or approach?
- **Recency**: Is this about very recent developments or breaking news?

Then compute a total score (sum of all 4 criteria, max 40).

IMPORTANT: Only select articles that are DIRECTLY relevant to plant science, agriculture, virology, omics, or food safety. Discard articles that are tangentially related or off-topic.

Return ONLY a valid JSON array of objects, sorted by total score descending. Each object must have:
- "index": the article index number from the list below
- "total": the total score (4-40)
- "reason": one short sentence explaining why this article is noteworthy

Articles:
{sources_text}

Return ONLY the JSON array, no other text.""".strip()


def rank_sources(sources: List[Dict], keywords: List[str], model: str, top_n: int = 8) -> List[Dict]:
    """Use LLM to rank and filter sources by importance, popularity, innovation, recency."""
    if not sources or OpenAI is None:
        return sources[:top_n]

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        log.warning("OPENAI_API_KEY not set, skipping source ranking")
        return sources[:top_n]

    prompt = build_ranking_prompt(sources, keywords)
    client = OpenAI(api_key=api_key)

    try:
        resp = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        raw = resp.choices[0].message.content.strip()

        # Extract JSON from response (handle markdown code blocks)
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\s*", "", raw)
            raw = re.sub(r"\s*```$", "", raw)

        rankings = json.loads(raw)

        # Select top_n articles by score
        ranked = []
        for entry in rankings[:top_n]:
            idx = int(entry["index"])
            if 0 <= idx < len(sources):
                sources[idx]["rank_score"] = entry.get("total", 0)
                sources[idx]["rank_reason"] = entry.get("reason", "")
                ranked.append(sources[idx])

        if ranked:
            log.info(f"Ranked {len(ranked)} sources from {len(sources)} candidates")
            for s in ranked:
                log.info(f"  [{s.get('rank_score', '?')}/40] {s['title'][:80]}")
            return ranked

    except (json.JSONDecodeError, KeyError, ValueError) as e:
        log.warning(f"Source ranking parse failed ({e}), using unranked sources")

    return sources[:top_n]


# ── Sample Sources (offline) ─────────────────────────────────────────────────
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


# ── LLM Prompt & Generation ─────────────────────────────────────────────────
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
- Tone: professional, thoughtful, suitable for a personal research website.
- Keep it concise (700-1100 words).

CRITICAL — References section rules:
- In the ## References section, you MUST use ONLY the exact URLs from the "Source links" list below.
- Copy each URL verbatim — do NOT modify, shorten, generalize, or invent any URL.
- Do NOT link to journal homepages (e.g., frontiersin.org/journals/...) — use the specific article URLs provided.
- Do NOT hallucinate or fabricate any reference that is not in the source list.
- Every reference must use the markdown format: [Title](exact_url_from_list)
- Include at least 4 references from the provided sources.

Author keyword profile:
{', '.join(keywords)}

Source links:
{links_md}
""".strip()


def call_openai_with_retry(prompt: str, model: str, cfg: Dict) -> str:
    """Call OpenAI with exponential backoff retry for transient errors."""
    if OpenAI is None:
        raise RuntimeError("openai package not available")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    max_retries = int(cfg.get("llm", {}).get("max_retries", 3))
    base_delay = float(cfg.get("llm", {}).get("retry_base_delay", 2.0))

    client = OpenAI(api_key=api_key)

    # Build set of retryable error types (only if imported successfully)
    retryable = tuple(
        e for e in [RateLimitError, APITimeoutError, APIConnectionError, InternalServerError]
        if e is not None
    )

    last_error = None
    for attempt in range(1, max_retries + 1):
        try:
            log.info(f"OpenAI API call attempt {attempt}/{max_retries} (model={model})")
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.4,
            )
            return resp.choices[0].message.content.strip()

        except Exception as e:
            last_error = e
            # Never retry authentication errors
            if AuthenticationError is not None and isinstance(e, AuthenticationError):
                log.error(f"Authentication failed (not retryable): {e}")
                raise

            # Retry on known transient errors
            if retryable and isinstance(e, retryable):
                delay = base_delay * (2 ** (attempt - 1))
                log.warning(f"Transient error on attempt {attempt}: {e}. Retrying in {delay:.1f}s...")
                time.sleep(delay)
                continue

            # Unknown error — don't retry
            log.error(f"Non-retryable error: {e}")
            raise

    raise RuntimeError(f"OpenAI API failed after {max_retries} attempts: {last_error}")


# ── Content Verification ─────────────────────────────────────────────────────
REQUIRED_SECTIONS = [
    "## Why this matters",
    "## What changed today",
    "## My research angle",
    "## References",
]

LLM_ARTIFACT_PATTERNS = [
    (r"^```", "Wrapping code fence"),
    (r"(?i)\bas an ai\b", "AI self-reference"),
    (r"(?i)\bi am an? (?:language|ai)\b", "AI self-reference"),
    (r"^# [^\n]+$", "Unexpected H1 heading (should start with intro paragraph)"),
]


def _normalize_url(url: str) -> str:
    """Normalize a URL for comparison: strip protocol, www, trailing slash, query params."""
    url = re.sub(r"^https?://", "", url)
    url = re.sub(r"^www\.", "", url)
    url = url.rstrip("/")
    url = url.split("?")[0]  # strip query params
    return url.lower()


def _title_word_overlap(title_a: str, title_b: str) -> float:
    """Compute word overlap ratio between two titles."""
    words_a = set(re.findall(r"[a-z]{3,}", title_a.lower()))
    words_b = set(re.findall(r"[a-z]{3,}", title_b.lower()))
    if not words_a or not words_b:
        return 0.0
    intersection = words_a & words_b
    return len(intersection) / min(len(words_a), len(words_b))


def enforce_real_references(body: str, sources: List[Dict], min_links: int = 4) -> Tuple[str, int, int]:
    """Replace hallucinated references with real fetched URLs.

    Returns (cleaned_body, replaced_count, kept_count).
    """
    # Split body at ## References
    ref_match = re.search(r"(##\s+References\s*\n)", body)
    if not ref_match:
        return body, 0, 0

    before_refs = body[:ref_match.start()]
    refs_header = ref_match.group(1)
    after_header = body[ref_match.end():]

    # Find where references end (next ## section or end of string)
    next_section = re.search(r"\n##\s+", after_header)
    if next_section:
        refs_text = after_header[:next_section.start()]
        after_refs = after_header[next_section.start():]
    else:
        refs_text = after_header
        after_refs = ""

    # Extract [title](url) from references section
    ref_pattern = re.compile(r"-?\s*\[([^\]]+)\]\((https?://[^)]+)\)")
    found_refs = ref_pattern.findall(refs_text)

    # Build real URL set and lookup
    real_urls = {_normalize_url(s["link"]): s for s in sources if s.get("link")}

    kept = []
    replaced = []
    used_real_urls = set()

    for ref_title, ref_url in found_refs:
        norm_ref = _normalize_url(ref_url)

        # Check exact match
        if norm_ref in real_urls:
            kept.append((ref_title, ref_url))
            used_real_urls.add(norm_ref)
            continue

        # Try domain match + title overlap
        best_match = None
        best_score = 0.0
        for norm_real, source in real_urls.items():
            if norm_real in used_real_urls:
                continue
            # Check if domains match
            ref_domain = norm_ref.split("/")[0] if "/" in norm_ref else norm_ref
            real_domain = norm_real.split("/")[0] if "/" in norm_real else norm_real
            if ref_domain == real_domain:
                score = _title_word_overlap(ref_title, source["title"])
                if score > best_score:
                    best_score = score
                    best_match = source

        if best_match and best_score > 0.2:
            log.info(f"  Replaced hallucinated ref: {ref_url[:60]} → {best_match['link'][:60]}")
            kept.append((best_match["title"], best_match["link"]))
            used_real_urls.add(_normalize_url(best_match["link"]))
            replaced.append(ref_url)
            continue

        # No domain match — try pure title overlap as fallback
        best_match = None
        best_score = 0.0
        for norm_real, source in real_urls.items():
            if norm_real in used_real_urls:
                continue
            score = _title_word_overlap(ref_title, source["title"])
            if score > best_score:
                best_score = score
                best_match = source

        if best_match and best_score > 0.4:
            log.info(f"  Replaced hallucinated ref (title match): {ref_url[:60]} → {best_match['link'][:60]}")
            kept.append((best_match["title"], best_match["link"]))
            used_real_urls.add(_normalize_url(best_match["link"]))
            replaced.append(ref_url)
        else:
            # No match — drop this reference
            log.info(f"  Removed hallucinated ref (no match): [{ref_title[:40]}]({ref_url[:60]})")

    # If we have fewer than min_links, append unused real sources
    if len(kept) < min_links:
        for norm_real, source in real_urls.items():
            if norm_real in used_real_urls:
                continue
            kept.append((source["title"], source["link"]))
            used_real_urls.add(norm_real)
            log.info(f"  Added missing ref: {source['title'][:60]}")
            if len(kept) >= min_links:
                break

    # Rebuild references section
    ref_lines = []
    for title, url in kept:
        ref_lines.append(f"- [{title}]({url})")
    new_refs_text = "\n".join(ref_lines) + "\n"

    cleaned_body = before_refs + refs_header + new_refs_text + after_refs
    return cleaned_body, len(replaced), len(kept)


def verify_draft(body: str, cfg: Dict, report: DiagnosticReport, sources: Optional[List[Dict]] = None) -> str:
    """Validate LLM output before saving. Returns cleaned body. Results go into report as verifications."""
    min_words = int(cfg.get("content", {}).get("min_words", 700))
    max_words = int(cfg.get("content", {}).get("max_words", 1100))

    # Auto-strip wrapping code fences (common LLM artifact)
    cleaned = body.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:mdx|markdown|md)?\s*\n?", "", cleaned)
        cleaned = re.sub(r"\n?\s*```\s*$", "", cleaned)
        cleaned = cleaned.strip()
        log.info("Auto-stripped wrapping code fences from LLM output")

    # 0. Enforce real references (replace hallucinated URLs with fetched ones)
    if sources:
        min_ref_links = int(cfg.get("guards", {}).get("min_reference_links", 4))
        cleaned, replaced_count, kept_count = enforce_real_references(cleaned, sources, min_links=min_ref_links)
        if replaced_count > 0:
            report.add_verify("Reference accuracy", False,
                              f"{replaced_count} hallucinated URL(s) replaced, {kept_count} total refs kept")
        else:
            report.add_verify("Reference accuracy", True,
                              f"All {kept_count} references use real fetched URLs")

    # 1. Word count check
    word_count = len(cleaned.split())
    if min_words <= word_count <= max_words:
        report.add_verify("Word count", True, f"{word_count} words (expected {min_words}-{max_words})")
    else:
        report.add_verify("Word count", False, f"{word_count} words (expected {min_words}-{max_words})")

    # 2. Required sections
    missing = [s for s in REQUIRED_SECTIONS if s.lower() not in cleaned.lower()]
    if not missing:
        report.add_verify("Required sections", True, f"All {len(REQUIRED_SECTIONS)} sections present")
    else:
        report.add_verify("Required sections", False, f"Missing: {', '.join(missing)}")

    # 3. Reference links
    ref_section = re.search(r"##\s+References\s*\n([\s\S]*?)(?:\n##|\Z)", cleaned)
    if ref_section:
        links = re.findall(r"\[.+?\]\(https?://.+?\)", ref_section.group(1))
        if links:
            report.add_verify("Reference links", True, f"{len(links)} links found")
        else:
            report.add_verify("Reference links", False, "References section has no markdown links")
    else:
        report.add_verify("Reference links", False, "No References section found to check links")

    # 4. LLM artifacts
    artifacts_found = []
    for pattern, label in LLM_ARTIFACT_PATTERNS:
        if re.search(pattern, cleaned, re.MULTILINE):
            artifacts_found.append(label)
    if not artifacts_found:
        report.add_verify("LLM artifacts", True, "Clean")
    else:
        report.add_verify("LLM artifacts", False, "; ".join(artifacts_found))

    return cleaned


# ── Build helpers ────────────────────────────────────────────────────────────
def build_title(keywords: List[str], today: str) -> str:
    key = keywords[0].replace("-", " ").title() if keywords else "Research"
    return f"Research Update: {key} ({today})"


def build_description(keywords: List[str]) -> str:
    short = ", ".join(k.replace("-", " ") for k in keywords[:4])
    return f"A brief linking current developments in {short}."


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


def sanitize_mdx(body: str) -> str:
    """Strip potentially dangerous patterns from LLM-generated MDX."""
    # Remove import/export statements (could execute arbitrary code)
    body = re.sub(r"^\s*(import|export)\s+.*$", "", body, flags=re.MULTILINE)
    # Remove script tags
    body = re.sub(r"<script[\s\S]*?</script>", "", body, flags=re.IGNORECASE)
    # Remove iframe tags
    body = re.sub(r"<iframe[\s\S]*?</iframe>", "", body, flags=re.IGNORECASE)
    body = re.sub(r"<iframe[^>]*/>", "", body, flags=re.IGNORECASE)
    # Remove event handler attributes (onclick, onerror, onload, etc.)
    body = re.sub(r"\s+on\w+\s*=\s*[\"'][^\"']*[\"']", "", body, flags=re.IGNORECASE)
    body = re.sub(r"\s+on\w+\s*=\s*\{[^}]*\}", "", body, flags=re.IGNORECASE)
    # Remove javascript: URLs
    body = re.sub(r"href\s*=\s*[\"']javascript:[^\"']*[\"']", 'href="#"', body, flags=re.IGNORECASE)
    # Remove data: URLs in src attributes (except data:image for legit images)
    body = re.sub(r"src\s*=\s*[\"']data:(?!image/)[^\"']*[\"']", 'src=""', body, flags=re.IGNORECASE)
    # Remove style attributes with url() that could leak data
    body = re.sub(r"style\s*=\s*[\"'][^\"']*url\s*\([^)]*\)[^\"']*[\"']", "", body, flags=re.IGNORECASE)
    return body.strip()


def save_pending_mdx(frontmatter: str, body: str, pending_dir: Path, title: str) -> Tuple[Path, str]:
    pending_dir.mkdir(parents=True, exist_ok=True)
    ts = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    base_slug = slugify(title)
    filename = f"{ts}--{base_slug}.mdx"
    path = pending_dir / filename
    sanitized_body = sanitize_mdx(body)
    with path.open("w", encoding="utf-8") as f:
        f.write(frontmatter)
        f.write("\n")
        f.write(sanitized_body)
        f.write("\n")
    return path, base_slug


# ── Notification ─────────────────────────────────────────────────────────────
def build_publish_url(cfg: Dict, draft_filename: str, slug: str) -> str:
    """Build a GitHub Actions workflow_dispatch URL for one-click publish."""
    gh = cfg.get("github", {})
    owner = gh.get("owner", "")
    repo = gh.get("repo", "")
    if not owner or not repo:
        return ""
    # GitHub workflow_dispatch page — inputs are now optional (auto-detected)
    return f"https://github.com/{owner}/{repo}/actions/workflows/publish-draft.yml"


def build_email_html(slug: str, draft_filename: str, draft_preview: str, publish_url: str,
                     report: Optional[DiagnosticReport] = None) -> str:
    """Build an HTML email with draft preview, diagnostic report, and one-click publish button."""
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
            Opens GitHub Actions &mdash; just click the green &ldquo;Run workflow&rdquo; button.<br>
            All fields are optional &mdash; leave them empty, the workflow auto-detects the latest draft.
          </p>
        </div>
        """

    # Diagnostic report section
    diagnostic_html = ""
    if report:
        diagnostic_html = f"""
        <div style="background: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px;
                    padding: 12px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px; color: #0e7490; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            Pipeline Diagnostics
          </h3>
          {report.html_table()}
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

        {diagnostic_html}

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


def _send_error_notification(cfg: Dict, error_msg: str, report: Optional[DiagnosticReport] = None):
    """Send a failure report email when pipeline fails before creating a draft."""
    subject = "[Blog Pipeline] ❌ Draft generation failed"
    plain_text = f"Blog draft generation failed.\n\nError: {error_msg}\n"
    if report:
        plain_text += report.summary_text()

    diagnostic_html = report.html_table() if report else ""
    html_body = f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px; margin: 0 auto; color: #1c1917;">
      <div style="background: linear-gradient(135deg, #b91c1c, #991b1b); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 20px;">❌ Blog Draft Generation Failed</h1>
      </div>
      <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-top: none;
                  padding: 20px; border-radius: 0 0 12px 12px;">
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <p style="margin: 0; color: #991b1b; font-size: 14px;"><strong>Error:</strong> {error_msg}</p>
        </div>
        {diagnostic_html}
      </div>
    </div>
    """

    try:
        send_email_notification(cfg, subject, plain_text, html_body)
        log.info("Error notification email sent")
    except Exception as e:
        log.warning(f"Failed to send error notification: {e}")


def notify_new_draft(cfg: Dict, draft_path: Path, slug: str, draft_content: str,
                     report: Optional[DiagnosticReport] = None):
    """Send notification about new draft. Never raises — errors are logged but don't crash the pipeline."""
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
    if report:
        plain_text += "\n" + report.summary_text()

    # Draft preview (first 30 lines)
    preview_lines = draft_content.strip().splitlines()[:30]
    draft_preview = "\n".join(preview_lines)

    # HTML email with publish button and diagnostics
    html_body = build_email_html(slug, draft_filename, draft_preview, publish_url, report)

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
        # Notifications never block the pipeline — draft is already saved
        log.warning(f"Notification error(s): {text}")


# ── Main Pipeline ────────────────────────────────────────────────────────────
def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a blog draft from CV keywords + research updates")
    parser.add_argument("--config", default="./blog_automation/config/config.yaml", help="Path to YAML config")
    parser.add_argument("--offline", action="store_true", help="Use synthetic sources and skip network/LLM for local testing")
    args = parser.parse_args()

    report = DiagnosticReport()
    cfg = load_config(Path(args.config))

    # ── Step 1: Keyword extraction ────────────────────────────────────────
    t0 = time.time()
    try:
        cv_path = Path(os.getenv("CV_PDF_PATH", cfg["content"]["cv_pdf_path"]))
        manual_keywords = cfg["content"].get("manual_keywords", [])
        keyword_count = int(cfg["content"].get("keyword_count", 10))

        cv_text = extract_text_from_pdf(cv_path)
        cv_keywords = extract_keywords(cv_text, keyword_count)
        keywords = list(dict.fromkeys(manual_keywords + cv_keywords))[:keyword_count]

        dur = time.time() - t0
        report.add_step("Keyword extraction", True, dur, f"{len(keywords)} keywords")
        log.info(f"Extracted {len(keywords)} keywords in {dur:.1f}s")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Keyword extraction", False, dur, str(e))
        log.error(f"Keyword extraction failed: {e}")
        log.info(report.summary_text())
        _send_error_notification(cfg, str(e), report)
        raise

    # ── Step 2: Source gathering ──────────────────────────────────────────
    t0 = time.time()
    try:
        max_per_keyword = int(cfg["content"].get("max_sources_per_keyword", 2))
        use_news = bool(cfg["feeds"].get("google_news_rss", True))

        if args.offline:
            sources = sample_sources(keywords)
        else:
            sources = gather_sources(keywords, max_per_keyword, use_news)

        if not sources:
            raise RuntimeError("No sources fetched. Check internet connectivity or keyword quality.")

        dur = time.time() - t0
        report.add_step("Source gathering", True, dur, f"{len(sources)} sources")
        log.info(f"Gathered {len(sources)} sources in {dur:.1f}s")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Source gathering", False, dur, str(e))
        log.error(f"Source gathering failed: {e}")
        log.info(report.summary_text())
        _send_error_notification(cfg, str(e), report)
        raise

    # ── Step 3: Source ranking ────────────────────────────────────────────
    today = dt.date.today().isoformat()
    site_title = cfg["site"]["title"]
    use_openai = bool(cfg["llm"].get("use_openai", True))
    model = cfg["llm"].get("model", "gpt-4o-mini")
    top_sources = int(cfg["content"].get("top_sources", 8))

    t0 = time.time()
    if use_openai and not args.offline and len(sources) > top_sources:
        try:
            log.info(f"Ranking {len(sources)} sources to select top {top_sources}...")
            sources = rank_sources(sources, keywords, model, top_n=top_sources)
            dur = time.time() - t0
            report.add_step("Source ranking", True, dur, f"Top {len(sources)} selected")
            log.info(f"Source ranking complete in {dur:.1f}s")
        except Exception as e:
            dur = time.time() - t0
            report.add_step("Source ranking", False, dur, f"Fallback to unranked: {e}")
            log.warning(f"Source ranking failed ({e}), continuing with unranked sources")
            sources = sources[:top_sources]
    else:
        report.add_step("Source ranking", True, 0.0, "Skipped (offline or few sources)")

    # ── Step 4: Draft generation ──────────────────────────────────────────
    t0 = time.time()
    try:
        if use_openai and not args.offline:
            prompt = build_prompt(site_title, keywords, sources, today)
            body = call_openai_with_retry(prompt, model, cfg)
        else:
            body = (
                "This is a generated summary draft.\n\n"
                "## Why this matters\n\n"
                "## What changed today\n\n"
                "## My research angle\n\n"
                "## References\n\n"
                + markdown_links(sources[:10])
            )

        dur = time.time() - t0
        word_count = len(body.split())
        report.add_step("Draft generation", True, dur, f"{word_count} words via {model}")
        log.info(f"Draft generated in {dur:.1f}s ({word_count} words)")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Draft generation", False, dur, str(e))
        log.error(f"Draft generation failed: {e}")
        log.info(report.summary_text())
        _send_error_notification(cfg, str(e), report)
        raise

    # ── Step 5: Content verification ──────────────────────────────────────
    t0 = time.time()
    body = verify_draft(body, cfg, report, sources)
    dur = time.time() - t0
    report.add_step("Content verification", True, dur, "All checks recorded")
    log.info(f"Content verification complete in {dur:.1f}s")

    # ── Step 6: Save draft ────────────────────────────────────────────────
    title = build_title(keywords, today)
    description = build_description(keywords)
    tags = [k.replace("-", " ") for k in keywords[:6]]
    frontmatter = build_frontmatter(title, today, description, tags)
    body += "\n\n> Status: PENDING_APPROVAL\n"

    full_content = frontmatter + "\n" + body.strip() + "\n"
    out, slug = save_pending_mdx(frontmatter, body, Path("./blog_automation/drafts/pending"), title)
    log.info(f"Draft saved: {out}")
    log.info(f"Slug: {slug}")

    # ── Step 7: Notification (non-blocking) ───────────────────────────────
    notify_new_draft(cfg, out, slug, full_content, report)

    # ── Print full diagnostic report to CI logs ───────────────────────────
    log.info(report.summary_text())


if __name__ == "__main__":
    main()
