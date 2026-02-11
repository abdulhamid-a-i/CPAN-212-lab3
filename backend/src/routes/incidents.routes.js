import express from "express";
import multer from "multer";

import { listAll, findById, createIncident, updateStatus } from "../store/incidents.store.js";
import { parseCsvBuffer } from "../utils/csv.js";
import { validateCreateIncident, validateStatusChange } from "../utils/validate.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res) => {
  res.json(listAll());
});

router.get("/:id", (req, res) => {
  const incident = findById(req.params.id);
  if (!incident) return res.status(404).json({ error: "Incident not found" });
  res.json(incident);
});

router.post("/", (req, res) => {
  const result = validateCreateIncident(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.errors });
  }

  const incident = createIncident(result.value);
  res.status(201).json(incident);
});

router.patch("/:id/status", (req, res) => {
  const incident = findById(req.params.id);
  if (!incident) return res.status(404).json({ error: "Incident not found" });

  const check = validateStatusChange(incident.status, req.body.status);
  if (!check.ok) return res.status(400).json({ error: check.error });

  const updated = updateStatus(incident.id, check.next);
  res.json(updated);
});

router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  const records = await parseCsvBuffer(req.file.buffer);

  let created = 0;
  let skipped = 0;

  records.forEach(row => {
    const result = validateCreateIncident(row);
    if (!result.ok) {
      skipped++;
      return;
    }
    createIncident(result.value);
    created++;
  });

  res.json({
    totalRows: records.length,
    created,
    skipped
  });
});

export default router;
