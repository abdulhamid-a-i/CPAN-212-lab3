import { randomUUID } from "crypto";
import { readIndex, writeIndex } from "../utils/fileStore.js";

//const incidents = []; //Replace with filepath to persistent storage.

export async function listAll() {
  return await readIndex();
  //return incidents; //replace with proper method to read file.
}

export async function findById(id) {
  const incidents = await readIndex();
  return incidents.find(i => i.id === id) ?? null;
}

export async function createIncident(data) {
  const incidents = await readIndex();
  const incident = {
    id: randomUUID(),
    ...data,
    status: "OPEN",
    reportedAt: new Date().toISOString()
  };
  incidents.push(incident);
  await writeIndex(incidents);
  return incident;
  //Call write functions here
}

export async function updateStatus(id, status) {
  const incidents = await readIndex();
  if (!id < 0) return null;
  const idx = incidents.findIndex((i) => i.id === id);
  incidents[idx].status = status;
  await writeIndex(incidents);
  return incidents[idx];
  
}
