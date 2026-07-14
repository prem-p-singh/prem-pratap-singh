#!/usr/bin/env python3
import argparse
import datetime as dt
import html
import json
import logging
import os
import random
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
    usage: Optional[Dict] = None

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

        if self.usage:
            u = self.usage
            lines.append("")
            lines.append("Token Usage & Cost:")
            lines.append(f"  API calls:          {u.get('calls', 0)}")
            lines.append(f"  Prompt tokens:      {u.get('prompt_tokens', 0):,}")
            lines.append(f"  Completion tokens:  {u.get('completion_tokens', 0):,}")
            lines.append(f"  Total tokens:       {u.get('total_tokens', 0):,}")
            if u.get("priced"):
                lines.append(f"  Estimated cost:     ${u.get('cost_usd', 0.0):.4f}")
            else:
                lines.append("  Estimated cost:     n/a (set llm.pricing in config.yaml)")

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

        usage_html = ""
        if self.usage:
            u = self.usage
            cost_cell = (
                f"${u.get('cost_usd', 0.0):.4f}" if u.get("priced")
                else "n/a (set llm.pricing)"
            )
            usage_html = f"""
            <h4 style="margin: 12px 0 6px; color: #0e7490;">Token Usage &amp; Cost</h4>
            <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
              <tr style="background: #f5f5f4; text-align: left;">
                <th style="padding: 4px 8px;">API calls</th>
                <th style="padding: 4px 8px;">Prompt</th>
                <th style="padding: 4px 8px;">Completion</th>
                <th style="padding: 4px 8px;">Total</th>
                <th style="padding: 4px 8px;">Est. cost</th>
              </tr>
              <tr>
                <td style="padding: 4px 8px;">{u.get('calls', 0)}</td>
                <td style="padding: 4px 8px;">{u.get('prompt_tokens', 0):,}</td>
                <td style="padding: 4px 8px;">{u.get('completion_tokens', 0):,}</td>
                <td style="padding: 4px 8px;"><strong>{u.get('total_tokens', 0):,}</strong></td>
                <td style="padding: 4px 8px;"><strong>{cost_cell}</strong></td>
              </tr>
            </table>
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
        {usage_html}
        {tips_html}
        """


# ── Token usage tracking ─────────────────────────────────────────────────────
_USAGE = {"prompt_tokens": 0, "completion_tokens": 0, "calls": 0}


def reset_usage() -> None:
    _USAGE.update(prompt_tokens=0, completion_tokens=0, calls=0)


def record_usage(resp) -> None:
    """Accumulate token counts from an OpenAI response. Never raises."""
    try:
        u = getattr(resp, "usage", None)
        if u:
            _USAGE["prompt_tokens"] += int(getattr(u, "prompt_tokens", 0) or 0)
            _USAGE["completion_tokens"] += int(getattr(u, "completion_tokens", 0) or 0)
            _USAGE["calls"] += 1
    except Exception as e:
        log.warning(f"Could not record token usage: {e}")


def usage_summary(cfg: Dict) -> Dict:
    """Compute totals and (if priced) estimated USD cost from accumulated usage."""
    pricing = cfg.get("llm", {}).get("pricing", {}) or {}
    in_price = float(pricing.get("input_per_1m", 0) or 0)
    out_price = float(pricing.get("output_per_1m", 0) or 0)
    pt = _USAGE["prompt_tokens"]
    ct = _USAGE["completion_tokens"]
    cost = (pt / 1_000_000) * in_price + (ct / 1_000_000) * out_price
    return {
        "prompt_tokens": pt,
        "completion_tokens": ct,
        "total_tokens": pt + ct,
        "calls": _USAGE["calls"],
        "cost_usd": cost,
        "priced": bool(in_price or out_price),
    }


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


def load_voice_profile(path: Path) -> str:
    """Load the author's voice profile markdown. Returns '' if the file is absent."""
    try:
        if path.exists():
            return path.read_text(encoding="utf-8").strip()
    except Exception as e:
        log.warning(f"Could not read voice profile at {path}: {e}")
    return ""


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


