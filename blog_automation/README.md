# Blog Automation (Approval-First)

This workflow generates daily **pending MDX drafts** based on:
- Keywords extracted from your CV
- Manual research keywords
- Daily updates from arXiv + Google News RSS

Approved drafts are moved into `content/blog/` and will be picked up by your Next.js blog pages.

## Setup

```bash
cd /Users/prempratapsingh/PycharmProjects/prem-pratap-singh
python3 -m venv blog_automation/.venv
source blog_automation/.venv/bin/activate
pip install -r blog_automation/requirements.txt
export OPENAI_API_KEY="your_openai_key"
```

## Generate pending draft

```bash
python blog_automation/generate_draft.py
```

Local offline test (no network/LLM):

```bash
python blog_automation/generate_draft.py --offline
```

Draft location:
- `blog_automation/drafts/pending/*.mdx`

## Review and publish manually

```bash
python blog_automation/approve_and_publish.py
```

After confirmation, file is moved to:
- `content/blog/<slug>.mdx`

Guards enforced before publish:
- Fact-check guard: requires `## References` and minimum reference links
- Link guard: checks reference URLs are reachable
- Plagiarism guard: compares draft against existing `content/blog` posts with similarity threshold

Override only when needed:

```bash
python blog_automation/approve_and_publish.py --force
```

## Notifications (optional)

Enable in `blog_automation/config/config.yaml`:
- `notifications.email.enabled: true`
- `notifications.telegram.enabled: true`

Environment variables for Email:
- `SMTP_HOST`
- `SMTP_PORT` (optional, default 587)
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_TO`

Environment variables for Telegram:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Daily scheduling (local cron example)

```bash
0 8 * * * cd /Users/prempratapsingh/PycharmProjects/prem-pratap-singh && /Users/prempratapsingh/PycharmProjects/prem-pratap-singh/blog_automation/.venv/bin/python blog_automation/generate_draft.py >> blog_automation/daily.log 2>&1
```

This generates drafts only. Posting stays manual.
