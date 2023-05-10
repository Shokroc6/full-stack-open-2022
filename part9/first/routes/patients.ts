import express from "express";
import patientService from "../services/patientService";
import { NewPatientEntry } from "../types";
import { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("get");
  res.send(patientService.getNonSsnePatientEntry());
});

router.get("/:id", (req, res) => {
  console.log("get id");
  console.log(patientService.getAEntry(req.params.id));
  res.send(patientService.getAEntry(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.getAEntry(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.json(addedEntry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  } else {
    res.status(404).send('Patient not found');
  }
});

router.post("/", (req, res) => {
  console.log("post");
  const newPatientEntry = req.body as NewPatientEntry;
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

export default router;