# ── Triangulated keyword selection ───────────────────────────────────────────
def select_triangulated_keywords(
    kw_cfg: Dict, run_date: dt.date, force_theme: Optional[str] = None
) -> Tuple[List[str], Dict]:
    """Select one run's keywords by triangulated rotation.

    Every run combines three vertices:
      - two fixed anchor themes (plant pathogen biology + synthetic biology),
        sampled fresh each run
      - one rotating theme, chosen so a different theme comes up each week and
        every rotatable theme is used before any repeat

    The rotating theme is picked by shuffling the rotatable themes with a
    year-seeded RNG (order randomized once per year, stable within the year),
    then indexing by ISO week number. Within-theme keyword picks use a
    date-seeded RNG so the exact keywords also vary week to week.

    Returns (keywords, provenance). Provenance records what was chosen so the run
    is auditable in the CI log.
    """
    themes: Dict[str, List[str]] = kw_cfg.get("themes", {})
    sel = kw_cfg.get("selection", {})
    anchors_cfg: Dict[str, int] = sel.get("anchors", {})
    rotating_cfg: Dict = sel.get("rotating", {})

    if not themes:
        raise ValueError("Keyword bank has no 'themes' section.")

    iso_year, iso_week, _ = run_date.isocalendar()
    sample_rng = random.Random(int(run_date.strftime("%Y%m%d")))

    def sample_theme(theme_key: str, n: int) -> List[str]:
        pool = list(themes.get(theme_key, []))
        if not pool:
            log.warning(f"Keyword theme '{theme_key}' is empty or missing.")
            return []
        return sample_rng.sample(pool, min(int(n), len(pool)))

    selected: List[str] = []
    provenance: Dict = {
        "iso_year": iso_year,
        "iso_week": iso_week,
        "anchors": {},
        "rotating": {},
    }

    # 1. Fixed anchor themes
    for theme_key, n in anchors_cfg.items():
        picks = sample_theme(theme_key, n)
        selected.extend(picks)
        provenance["anchors"][theme_key] = picks

    # 2. Rotating theme (everything except the anchors)
    anchor_keys = set(anchors_cfg.keys())
    rotatable = sorted(k for k in themes.keys() if k not in anchor_keys)
    if rotatable:
        rotating_theme = None
        if force_theme:
            if force_theme in rotatable:
                rotating_theme = force_theme
                log.info(f"Rotating theme forced to '{force_theme}' (override).")
            else:
                log.warning(
                    f"Forced theme '{force_theme}' is not a rotatable theme "
                    f"(anchors and unknown names are ignored); using weekly rotation."
                )
        if rotating_theme is None:
            year_rng = random.Random(iso_year)
            year_rng.shuffle(rotatable)
            rotating_theme = rotatable[iso_week % len(rotatable)]
        picks = sample_theme(rotating_theme, rotating_cfg.get("sample", 4))
        selected.extend(picks)
        provenance["rotating"] = {
            "theme": rotating_theme,
            "keywords": picks,
            "forced": bool(force_theme and rotating_theme == force_theme),
        }

    # Dedupe while preserving order (SIGS/HIGS acronym pairs are intentional)
    deduped = list(dict.fromkeys(selected))
    return deduped, provenance


# ── Source Gathering ─────────────────────────────────────────────────────────
def fetch_arxiv(keyword: str, max_items: int) -> List[Dict]:
    q = requests.utils.quote(keyword)
    url = (
        f"https://export.arxiv.org/api/query?search_query=all:{q}"
        f"&start=0&max_results={max_items}"
        f"&sortBy=submittedDate&sortOrder=descending"
    )
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


def _reconstruct_abstract(inverted_index: Optional[Dict]) -> str:
    """Rebuild readable abstract text from an OpenAlex abstract_inverted_index."""
    if not inverted_index:
        return ""
    positions: List[Tuple[int, str]] = []
    for word, idxs in inverted_index.items():
        for i in idxs:
            positions.append((i, word))
    positions.sort(key=lambda p: p[0])
    return " ".join(w for _, w in positions)


def _strip_html(text: str) -> str:
    """Strip HTML tags and unescape entities (Europe PMC titles/abstracts).

    Unescape first: Europe PMC returns escaped tags (&lt;i&gt;), so entities must
    become real tags before the tag-stripping regex can remove them.
    """
    text = html.unescape(text or "")
    text = re.sub(r"<[^>]+>", "", text)
    return text.strip()


def fetch_openalex(keyword: str, max_items: int, from_date: str, mailto: str = "") -> List[Dict]:
    """Fetch recent works from OpenAlex (open scholarly index; indexes bioRxiv)."""
    params = {
        "search": keyword,
        "filter": f"from_publication_date:{from_date}",
        "sort": "publication_date:desc",
        "per-page": max_items,
    }
    if mailto:
        params["mailto"] = mailto
    out: List[Dict] = []
    try:
        r = requests.get("https://api.openalex.org/works", params=params, timeout=20)
        r.raise_for_status()
        results = r.json().get("results", [])
    except Exception as e:
        log.warning(f"OpenAlex fetch failed for '{keyword}': {e}")
        return out
    for w in results[:max_items]:
        if w.get("is_retracted"):
            log.info(f"  Dropped retracted OpenAlex work: {(w.get('title') or '')[:60]}")
            continue
        title = (w.get("title") or "").strip()
        link = w.get("doi") or (w.get("primary_location") or {}).get("landing_page_url") or w.get("id", "")
        if not title or not link:
            continue
        summary = _reconstruct_abstract(w.get("abstract_inverted_index"))
        out.append({
            "title": title,
            "link": link,
            "summary": summary[:500],
            "source": "OpenAlex",
        })
    return out


def fetch_europepmc(keyword: str, max_items: int, from_date: Optional[str] = None) -> List[Dict]:
    """Fetch recent articles from Europe PMC (PubMed + preprints incl. bioRxiv)."""
    query = keyword
    if from_date:
        today = dt.date.today().isoformat()
        query = f"{keyword} AND (FIRST_PDATE:[{from_date} TO {today}])"
    params = {
        "query": query,
        "format": "json",
        "sort": "P_PDATE_D desc",
        "pageSize": max_items,
        "resultType": "core",
    }
    out: List[Dict] = []
    try:
        r = requests.get(
            "https://www.ebi.ac.uk/europepmc/webservices/rest/search",
            params=params, timeout=20,
        )
        r.raise_for_status()
        results = r.json().get("resultList", {}).get("result", [])
    except Exception as e:
        log.warning(f"Europe PMC fetch failed for '{keyword}': {e}")
        return out
    for rec in results[:max_items]:
        title = _strip_html(rec.get("title", "")).rstrip(".")
        doi = rec.get("doi")
        pmid = rec.get("pmid")
        if doi:
            link = f"https://doi.org/{doi}"
        elif pmid:
            link = f"https://europepmc.org/article/MED/{pmid}"
        else:
            link = ""
        if not title or not link:
            continue
        out.append({
            "title": title,
            "link": link,
            "summary": _strip_html(rec.get("abstractText", ""))[:500],
            "source": "Europe PMC",
        })
    return out


