import fs from "fs";
import fsp from "fs/promises";
import { PATHS, STORAGE_MODE } from "../../config.js";

async function ensureDirs() {
    const dirs = [PATHS.DATA_DIR];
    if (STORAGE_MODE === "sync"){
       for (const d of dirs) fs.mkdirSync(d, { recursive: true });
       if(!fs.existsSync(PATHS.INCIDENTS_INDEX)) fs.writeFileSync(PATHS.INCIDENTS_INDEX, "[]", "utf-8");
       return;
    }
    for (const d of dirs) await fsp.mkdir(d, {recursive: true});
    try{ await fsp.access(PATHS.INCIDENTS_INDEX); } catch { await fsp.writeFile(PATHS.INCIDENTS_INDEX, "[]", "utf-8");}
}

export async function readIndex() {
  await ensureDirs();
  if (STORAGE_MODE === "sync") {
    const txt = fs.readFileSync(PATHS.INCIDENTS_INDEX, "utf8");
    return JSON.parse(txt || "[]");
  }
  const txt = await fsp.readFile(PATHS.INCIDENTS_INDEX, "utf8");
  return JSON.parse(txt || "[]");
}

export async function writeIndex(docs) {
  await ensureDirs();
  const json = JSON.stringify(docs, null, 2);
  if (STORAGE_MODE === "sync") {
    const tmp = `${PATHS.INCIDENTS_INDEX}.tmp`;
    fs.writeFileSync(tmp, json, "utf8");
    fs.renameSync(tmp, PATHS.INCIDENTS_INDEX);
    return;
  }
  const tmp = `${PATHS.INCIDENTS_INDEX}.tmp`;
  await fsp.writeFile(tmp, json, "utf8");
  await fsp.rename(tmp, PATHS.INCIDENTS_INDEX);
}