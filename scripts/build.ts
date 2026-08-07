/**
 * Emits the versioned JSON artifact consumers use: dist/dataset.json.
 * The site currently imports the typed registry directly (fine at this
 * scale); this artifact is the stable contract for the public API, data
 * licensing, and the future R2/KV-hosted serving path.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  allEvents,
  allIncidents,
  allModels,
  DATASET_VERSION,
} from "../src/registry";
import { SOURCES } from "../src/sources";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
mkdirSync(out, { recursive: true });

const artifact = {
  dataset_version: DATASET_VERSION,
  generated_at: new Date().toISOString(),
  sources: SOURCES,
  models: allModels,
  change_events: allEvents,
  incidents: allIncidents,
};

writeFileSync(join(out, "dataset.json"), JSON.stringify(artifact, null, 2));
console.log(
  `dataset.json written: ${allModels.length} models, ${allEvents.length} events, ${allIncidents.length} incidents (version ${DATASET_VERSION})`,
);
