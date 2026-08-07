#!/usr/bin/env python3
"""
PDF text extraction pipeline.

Several of the registry's highest-value sources are PDFs — frontier-lab system
cards, model cards, technical reports. The Worker's monitor can only hash their
bytes; it cannot read them, so every claim citing a PDF was stuck at
"no-snapshot" (unverified).

This runs outside Cloudflare, extracts text with pypdf, normalizes it the same
way the monitor normalizes HTML (so a quote matches identically whichever
pipeline archived the page), and writes it back through the Worker's
/internal/ingest-snapshot endpoint. Cloudflare stays the system of record; this
is optional muscle, per the technical design.

Usage:
    pip install pypdf
    export MONITOR_KEY=...            # or rely on .dev.vars
    python packages/mri-data/scripts/extract-pdfs.py [--dry-run] [--url URL]

Deliberately boring: pypdf is slower than alternatives and that is irrelevant
at ~15 documents that change a few times a year. What matters is that it does
not silently mangle text — a corrupted quote would surface as a false "claim
invalidated" alert, which is worse than no alert at all.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATASET = ROOT / "packages" / "mri-data" / "dist" / "dataset.json"
DEFAULT_BASE = "https://modelriskindex.jupiterlabs.workers.dev"
UA = "ModelRiskIndex-pdf-extract/0.1 (+https://modelriskindex.com; evidence archival)"
MIN_USABLE = 400


def monitor_key() -> str:
    key = os.environ.get("MONITOR_KEY")
    if key:
        return key
    dev_vars = ROOT / ".dev.vars"
    if dev_vars.exists():
        for line in dev_vars.read_text().splitlines():
            if line.startswith("MONITOR_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("MONITOR_KEY not set (env or .dev.vars)")


def pdf_urls() -> list[str]:
    """Every distinct evidence URL in the registry that looks like a PDF."""
    if not DATASET.exists():
        sys.exit(f"{DATASET} missing — run `npm run data:build` first")
    data = json.loads(DATASET.read_text())
    urls: set[str] = set()

    def collect(ref: dict) -> None:
        u = ref.get("url", "")
        if u.lower().endswith(".pdf") or "/pdf/" in u.lower():
            urls.add(u)

    for m in data["models"]:
        for vec in m["vectors"].values():
            for ref in vec.get("evidence", []):
                collect(ref)
        if m.get("usageShare"):
            collect(m["usageShare"]["evidence"])
    for e in data["change_events"]:
        for ref in e["evidence"]:
            collect(ref)
    for i in data["incidents"]:
        for ref in i["sources"]:
            collect(ref)
    return sorted(urls)


def normalize(text: str) -> str:
    """Match workers/monitor.ts normalizeHtml: collapse whitespace, decode
    entities. Keeps quote matching identical across both archival paths."""
    text = (
        text.replace("&nbsp;", " ")
        .replace("&#x27;", "'")
        .replace("&#39;", "'")
        .replace("&quot;", '"')
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&amp;", "&")
    )
    return re.sub(r"\s+", " ", text).strip()


def extract(raw: bytes) -> str:
    from io import BytesIO

    from pypdf import PdfReader

    reader = PdfReader(BytesIO(raw))
    pages = []
    for page in reader.pages:
        try:
            pages.append(page.extract_text() or "")
        except Exception as exc:  # a single bad page must not lose the document
            print(f"      ! page failed: {type(exc).__name__}", file=sys.stderr)
    return normalize("\n".join(pages))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="extract but do not ingest")
    ap.add_argument("--url", help="process a single URL instead of the registry")
    ap.add_argument("--base", default=os.environ.get("MRI_BASE", DEFAULT_BASE))
    args = ap.parse_args()

    targets = [args.url] if args.url else pdf_urls()
    if not targets:
        print("No PDF evidence URLs found.")
        return
    print(f"{len(targets)} PDF source(s)\n")

    key = None if args.dry_run else monitor_key()
    ok = failed = skipped = 0

    for url in targets:
        print(f"  {url}")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as resp:
                raw = resp.read()
        except Exception as exc:
            print(f"      download failed: {type(exc).__name__}: {exc}")
            failed += 1
            continue

        try:
            text = extract(raw)
        except Exception as exc:
            print(f"      extract failed: {type(exc).__name__}: {exc}")
            failed += 1
            continue

        if len(text) < MIN_USABLE:
            print(f"      only {len(text)} chars — likely scanned/image PDF, skipping")
            skipped += 1
            continue

        print(f"      {len(raw):,} bytes -> {len(text):,} chars")
        if args.dry_run:
            ok += 1
            continue

        payload = json.dumps(
            {
                "url": url,
                "text": text,
                "contentType": "application/pdf",
                "byteLength": len(raw),
            }
        ).encode()
        req = urllib.request.Request(
            f"{args.base}/internal/ingest-snapshot?key={key}",
            data=payload,
            headers={"Content-Type": "application/json", "User-Agent": UA},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                body = json.loads(resp.read())
            print(f"      ingested: {body.get('hash','')[:12]}…")
            ok += 1
        except Exception as exc:
            print(f"      ingest failed: {type(exc).__name__}: {exc}")
            failed += 1

    print(f"\nextracted {ok} · skipped {skipped} · failed {failed}")


if __name__ == "__main__":
    main()
