import express from "express";
import multer from "multer";

import { listAll, findById, createIncident, updateStatus } from "../store/incidents.store.js";
import { parseCsvBuffer } from "../utils/csv.js";
import { validateCreateIncident, validateStatusChange } from "../utils/validate.js";


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
  res.json(await listAll());
});

router.get("/:id", async (req, res) => {
  const incident = await findById(req.params.id);
  if (!incident) return res.status(404).json({ error: "Incident not found" });
  res.json(incident);
});

router.post("/", async (req, res) => {
  const result = await validateCreateIncident(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.errors });
  }

  const incident = await createIncident(result.value);
  res.status(201).json(incident);
});

router.patch("/:id/status", async (req, res) => {
  const incident = await findById(req.params.id);
  if (!incident) return res.status(404).json({ error: "Incident not found" });

  const check = validateStatusChange(incident.status, req.body.status);
  if (!check.ok) return res.status(400).json({ error: check.error });

  const updated = await updateStatus(incident.id, check.next);
  res.json(updated);
});

router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  const records = await parseCsvBuffer(req.file.buffer);

  let created = 0;
  let skipped = 0;

  for (const row of records){
    const result = validateCreateIncident(row);
    if (!result.ok) {
      skipped++;
      continue
    }
    await createIncident(result.value);
    created++;
  }

  res.json({
    totalRows: records.length,
    created,
    skipped
  });
});

export default router;
