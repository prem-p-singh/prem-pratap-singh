import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

AUTOMATION_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AUTOMATION_DIR))

import approve_and_publish as publish
import generate_draft as generate


class PipelineGuardTests(unittest.TestCase):
    @patch("generate_draft.feedparser.parse")
    def test_arxiv_recency_filter_drops_stale_results(self, parse):
        parse.return_value = SimpleNamespace(
            entries=[
                {
                    "title": "Old paper",
                    "link": "https://arxiv.org/abs/old",
                    "summary": "Old",
                    "published_parsed": (2020, 1, 1, 0, 0, 0, 0, 0, 0),
                },
                {
                    "title": "Recent paper",
                    "link": "https://arxiv.org/abs/recent",
                    "summary": "Recent",
                    "published_parsed": (2026, 8, 20, 0, 0, 0, 0, 0, 0),
                },
            ]
        )

        results = generate.fetch_arxiv("plant disease", 5, "2026-05-01")

        self.assertEqual([item["title"] for item in results], ["Recent paper"])

    def test_generation_filters_sources_used_by_published_or_pending_posts(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            published = root / "published"
            pending = root / "pending"
            published.mkdir()
            pending.mkdir()
            (published / "one.mdx").write_text(
                "## References\n- [Used](https://doi.org/10.1234/used)", encoding="utf-8"
            )
            sources = [
                {"title": "Used", "link": "https://doi.org/10.1234/used?source=feed"},
                {"title": "Fresh", "link": "https://doi.org/10.1234/fresh"},
            ]

            fresh, reused = generate.remove_previously_used_sources(
                sources, [published, pending]
            )

            self.assertEqual([item["title"] for item in fresh], ["Fresh"])
            self.assertEqual([item["title"] for item in reused], ["Used"])

    @patch("approve_and_publish.requests.get")
    def test_doi_validation_falls_back_to_datacite(self, get):
        get.side_effect = [SimpleNamespace(status_code=404), SimpleNamespace(status_code=200)]

        self.assertTrue(
            publish.doi_is_registered("https://doi.org/10.5281/zenodo.17054592", 2)
        )
        self.assertIn("api.crossref.org", get.call_args_list[0].args[0])
        self.assertIn("api.datacite.org", get.call_args_list[1].args[0])

    def test_reference_reuse_guard_blocks_source_recycling(self):
        with tempfile.TemporaryDirectory() as tmp:
            content = Path(tmp)
            (content / "published.mdx").write_text(
                "## References\n"
                "- [One](https://doi.org/10.1/one)\n"
                "- [Two](https://doi.org/10.1/two)\n",
                encoding="utf-8",
            )
            draft = (
                "## Why this matters\nDistinct prose.\n\n## References\n"
                "- [One](https://doi.org/10.1/one)\n"
                "- [Two](https://doi.org/10.1/two)\n"
                "- [Three](https://doi.org/10.1/three)\n"
            )
            cfg = {
                "guards": {
                    "min_reference_links": 1,
                    "check_link_reachability": False,
                    "max_reference_reuse_ratio": 0.5,
                    "max_topic_similarity": 1.1,
                    "max_similarity_ratio": 1.1,
                }
            }

            errors = publish.run_quality_guards(draft, cfg, content)

            self.assertTrue(any("Source duplication risk" in error for error in errors))

    def test_existing_slug_is_blocked_instead_of_numbered(self):
        with tempfile.TemporaryDirectory() as tmp:
            content = Path(tmp)
            (content / "same-slug.mdx").write_text("published", encoding="utf-8")

            with self.assertRaises(FileExistsError):
                publish.ensure_unique_destination(content, "same-slug")

    def test_generation_novelty_gate_includes_pending_drafts(self):
        with tempfile.TemporaryDirectory() as tmp:
            pending = Path(tmp) / "pending"
            pending.mkdir()
            body = "Grapevine point clouds quantify pruning structure and canopy geometry. " * 20
            (pending / "queued.mdx").write_text(
                "---\n"
                'title: "Point clouds for vineyard pruning"\n'
                'description: "Digital vine geometry for field phenotyping."\n'
                "---\n\n"
                + body,
                encoding="utf-8",
            )

            novel, detail = generate.check_novelty(
                "Digital vine geometry for pruning",
                "Point-cloud field phenotyping for grapevine canopies.",
                body,
                [pending],
                threshold=0.68,
            )

            self.assertFalse(novel)
            self.assertIn("queued.mdx", detail)


if __name__ == "__main__":
    unittest.main()
