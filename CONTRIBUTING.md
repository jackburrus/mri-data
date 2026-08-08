# Contributing to the ModelRiskIndex registry

This repository is the system of record for every claim ModelRiskIndex
publishes. Corrections from outside are welcome and expected — the whole point
of publishing the data as code is that anyone can check our work and prove us
wrong.

What follows is not etiquette. These are the rules CI enforces, why each one
exists, and what happens to your pull request under each outcome.

---

## The one thing to understand first

**A link is not evidence. A quote is.**

Anyone can cite a URL that plausibly supports a claim. The URL proves the page
exists; it does not prove the page says what the claim says. That gap is where
this entire category fails — confidently published, plausible, wrong.

So every claim here binds to a `quote`: the exact sentence from the source,
verbatim. CI fetches the page and checks the sentence is really there. When a
provider later edits that sentence, the monitor knows the day it happens.

If you take nothing else from this document: **include the quote.**

---

## Three outcomes

Your PR lands in exactly one of these, automatically.

| Outcome         | What happens                         | You'll know because                                |
| --------------- | ------------------------------------ | -------------------------------------------------- |
| **Rejected**    | CI fails. No maintainer is notified. | The failing check names the rule and how to fix it |
| **Auto-merged** | Merged without human review          | It merges, usually within minutes                  |
| **Review**      | Queued for a maintainer              | CI is green, labelled `needs-review`               |

Rejection is not a judgment about your contribution — it is a rule that can be
checked without an opinion. Fix it and push again.

---

## What auto-merges

Only changes that **cannot alter what the registry asserts**:

- **Dead-link repair** where the replacement URL carries the same `sourceId`
  and the existing quote still verifies against it. This strictly improves the
  registry and cannot change a claim.
- **`retrievedAt` refresh** where the quote still verifies. This is
  re-verification, not a new assertion.
- **Typos and prose fixes** that change no grade, no evidence, and no field the
  schema reads.

Everything else needs a human. That is deliberate, and it is not going to
change — see [Why a human still merges grades](#why-a-human-still-merges-grades).

---

## The rules

### R1 — The source catalog is maintainer-only

`src/sources.ts` defines every publisher, its trust tier (A–F), and the URL
prefixes that legitimately belong to it. **PRs that modify it are rejected
automatically.**

This is the rule that makes every other rule work. Evidence URLs are validated
against their source's registered prefixes, and trust tiers decide which source
wins when two conflict. A contributor who could add `my-blog.example` at tier A
would defeat all of it in a single commit.

**Proposing a new source:** open an issue. Include the publisher, what kind of
source it is, and why it belongs at the tier you're proposing.

### R2 — A changed grade must be quote-bound

If your PR changes any grade, **every** evidence reference on that vector must
carry a verbatim `quote` of at least 12 characters.

The schema marks `quote` optional, because entries predating this rule are
still being backfilled. That leniency does not extend to changes. A grade whose
evidence is only a URL can be checked for liveness, never for truth.

```ts
{
  label: "OpenAI Enterprise privacy — data retention",
  url: "https://openai.com/enterprise-privacy/",
  sourceId: "openai",
  retrievedAt: "2026-08-07",
  quote: "We do not train our models on your business data by default.",
}
```

### R3 — No silent fixes

A changed grade requires a new entry in `src/changelog.ts` whose `modelSlugs`
includes the affected model.

This is an operating principle, not a preference. This project exists to catch
providers changing their terms quietly. Holding ourselves to a lower standard
than we hold them to would end the only asset here that matters. Corrections
ship visible and dated — including our own. [We have published our own errors
this way](https://modelriskindex.com/changes).

### R4 — Quotes must be distinctive

A quote must be at least 12 characters after normalization. Short fragments
match incidentally and prove nothing.

Quotes are matched with normalization applied to both sides — case, whitespace,
smart quotes and dashes are all flattened — so you do not need to reproduce
punctuation exactly. You do need to reproduce the **words** exactly. Do not
paraphrase, do not stitch together sentences from different parts of a page,
and do not trim a qualifier that changes the meaning.

### R5 — A changed tier is surfaced, never rejected

Models answer a typed requirements checklist; the tier is derived from it and
never authored. You cannot assert a tier even if you want to — `Model` is
inferred from a schema that has `tierChecklist` and no `tier`, so it is a
compile error long before this gate runs.

What the gate does is **notice**. A tier moving means a requirement answer
changed, which is judgment-bearing, so it routes to maintainer review.

> This rule previously rejected any tier change outright. That was a bug: it
> compared built artifacts, where the tier is always computed and present, so it
> fired on every legitimate tier movement — the contributions most worth having.
> Fixed 2026-08-08.

### R6 — Quotes must verify at the source

CI fetches every new or changed quote and checks the page really contains it.

- **Quote found** → passes.
- **Quote not found, page fetched fine** → **rejected.** We know the claim is
  wrong.
- **Page unreachable, blocked, or a PDF** → **not a rejection.** Routes to
  human review. A source that refuses automated archival is a fact about that
  publisher, not a defect in your contribution.

Only quotes _new or changed in your PR_ are fetched. The rest of the registry is
re-verified on a schedule.

---

## Also enforced (pre-existing)

The registry test suite runs on every PR:

- Zod schema validity, and the TypeScript compiler as a second schema
- Unique model slugs, event ids, incident ids
- Evidence URLs are HTTPS and match their source's registered prefixes
- No retrieval, release, event or incident date in the future
- No event or incident predating its model's release by more than a year
- Vector summaries and tier notes read as sentences
- Total tracked usage share stays under 100%

---

## Why a human still merges grades

You may reasonably ask why, given all of the above is machine-checked, a person
still has to approve a grade change.

Because every rule here verifies that a quote is **real**, and none of them can
verify that it is **representative**. A contributor can supply a genuine,
verbatim, correctly-cited sentence that is true in isolation and misleading in
context — a retention clause that a later paragraph overrides, an enterprise
guarantee that does not apply to the consumer tier, a commitment scoped to one
jurisdiction. Every one of those passes all six rules.

That is not a hypothetical failure mode. It is the specific way independent
security ratings have historically been captured: not by fraud, but by
interested parties supplying technically accurate evidence and letting an
automated process draw the flattering conclusion.

So the rules exist to make the queue small and the review fast — a maintainer
sees a pre-verified change and decides one thing, whether the evidence is
representative. They do not exist to remove the person. `MAINTAINERS.md` records
that commitment as a standing one.

---

## Disclosing an interest

If you work for, contract to, or are funded by the provider of a model you're
editing, **say so in the PR.** It will not get your contribution rejected.
Undisclosed and later discovered, it will.

The PR template has a checkbox. Use it.

---

## Getting set up

```bash
npm ci
npm test                    # registry test suite
npm run build               # emits dist/dataset.json
npm run check-links         # network: evidence link liveness
```

To run the gate locally exactly as CI does:

```bash
git worktree add /tmp/base main
(cd /tmp/base && npm ci --ignore-scripts && npm run build && cp dist/dataset.json /tmp/base.json)
npm run build && cp dist/dataset.json /tmp/head.json
npx tsx scripts/gate.ts /tmp/base.json /tmp/head.json
npx tsx scripts/verify-quotes.ts /tmp/base.json /tmp/head.json
```

`scripts/find-quote.mjs` helps locate a usable verbatim sentence in a source.

---

## Licensing

Data is [CC BY 4.0](LICENSE) — reuse it freely, credit ModelRiskIndex. Code
(schema, scripts, tests) is [MIT](LICENSE-CODE). By contributing you agree your
contribution ships under those terms.
