# mri-data

The ModelRiskIndex registry: **data-as-code model risk assessments, with
evidence.** This is the system of record for every claim published at
[modelriskindex.com](https://modelriskindex.com).

Nothing here is scraped or inferred. Every grade is a human judgment that cites
a source, and every citation binds to a verbatim quote that CI checks really
exists at that source.

---

## Why the data is code

Assertions live in TypeScript rather than a database on purpose:

- **The compiler is a second schema.** Add a requirement to the tier blueprint
  and every model file fails to compile until it answers.
- **Every change gets a diff, an author and a date.** The audit trail is the
  product. A registry you cannot check the history of is a registry you have to
  take on faith.
- **Corrections are public.** Including ours — see the change feed for entries
  where our own published claims did not survive verification.

## What is in here

| Path                       | What it is                                                      |
| -------------------------- | --------------------------------------------------------------- |
| `src/models/`              | One file per tracked model — grades, evidence, tier checklist   |
| `src/sources.ts`           | Source catalog: publisher, kind, trust tier (A–F), URL prefixes |
| `src/schema.ts`            | Zod schema, grade vocabulary, tier computation, quote matching  |
| `src/changelog.ts`         | The public change feed                                          |
| `src/incidents.ts`         | Incident database                                               |
| `scripts/gate.ts`          | Contribution rules, enforced on every PR                        |
| `scripts/verify-quotes.ts` | Fetches new quotes and checks they exist at source              |

## The five vectors

Every model is graded on five buyer questions, capped at five on purpose:

1. **Data governance** — what happens to my data?
2. **Operational stability** — will it change without warning?
3. **Adversarial resistance** — can it be made to misbehave?
4. **Transparency** — can I see how it was built and tested?
5. **Compliance posture** — is it certified?

`strong` / `partial` / `weak` are the applied grades. `not-applicable` and
`under-review` are first-class states, deliberately distinct from a weak grade —
"we have not assessed this" and "this is bad" are different claims.

## Use

```bash
npm ci
npm test              # registry test suite
npm run build         # emits dist/dataset.json
npm run check-links   # network: evidence link liveness
```

The built `dist/dataset.json` is the stable contract for consumers. A free JSON
API of current scores is served at
[modelriskindex.com/api](https://modelriskindex.com/api).

## Corrections

**If we are wrong, please tell us — and prove it.** Read
[CONTRIBUTING.md](CONTRIBUTING.md) first: it explains the six rules CI enforces,
why each exists, and which changes merge automatically.

The short version: include the exact sentence from the source, verbatim. CI will
fetch the page and check.

## Licence

Data is [CC BY 4.0](LICENSE) — reuse it, including commercially, with credit to
ModelRiskIndex. Code is [MIT](LICENSE-CODE). Cited third-party material remains
under its own terms.
