import { randomUUID } from "crypto";

const incidents = []; //Replace with filepath to persistent storage.

export function listAll() {
  return incidents; //replace with proper method to read file.
}

export function findById(id) {
  return incidents.find(i => i.id === id); // replace with method to read file (will call listAll)
}

export function createIncident(data) {
  const incident = {
    id: randomUUID(),
    ...data,
    status: "OPEN",
    reportedAt: new Date().toISOString()
  };
  incidents.push(incident);
  return incident;
  //Implement fs here?
}

export function updateStatus(id, status) {
  const incident = findById(id);
  if (!incident) return null;
  incident.status = status;
  return incident;
  // Implement fs here?
}