# Source credibility tiers (used by the ranking step to weight quality).
TIER_BY_SOURCE = {
    "OpenAlex": "scholarly",
    "Europe PMC": "scholarly",
    "arXiv": "preprint",
    "Google News": "news",
}


def gather_sources(keywords: List[str], feeds_cfg: Dict) -> List[Dict]:
    """Fetch and merge sources across all enabled platforms.

    Each platform is toggled and capped per keyword under `feeds` in config.
    Scholarly platforms (arXiv, OpenAlex, Europe PMC) are restricted to items
    from the last `recency_days`.

    Source-quality filter: retracted works are dropped upstream (OpenAlex), every
    item is tagged with a credibility `tier`, and news items whose publisher
    matches `news_blocklist` are removed. Returns a de-duplicated pool capped at
    `pool_cap`.
    """
    recency_days = int(feeds_cfg.get("recency_days", 120))
    from_date = (dt.date.today() - dt.timedelta(days=recency_days)).isoformat()
    mailto = feeds_cfg.get("mailto", "")
    pool_cap = int(feeds_cfg.get("pool_cap", 40))
    news_blocklist = [b.lower() for b in feeds_cfg.get("news_blocklist", [])]

    def enabled(name: str, default: bool = False) -> bool:
        return bool(feeds_cfg.get(name, {}).get("enabled", default))

    def cap(name: str, default: int = 3) -> int:
        return int(feeds_cfg.get(name, {}).get("max_per_keyword", default))

    seen = set()
    merged: List[Dict] = []
    for kw in keywords:
        items: List[Dict] = []
        if enabled("arxiv", True):
            items += fetch_arxiv(kw, cap("arxiv"))
        if enabled("google_news", True):
            items += fetch_google_news(kw, cap("google_news"))
        if enabled("openalex", False):
            items += fetch_openalex(kw, cap("openalex"), from_date, mailto)
        if enabled("europepmc", False):
            items += fetch_europepmc(kw, cap("europepmc"), from_date)
        for item in items:
            key = item.get("link")
            if not key or key in seen:
                continue
            item["tier"] = TIER_BY_SOURCE.get(item.get("source"), "other")
            # News-publisher blocklist (publisher name is in the Google News title)
            if item["tier"] == "news" and news_blocklist:
                title_l = item.get("title", "").lower()
                if any(b in title_l for b in news_blocklist):
                    log.info(f"  Dropped blocklisted news item: {item.get('title','')[:60]}")
                    continue
            seen.add(key)
            item["keyword"] = kw
            merged.append(item)
    return merged[:pool_cap]


# ── Source Ranking ───────────────────────────────────────────────────────────
def build_ranking_prompt(sources: List[Dict], keywords: List[str]) -> str:
    """Build a prompt to rank sources by importance, popularity, innovation, and recency."""
    source_list = []
    for i, s in enumerate(sources):
        source_list.append(
            f"[{i}] Title: {s['title']}\n"
            f"    Source: {s['source']} | Tier: {s.get('tier', 'other')} | Keyword: {s.get('keyword', 'N/A')}\n"
            f"    Summary: {s.get('summary', 'No summary')[:200]}"
        )
    sources_text = "\n\n".join(source_list)

    return f"""You are a research article curator for a plant scientist specializing in: {', '.join(keywords)}.

Below is a list of articles fetched from scholarly databases and news. Rate EACH article on a scale of 1-10 based on these criteria:
- **Importance**: How significant is this for plant science / the author's research areas?
- **Credibility**: How trustworthy is the source? Weight by tier: scholarly (peer-reviewed literature) highest, preprint next, news lowest. Press releases and popular news are the least reliable.
- **Innovation**: Does this present a novel method, discovery, or approach?
- **Recency**: Is this about very recent developments or breaking news?

Then compute a total score (sum of all 4 criteria, max 40).

IMPORTANT: Only select articles that are DIRECTLY relevant to plant science, agriculture, virology, omics, or food safety. Discard articles that are tangentially related or off-topic. When two articles are similarly relevant, prefer the higher-credibility tier (scholarly over preprint over news).

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
        )
        record_usage(resp)
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


def format_sources_for_prompt(sources: List[Dict], abstract_chars: int = 450) -> str:
    """Format sources WITH abstracts so the writer reasons from content, not just titles."""
    blocks = []
    for i, s in enumerate(sources, start=1):
        summary = (s.get("summary") or "").strip()
        if len(summary) > abstract_chars:
            summary = summary[:abstract_chars].rstrip() + "..."
        blocks.append(
            f"[{i}] {s['title']}\n"
            f"    URL: {s['link']}\n"
            f"    Source: {s['source']} (tier: {s.get('tier', 'other')})\n"
            f"    Abstract: {summary or 'No abstract available; do not invent findings for this item.'}"
        )
    return "\n\n".join(blocks)


# ── LLM Prompt & Generation ─────────────────────────────────────────────────
def build_prompt(
    site_title: str,
    keywords: List[str],
    sources: List[Dict],
    today: str,
    voice_profile: str = "",
) -> str:
    links_md = markdown_links(sources)
    sources_with_abstracts = format_sources_for_prompt(sources)
    voice_section = ""
    if voice_profile:
        voice_section = (
            "\n\n====================\n"
            "VOICE PROFILE — write in this voice. Apply the \"Blog target\" directive in "
            "each section. The \"Academic\" notes describe the author's journal writing "
            "for context only; do NOT imitate that formal register. Follow the "
            "punctuation, sentence-length, mechanism-explanation, and hedging guidance "
            "exactly.\n\n"
            f"{voice_profile}\n"
        )
    return f"""
