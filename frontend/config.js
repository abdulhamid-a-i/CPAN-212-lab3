export const API_BASE_URL = "http://localhost:3001";

export const ENUMS = {
  CATAGORIES: ["IT", "SAFETY", "FACILITIES", "OTHER"],
  SEVERITIES: ["LOW", "MEDIUM", "HIGH"],
};

export const TRANSITIONS = {
    OPEN: ["INVESTIGATING", "ARCHIVED"],
    INVESTIGATING: ["RESOLVED"],
    RESOLVED: ["ARCHIVED"],
    ARCHIVED: ["OPEN"]
}