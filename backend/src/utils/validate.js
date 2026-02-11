export const categories = ["IT", "SAFETY", "FACILITIES", "OTHER"];
export const severities = ["LOW", "MEDIUM", "HIGH"];

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
  const transitions = {
    OPEN: ["INVESTIGATING"],
    INVESTIGATING: ["RESOLVED"],
    RESOLVED: []
  };

  if (!transitions[current].includes(next)) {
    return { ok: false, error: "Invalid status transition" };
  }

  return { ok: true, next };
}