You are writing a blog post draft for {site_title}.
Date: {today}

Required outcome:
- Start your response with EXACTLY THREE HTML comment lines for the title, description, and key takeaways:
  <!-- TITLE: Your Catchy Blog Post Title Here -->
  <!-- DESCRIPTION: A compelling 1-2 sentence description of what this post covers. -->
  <!-- TLDR: First takeaway in one sentence. | Second takeaway in one sentence. | Third takeaway in one sentence. -->
- The TITLE must be catchy, specific, and engaging — based on the actual content and key findings.
  Do NOT use generic patterns like "Research Update: Topic (date)".
  Good examples: "CRISPR Meets Grapevine: A New Frontier in Virus Resistance",
  "Why Multi-Omics Is Changing How We Fight Plant Pathogens",
  "Nanoencapsulation Breakthrough Targets Grapevine Leafroll Disease".
- The DESCRIPTION must be a unique, specific summary (1-2 sentences) highlighting the key takeaway.
  Do NOT use generic descriptions — make it reflect the actual content.
- The TLDR must contain 3 or 4 takeaways separated by ' | ' (pipe with spaces). Each takeaway:
  * One sentence, ideally under 22 words.
  * Specific and grounded in the post; no buzzwords or em dashes.
  * Written as a standalone bullet that a busy reader could scan.
