import { ENUMS, TRANSITIONS } from "../../config.js";
//export const categories = ["IT", "SAFETY", "FACILITIES", "OTHER"]; // add this to config
//export const severities = ["LOW", "MEDIUM", "HIGH"]; // Add this to config
const categories = ENUMS.CATAGORIES;
const severities = ENUMS.SEVERITIES;

export function validateCreateIncident(body) {
  const errors = [];

  if (!body.title || body.title.length < 5) errors.push("Invalid title");
  if (!body.description || body.description.length < 10) errors.push("Invalid description");
  if (!categories.includes(body.category)) errors.push("Invalid category");
  if (!severities.includes(body.severity)) errors.push("Invalid severity");

  return {
    ok: errors.length === 0,
    errors,
    value: {
      title: body.title,
      description: body.description,
      category: body.category,
      severity: body.severity
    }
  };
}

export function validateStatusChange(current, next) {
  /*const transitions = {
    OPEN: ["INVESTIGATING"],
    INVESTIGATING: ["RESOLVED"],
    RESOLVED: []
  }; //add this to config.js */
  const transitions = TRANSITIONS;

  if (!transitions[current].includes(next)) {
    return { ok: false, error: "Invalid status transition" };
  }

  return { ok: true, next };
}
