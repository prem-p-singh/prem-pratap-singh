# Blog Automation (Approval-First)

This pipeline generates **pending MDX drafts** on a schedule (weekly by default) from:
- Keywords extracted from your CV PDF
- Manual research keywords in `config.yaml`
- Fresh updates from arXiv + Google News RSS

Approved drafts are moved into `content/blog/` and picked up by the Next.js site.

---

## Setup

```bash
cd /Users/prempratapsingh/PycharmProjects/prem-pratap-singh
python3 -m venv blog_automation/.venv
source blog_automation/.venv/bin/activate
pip install -r blog_automation/requirements.txt
export OPENAI_API_KEY="your_openai_key"
```

---

## Generate pending draft

```bash
python blog_automation/generate_draft.py
```

Offline dry-run (no network / no OpenAI):

```bash
python blog_automation/generate_draft.py --offline
```

Drafts land in: `blog_automation/drafts/pending/<timestamp>--<slug>.mdx`

### Pipeline steps

1. **Pre-flight self-test** — humanizer regexes are validated against a probe string. If anything is broken, the job aborts in under a second with **zero OpenAI spend**.
2. **Keyword extraction** from CV PDF + manual config keywords.
3. **Source gathering** from arXiv + Google News RSS.
4. **Source ranking** — LLM picks the top N most important/recent sources.
5. **Draft generation** — LLM writes the blog body with strict reference-URL rules.
6. **Raw-output backup** — the LLM response is saved to `blog_automation/drafts/raw/` immediately, so any later crash cannot erase paid output.
7. **Humanizer pass** — removes AI writing patterns (see below). Failures are **non-fatal**: the pipeline logs the error and continues with the un-humanized text.
8. **Content verification** — word count, required sections, reference links, LLM-artifact scrub.
9. **Reference enforcement** — replaces hallucinated URLs with real fetched sources.
10. **Save draft + notify** (email / Telegram).

### Humanizer

Post-processing removes signals of AI writing:
- Em dashes (—, –) → context-aware choice of `:`, `;`, or `,` (only dashes surrounded by spaces; compound words like `plant-pathogen` are preserved).
- Smart quotes → straight quotes.
- Double quotes in body text → single quotes (except where strictly necessary).
- Filler transitions: "Furthermore", "Moreover", "Interestingly", "It's worth noting", "In conclusion", etc.
- Inflated language: "delve" → "explore", "leverage" → "use", "robust" → "strong", "holistic" → "broad", "landscape" → "field", "groundbreaking" → "notable", and more.
- Capitalization fixups with abbreviation awareness (`vs.`, `e.g.`, `i.e.`, `et al.`, `Dr.`, `Fig.`).

---

## Review and publish

```bash
python blog_automation/approve_and_publish.py
```

After confirmation, the file moves to `content/blog/<slug>.mdx`.

### Quality guards (enforced unless `--force`)

- **References guard** — requires a `## References` section with at least `min_reference_links` entries (default 4).
- **Link guard** — HTTP-tests every reference URL for reachability.
- **Plagiarism guard** — compares draft against existing posts; fails above `max_similarity_ratio` (default 0.72).

### CLI flags

| Flag | Purpose |
|------|---------|
| `--file PATH` | Publish a specific pending draft (default: latest). |
| `--yes` | Skip the interactive confirmation. |
| `--force` | Bypass quality guards (not recommended). |
| `--title "…"` | Override the post title before publishing. |
| `--description "…"` | Override the post description before publishing. |
| `--edit` | Open the draft in your `$EDITOR` (VS Code, nano, vi, etc.) for inline edits before publish. |
| `--figures IMG1 [IMG2 …]` | Attach one or more images (png/jpg/jpeg/gif/webp/svg). Files are copied to `public/blog/<slug>/` and a `## Figures` section is inserted automatically. |

### Examples

```bash
# Edit inline, then publish
python blog_automation/approve_and_publish.py --edit

# Publish with figures (images copied, captions auto-generated from filenames)
python blog_automation/approve_and_publish.py --figures charts/fig1.png photos/vineyard.jpg

# Edit and attach figures in one go
python blog_automation/approve_and_publish.py --edit --figures fig1.png fig2.png

# Override title/description non-interactively
python blog_automation/approve_and_publish.py --title "New Title" --description "New desc" --yes
```

Figures are saved under:
`public/blog/<slug>/<filename>`
Referenced in the post as `/blog/<slug>/<filename>`.

---

## Token-safety guarantees

Three layers prevent wasted OpenAI spend on post-processing bugs:

1. **Pre-flight self-test** aborts before any paid call if the humanizer is broken.
2. **Raw LLM output is persisted** to `blog_automation/drafts/raw/` immediately after generation — recoverable even if a later step crashes.
3. **Humanizer failures are non-fatal** — the pipeline logs and continues with un-humanized text so the draft still gets saved.

---

## Notifications (optional)

Enable in `blog_automation/config/config.yaml`:
- `notifications.email.enabled: true`
- `notifications.telegram.enabled: true`

### Email env vars
- `SMTP_HOST`
- `SMTP_PORT` (optional, default `587`)
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_TO`

### Telegram env vars
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

The email includes a **"Publish This Draft Now"** button that opens the GitHub Actions `publish-draft.yml` workflow, where you can confirm or override title/description before publishing.

---

## Configuration (`config.yaml`)

Key settings:

```yaml
llm:
  use_openai: true
  model: "gpt-5.4"        # LLM used for ranking + generation
  max_retries: 3
  retry_base_delay: 2.0

content:
  keyword_count: 12
  max_sources_per_keyword: 3
  top_sources: 8           # best sources kept after LLM ranking
  min_words: 700
  max_words: 1100

guards:
  min_reference_links: 4
  check_link_reachability: true
  link_timeout_seconds: 8
  max_similarity_ratio: 0.72
  link_check_delay: 0.5
```

---

## Scheduling

### GitHub Actions (current production setup)

- `.github/workflows/daily-blog-draft.yml` — scheduled weekly (Thursday 1 PM UTC). Generates a draft and commits it to `blog_automation/drafts/pending/`.
- `.github/workflows/publish-draft.yml` — manual trigger (`workflow_dispatch`). Reviews and publishes a pending draft with optional title/description overrides.

### Local cron (alternative)

```bash
0 8 * * * cd /Users/prempratapsingh/PycharmProjects/prem-pratap-singh && \
  /Users/prempratapsingh/PycharmProjects/prem-pratap-singh/blog_automation/.venv/bin/python \
  blog_automation/generate_draft.py >> blog_automation/daily.log 2>&1
```

This generates drafts only. Publishing always stays manual.

---

## Blog page grouping (on the site)

Published posts are grouped on `/blog` into:
- **Deep Dives** — longer standalone articles (card grid with descriptions).
- **Research Journal** — weekly research updates (compact grid with date badges).
- **All Articles** — full chronological list.

Body text renders in **justified alignment** (headings stay left-aligned).

---

## Directory layout

```
blog_automation/
├── config/
│   └── config.yaml
├── drafts/
│   ├── pending/          # waiting for approval
│   └── raw/              # raw LLM output (token-safe recovery)
├── generate_draft.py
├── approve_and_publish.py
├── requirements.txt
└── README.md

content/blog/             # published posts (site source of truth)
public/blog/<slug>/       # figures attached to posts
.github/workflows/
├── daily-blog-draft.yml  # weekly generation
└── publish-draft.yml     # manual publish
```
