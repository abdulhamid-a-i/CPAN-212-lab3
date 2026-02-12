import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 3001;

export const STORAGE_MODE = "async";

export const BACKEND_DIR = path.resolve(__dirname, ".");

export const PATHS = {
    DATA_DIR: path.join(BACKEND_DIR, "src","store","data"),
    INCIDENTS_INDEX: path.join(BACKEND_DIR,"src","store","data","incidents.json")
};

export const LIMITS = {
  MAX_BODY_BYTES: 1_000_000,
  MAX_DOC_BYTES: 200_000
};

export const ENUMS = {
  CATAGORIES: ["IT", "SAFETY", "FACILITIES", "OTHER"],
  SEVERITIES: ["LOW", "MEDIUM", "HIGH"],
};

export const TRANSITIONS = {
    OPEN: ["INVESTIGATING", "ARCHIVED"],
    INVESTIGATING: ["RESOLVED"],
    RESOLVED: ["ARCHIVED"],
    ARCHIVED:["OPEN"]
};
