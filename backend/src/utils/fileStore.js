import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { PATHS, STORAGE_MODE } from "../../config";

async function ensureDirs() {
    const dirs = [PATHS.DATA_DIR];
    if (STORAGE_MODE === "sync"){
       for (const d of dirs) fs.mkdirSync(d, { recursive: true });
    }
}