- After the three comment lines, write the MDX body content (no frontmatter block).
- Start with a short intro paragraph (no top-level # heading).
- Include sections: ## Why this matters, ## What changed today, ## My research angle, ## References.
- GROUND EVERY FACTUAL CLAIM IN THE SOURCE ABSTRACTS BELOW. Each abstract is the
  actual content of that paper or article. Do not describe a finding that is not
  supported by an abstract. If an item has no abstract, refer to it only by what
  its title states; do not invent results for it. Do not overstate: if an abstract
  says "may" or "suggests", do not write it as established fact.
- Tone: professional, thoughtful, suitable for a personal research website.
- Write in the author's own voice, following the VOICE PROFILE at the end of this
  prompt. Never use em dashes (use commas, colons, or semicolons instead). Do not
  imitate a formal journal register; apply the "Blog target" guidance.
- LENGTH IS A HARD CONSTRAINT: write between 700 and 750 words for the body
  (excluding the title/description/TLDR comment lines and the References list).
  Do not exceed 750 words. Do not go under 700 words. Aim for roughly 725.

CRITICAL — References section rules:
- In the ## References section, you MUST use ONLY the exact URLs from the "Source links" list below.
- Copy each URL verbatim — do NOT modify, shorten, generalize, or invent any URL.
- Do NOT link to journal homepages (e.g., frontiersin.org/journals/...) — use the specific article URLs provided.
- Do NOT hallucinate or fabricate any reference that is not in the source list.
- Every reference must use the markdown format: [Title](exact_url_from_list)
- Include at least 4 references from the provided sources.

Author keyword profile:
{', '.join(keywords)}

Sources (use these abstracts as the factual basis for the post):
{sources_with_abstracts}

Source links (use these exact URLs in the References section):
{links_md}
{voice_section}""".strip()


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
            # Note: gpt-5.x ("Sol") only supports the default temperature (1),
            # so temperature is intentionally not set here.
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
            )
            record_usage(resp)
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


def humanize_text(text: str) -> str:
    """Deterministic punctuation cleanup only.

    Vocabulary and phrasing are governed by the voice profile at generation
    time. This step keeps only the two guarantees a prompt cannot reliably make:
    remove em/en dashes (a hard style rule) and normalize smart quotes. The old
    word-substitution list was dropped because it mangled legitimate technical
    terms ("fitness landscape", "robust statistics") and was a recurring source
    of regex bugs.
    """
    # Smart quotes -> straight quotes
    text = text.replace("\u201c", '"').replace("\u201d", '"')
    text = text.replace("\u2018", "'").replace("\u2019", "'")

    # Em/en dash -> context-appropriate punctuation
    def _replace_dash(m: re.Match) -> str:
        before = m.string[:m.start()].rstrip()
        after = m.string[m.end():].lstrip()
        # Introducing a definition or explanation -> colon
        if after and re.match(r"(that is|meaning|namely|specifically|i\.e\.|e\.g\.)", after, re.I):
            return ": "
        # Between two independent clauses (both sides sentence-like) -> semicolon
        if before and before[-1] not in ".,;:!?" and after and after[:1].isupper():
            return "; "
        # Default -> comma
        return ", "

    # Only match dashes with a surrounding space (keep compounds like "plant-pathogen")
    text = re.sub(r"(?<=\s)[\u2014\u2013]\s*|\s*[\u2014\u2013](?=\s)", _replace_dash, text)
    text = re.sub(r"  +", " ", text)

    log.info("Humanizer pass complete (punctuation only)")
    return text


def humanizer_selftest() -> None:
    """Run humanize_text against a fixed string to catch regex bugs BEFORE the OpenAI call.

    If any pattern is broken (invalid backref, bad group, etc.), this raises immediately
    so we don't waste OpenAI tokens on a run that will crash in post-processing.
    """
    probe = (
        "This seamless, holistic, robust pipeline leverages cutting-edge methods. "
        "It delves into a plethora of nuanced topics — furthermore, it is pivotal. "
        "Moreover, it's worth noting that the groundbreaking landscape facilitates insight. "
        'With "quoted" text and \u2018smart\u2019 quotes and vs. abbreviations.'
    )
    try:
        humanize_text(probe)
    except Exception as e:
        raise RuntimeError(f"Humanizer self-test failed (regex bug?): {e}") from e


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

    # 1. Word count check (body only; exclude the References list to match the
    #    700-750 target, which is defined over the prose, not the links)
    body_for_count = re.split(r"\n##\s+References", cleaned)[0]
    word_count = len(body_for_count.split())
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


# ── Claim check (advisory) ───────────────────────────────────────────────────
def check_claims(body: str, sources: List[Dict], model: str) -> List[Dict]:
    """Flag draft claims not supported by, or overstating, the source abstracts.

    Advisory only: returns a list of {"claim", "issue"} for the notification
    email. Never raises; on any error returns [] so the draft is still saved.
    """
    if OpenAI is None or not os.getenv("OPENAI_API_KEY") or not sources:
        return []
    ctx = format_sources_for_prompt(sources, abstract_chars=500)
    prompt = f"""You are fact-checking a draft blog post against its sources.

Below are the source abstracts, then the draft. Identify factual claims in the
draft that are NOT supported by the abstracts, or that overstate them (a tentative
finding written as established fact). Ignore the author's opinions, research-angle
reflections, and general background knowledge; flag only concrete factual claims
attributed to the sources or to recent findings.

Return ONLY a JSON array. Each element:
{{"claim": "<short quote from draft>", "issue": "<why unsupported or overstated>"}}
If every claim is supported, return [].

SOURCES:
{ctx}

DRAFT:
{body}

Return ONLY the JSON array."""
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        resp = client.chat.completions.create(
            model=model, messages=[{"role": "user", "content": prompt}]
        )
        record_usage(resp)
        raw = resp.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\s*", "", raw)
            raw = re.sub(r"\s*```$", "", raw)
        flagged = json.loads(raw)
        if isinstance(flagged, list):
            return flagged[:10]
    except Exception as e:
        log.warning(f"Claim check failed (non-fatal): {e}")
    return []


# ── Novelty check (advisory) ─────────────────────────────────────────────────
def check_novelty(title: str, description: str, content_dir: Path, threshold: float = 0.5):
    """Compare the new post's title+description against existing posts.

    Cheap, deterministic word-overlap. Returns (is_novel, detail). Flags the
    closest existing post when overlap meets the threshold.
    """
    new_text = f"{title} {description}"
    if not content_dir.exists():
        return True, "No existing posts to compare against."
    best_ratio = 0.0
    best_slug = None
    for p in sorted(content_dir.glob("*.mdx")):
        try:
            raw = p.read_text(encoding="utf-8")
        except Exception:
            continue
        m_title = re.search(r'^title:\s*"?(.*?)"?\s*$', raw, re.M)
        m_desc = re.search(r'^description:\s*"?(.*?)"?\s*$', raw, re.M)
        existing = " ".join(filter(None, [
            m_title.group(1) if m_title else "",
            m_desc.group(1) if m_desc else "",
        ]))
        ratio = _title_word_overlap(new_text, existing)
        if ratio > best_ratio:
            best_ratio = ratio
            best_slug = p.stem
    if best_ratio >= threshold:
        return False, f"Overlaps existing post '{best_slug}' (overlap {best_ratio:.2f})"
    closest = f", closest '{best_slug}'" if best_slug else ""
    return True, f"Distinct topic (max overlap {best_ratio:.2f}{closest})"


# ── Build helpers ────────────────────────────────────────────────────────────
def parse_title_description(
    body: str,
) -> Tuple[Optional[str], Optional[str], Optional[List[str]], str]:
    """Extract TITLE, DESCRIPTION, and TLDR from HTML comment lines at the start of LLM output.

    Returns (title, description, tldr_list, cleaned_body). Any field may be None if not found.
    The TLDR is a pipe-separated list inside the comment; this function splits and trims it.
    """
    title = None
    description = None
    tldr: Optional[List[str]] = None
    cleaned = body

    title_match = re.search(r"<!--\s*TITLE:\s*(.+?)\s*-->", cleaned)
    if title_match:
        title = title_match.group(1).strip()
        cleaned = cleaned[:title_match.start()] + cleaned[title_match.end():]

    desc_match = re.search(r"<!--\s*DESCRIPTION:\s*(.+?)\s*-->", cleaned)
    if desc_match:
        description = desc_match.group(1).strip()
        cleaned = cleaned[:desc_match.start()] + cleaned[desc_match.end():]

    tldr_match = re.search(r"<!--\s*TLDR:\s*(.+?)\s*-->", cleaned, re.DOTALL)
    if tldr_match:
        raw = tldr_match.group(1).strip()
        # Split on pipe, trim, drop empties, cap at 5 bullets defensively
        items = [s.strip().rstrip(".") + "." for s in raw.split("|") if s.strip()]
        tldr = items[:5] if items else None
        cleaned = cleaned[:tldr_match.start()] + cleaned[tldr_match.end():]

    cleaned = cleaned.strip()
    return title, description, tldr, cleaned


def build_title_fallback(keywords: List[str], today: str) -> str:
    key = keywords[0].replace("-", " ").title() if keywords else "Research"
    return f"Research Update: {key} ({today})"


def build_description_fallback(keywords: List[str]) -> str:
    short = ", ".join(k.replace("-", " ") for k in keywords[:4])
    return f"A brief linking current developments in {short}."


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9\s-]", "", text.lower())
    slug = re.sub(r"[\s_-]+", "-", slug).strip("-")
    return slug[:90]


def build_frontmatter(
    title: str,
    date_iso: str,
    description: str,
    tags: List[str],
    tldr: Optional[List[str]] = None,
) -> str:
    tags_line = "[" + ", ".join(f'\"{t}\"' for t in tags[:6]) + "]"
    safe_title = title.replace('"', '\\"')
    safe_description = description.replace('"', '\\"')
    out = (
        "---\n"
        f'title: "{safe_title}"\n'
        f'date: "{date_iso}"\n'
        f'description: "{safe_description}"\n'
        f"tags: {tags_line}\n"
    )
    if tldr:
        out += "tldr:\n"
        for item in tldr:
            safe = item.replace('"', '\\"')
            out += f'  - "{safe}"\n'
    out += "---\n"
    return out


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
                     report: Optional[DiagnosticReport] = None,
                     title: str = "", description: str = "") -> str:
    """Build an HTML email with draft preview, diagnostic report, and one-click publish button."""
    preview_html = draft_preview.replace("\n", "<br>").replace(" ", "&nbsp;")

    title_section = ""
    if title or description:
        title_html = f"<strong style='font-size: 16px; color: #1c1917;'>{title}</strong>" if title else ""
        desc_html = f"<p style='margin: 6px 0 0; color: #57534e; font-size: 13px;'>{description}</p>" if description else ""
        title_section = f"""
        <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px;
                    padding: 14px; margin-bottom: 16px;">
          <p style="margin: 0 0 4px; font-size: 11px; color: #0e7490; text-transform: uppercase; letter-spacing: 0.5px;">
            Generated Title &amp; Description
          </p>
          {title_html}
          {desc_html}
          <p style="margin: 10px 0 0; font-size: 11px; color: #78716c;">
            Want to change these? Use the <strong>title</strong> and <strong>description</strong> fields when publishing via GitHub Actions.
          </p>
        </div>
        """

    # Build the GitHub web-editor URL for this pending draft
    github_cfg = (cfg_for_buttons := None) or None  # placeholder; see actual cfg below
    # Note: we access cfg through build_publish_url's caller; re-derive owner/repo here
    # by reusing the same env that build_publish_url did. The function signature stays
    # the same so the call sites in notify_new_draft do not change.
    edit_url = ""
    try:
        # Reach into env via globals — cfg is in scope of notify_new_draft, not here.
        # The publish_url already encodes owner/repo, so derive the edit URL from it.
        import re as _re
        m = _re.search(r"github\.com/([^/]+/[^/]+)/actions", publish_url or "")
        if m:
            repo_path = m.group(1)
            edit_url = (
                f"https://github.com/{repo_path}/edit/main/"
                f"blog_automation/drafts/pending/{draft_filename}"
            )
    except Exception:
        edit_url = ""

    filename_box = f"""
        <div style="background: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px;
                    padding: 10px 12px; margin: 0 0 16px; font-size: 12px;">
          <span style="color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; font-size: 10px; font-weight: 600;">Filename</span><br>
          <code style="display: inline-block; margin-top: 4px; word-break: break-all; color: #1c1917;">{draft_filename}</code>
        </div>
    """

    buttons_html = ""
    if publish_url or edit_url:
        edit_btn = ""
        publish_btn = ""
        if edit_url:
            edit_btn = (
                f'<a href="{edit_url}" '
                f'style="display: inline-block; padding: 12px 22px; background: #fafaf9; '
                f'color: #1c1917; text-decoration: none; border-radius: 8px; border: 1px solid #d6d3d1; '
                f'font-size: 15px; font-weight: 600; margin: 0 6px 8px;">'
                f'&#9998; Edit Draft on GitHub</a>'
            )
        if publish_url:
            publish_btn = (
                f'<a href="{publish_url}" '
                f'style="display: inline-block; padding: 12px 22px; background: #0e7490; '
                f'color: white; text-decoration: none; border-radius: 8px; '
                f'font-size: 15px; font-weight: 600; margin: 0 6px 8px;">'
                f'&#9889; Publish This Draft Now</a>'
            )
        buttons_html = f"""
        <div style="margin: 24px 0; text-align: center;">
          {edit_btn}{publish_btn}
          <p style="margin-top: 8px; font-size: 12px; color: #78716c;">
            <strong>Edit</strong> opens the file in GitHub&rsquo;s web editor; save your changes there before publishing.<br>
            <strong>Publish</strong> opens GitHub Actions &mdash; click &ldquo;Run workflow&rdquo; to deploy.
          </p>
        </div>
        """
    publish_button = buttons_html

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
        {filename_box}

        {title_section}

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
                     report: Optional[DiagnosticReport] = None,
                     title: str = "", description: str = ""):
    """Send notification about new draft. Never raises — errors are logged but don't crash the pipeline."""
    draft_filename = draft_path.name
    subject = f"[Blog Draft] {title}" if title else f"[Blog Draft] New pending draft: {slug}"

    # Build one-click publish URL
    publish_url = build_publish_url(cfg, draft_filename, slug)

    # Plain text fallback
    plain_text = (
        f"A new pending draft was created.\n\n"
        f"Title: {title}\n"
        f"Description: {description}\n"
        f"File: {draft_path}\n"
        f"Slug: {slug}\n\n"
        f"You can override title/description when publishing via GitHub Actions or CLI.\n\n"
    )
    if publish_url:
        plain_text += f"Publish instantly:\n{publish_url}\n\n"
    plain_text += (
        "Or publish manually:\n"
        "python blog_automation/approve_and_publish.py\n"
        "  --title \"Your Custom Title\" --description \"Your custom description.\"\n"
    )
    if report:
        plain_text += "\n" + report.summary_text()

    # Draft preview (first 30 lines)
    preview_lines = draft_content.strip().splitlines()[:30]
    draft_preview = "\n".join(preview_lines)

    # HTML email with publish button and diagnostics
    html_body = build_email_html(slug, draft_filename, draft_preview, publish_url, report,
                                 title=title, description=description)

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
    parser.add_argument("--theme", default=None, help="Force the rotating theme (e.g. ai_and_foundation_models); overrides weekly rotation")
    args = parser.parse_args()

    report = DiagnosticReport()
    cfg = load_config(Path(args.config))
    reset_usage()

    # ── Step 0: Self-test post-processing (catch bugs BEFORE paid OpenAI calls) ──
    t0 = time.time()
    try:
        humanizer_selftest()
        dur = time.time() - t0
        report.add_step("Pre-flight self-test", True, dur, "Post-processing regex OK")
        log.info("Pre-flight self-test passed")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Pre-flight self-test", False, dur, str(e))
        log.error(f"Pre-flight self-test FAILED (aborting to avoid wasted API calls): {e}")
        log.info(report.summary_text())
        _send_error_notification(cfg, f"Pre-flight failed: {e}", report)
        raise

    # ── Step 1: Keyword selection ─────────────────────────────────────────
    t0 = time.time()
    try:
        bank_path = Path(os.getenv(
            "KEYWORDS_BANK",
            cfg["content"].get("keywords_bank", "./blog_automation/config/keywords.yaml"),
        ))
        if bank_path.exists():
            # Triangulated rotation: two fixed anchor themes + one rotating theme.
            kw_bank = load_config(bank_path)
            force_theme = args.theme or os.getenv("ROTATING_THEME") or None
            keywords, kw_prov = select_triangulated_keywords(
                kw_bank, dt.date.today(), force_theme=force_theme
            )
            rot = kw_prov.get("rotating", {}).get("theme", "n/a")
            detail = (
                f"{len(keywords)} keywords "
                f"(rotating: {rot}, ISO week {kw_prov.get('iso_week')})"
            )
            dur = time.time() - t0
            report.add_step("Keyword selection", True, dur, detail)
            log.info(f"Triangulated selection: {detail}")
            log.info(f"  Anchors: {kw_prov.get('anchors')}")
            log.info(f"  Rotating: {kw_prov.get('rotating')}")
            log.info(f"  Keywords: {keywords}")
        else:
            # Legacy fallback: extract keywords from the CV PDF.
            log.warning(f"Keyword bank not found at {bank_path}; using legacy CV extraction.")
            cv_path = Path(os.getenv("CV_PDF_PATH", cfg["content"]["cv_pdf_path"]))
            manual_keywords = cfg["content"].get("manual_keywords", [])
            keyword_count = int(cfg["content"].get("keyword_count", 10))
            cv_text = extract_text_from_pdf(cv_path)
            cv_keywords = extract_keywords(cv_text, keyword_count)
            keywords = list(dict.fromkeys(manual_keywords + cv_keywords))[:keyword_count]
            dur = time.time() - t0
            report.add_step("Keyword selection", True, dur, f"{len(keywords)} keywords (legacy CV mode)")
            log.info(f"Extracted {len(keywords)} keywords in {dur:.1f}s")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Keyword selection", False, dur, str(e))
        log.error(f"Keyword selection failed: {e}")
        log.info(report.summary_text())
        _send_error_notification(cfg, str(e), report)
        raise

    # ── Step 2: Source gathering ──────────────────────────────────────────
    t0 = time.time()
    try:
        if args.offline:
            sources = sample_sources(keywords)
        else:
            sources = gather_sources(keywords, cfg.get("feeds", {}))

        if not sources:
            raise RuntimeError("No sources fetched. Check internet connectivity or keyword quality.")

        by_platform: Dict[str, int] = {}
        for s in sources:
            by_platform[s.get("source", "?")] = by_platform.get(s.get("source", "?"), 0) + 1

        dur = time.time() - t0
        platform_mix = ", ".join(f"{k}:{v}" for k, v in sorted(by_platform.items()))
        report.add_step("Source gathering", True, dur, f"{len(sources)} sources ({platform_mix})")
        log.info(f"Gathered {len(sources)} sources in {dur:.1f}s [{platform_mix}]")
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
    model = os.getenv("OPENAI_MODEL", cfg["llm"].get("model", "gpt-4o-mini"))
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
            voice_path = Path(os.getenv(
                "VOICE_PROFILE",
                cfg["content"].get("voice_profile", "./blog_automation/voice_profile.md"),
            ))
            voice_profile = load_voice_profile(voice_path)
            if voice_profile:
                log.info(f"Loaded voice profile ({len(voice_profile)} chars) from {voice_path}")
            else:
                log.warning(f"Voice profile not found at {voice_path}; generating without it.")
            prompt = build_prompt(site_title, keywords, sources, today, voice_profile)
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

    # ── Step 4a: Save RAW LLM output to disk BEFORE any post-processing ──
    # If a downstream step crashes, this raw file preserves the paid OpenAI output
    # so it can be recovered and re-processed locally without re-calling the API.
    try:
        raw_dir = Path("./blog_automation/drafts/raw")
        raw_dir.mkdir(parents=True, exist_ok=True)
        raw_ts = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
        raw_path = raw_dir / f"{raw_ts}--raw.mdx"
        raw_path.write_text(body, encoding="utf-8")
        log.info(f"Raw LLM output saved (token-safe recovery): {raw_path}")
    except Exception as e:
        log.warning(f"Could not save raw backup (continuing): {e}")

    # ── Step 4b: Humanize text (non-fatal on failure) ────────────────────
    t0 = time.time()
    try:
        body = humanize_text(body)
        dur = time.time() - t0
        report.add_step("Humanizer pass", True, dur, "Normalized dashes and quotes")
    except Exception as e:
        dur = time.time() - t0
        report.add_step("Humanizer pass", False, dur, f"Skipped due to error: {e}")
        log.error(f"Humanizer failed (keeping raw LLM text): {e}")
        # Do NOT re-raise — we still have a valid draft to save.

    # ── Step 5: Content verification ──────────────────────────────────────
    t0 = time.time()
    body = verify_draft(body, cfg, report, sources)
    dur = time.time() - t0
    report.add_step("Content verification", True, dur, "All checks recorded")
    log.info(f"Content verification complete in {dur:.1f}s")

    # ── Step 5b: Extract title, description, TLDR from LLM output ────────
    llm_title, llm_description, llm_tldr, body = parse_title_description(body)
    if llm_title:
        title = llm_title
        log.info(f"LLM-generated title: {title}")
    else:
        title = build_title_fallback(keywords, today)
        log.warning(f"No LLM title found, using fallback: {title}")
    if llm_description:
        description = llm_description
        log.info(f"LLM-generated description: {description}")
    else:
        description = build_description_fallback(keywords)
        log.warning(f"No LLM description found, using fallback: {description}")
    if llm_tldr:
        log.info(f"LLM-generated TLDR: {len(llm_tldr)} bullet(s)")
    else:
        log.warning("No LLM TLDR found; post will render without a Key Takeaways callout.")

    # ── Step 5c: Claim check (advisory) ───────────────────────────────────
    if use_openai and not args.offline:
        t0 = time.time()
        flagged_claims = check_claims(body, sources, model)
        dur = time.time() - t0
        if flagged_claims:
            detail = "; ".join(f"\"{c.get('claim','')[:60]}\" ({c.get('issue','')[:60]})" for c in flagged_claims[:5])
            report.add_verify("Claim check", False, f"{len(flagged_claims)} unsupported/overstated: {detail}")
            report.add_step("Claim check", True, dur, f"{len(flagged_claims)} claim(s) flagged")
            log.warning(f"Claim check flagged {len(flagged_claims)} claim(s)")
        else:
            report.add_verify("Claim check", True, "All checked claims supported by sources")
            report.add_step("Claim check", True, dur, "No issues")
    else:
        flagged_claims = []

    # ── Step 5d: Novelty check (advisory) ─────────────────────────────────
    content_dir = Path(cfg["site"].get("blog_content_dir", "./content/blog"))
    is_novel, novelty_detail = check_novelty(title, description, content_dir)
    report.add_verify("Novelty", is_novel, novelty_detail)
    log.info(f"Novelty check: {novelty_detail}")

    # ── Step 6: Save draft ────────────────────────────────────────────────
    tags = [k.replace("-", " ") for k in keywords[:6]]
    frontmatter = build_frontmatter(title, today, description, tags, llm_tldr)
    body += "\n\n> Status: PENDING_APPROVAL\n"

    full_content = frontmatter + "\n" + body.strip() + "\n"
    out, slug = save_pending_mdx(frontmatter, body, Path("./blog_automation/drafts/pending"), title)
    log.info(f"Draft saved: {out}")
    log.info(f"Slug: {slug}")

    # ── Step 7: Notification (non-blocking) ───────────────────────────────
    report.usage = usage_summary(cfg)
    u = report.usage
    log.info(
        f"Token usage: {u['total_tokens']:,} total "
        f"({u['prompt_tokens']:,} prompt + {u['completion_tokens']:,} completion) "
        f"over {u['calls']} call(s)"
        + (f", est. ${u['cost_usd']:.4f}" if u['priced'] else ", cost unpriced")
    )
    notify_new_draft(cfg, out, slug, full_content, report, title=title, description=description)

    # ── Print full diagnostic report to CI logs ───────────────────────────
    log.info(report.summary_text())


if __name__ == "__main__":
    main()
