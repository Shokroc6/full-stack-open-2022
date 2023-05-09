import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("get");
  res.send(patientService.getNonSsnePatientEntry());
});

router.post("/", (req, res) => {
  console.log("post");
  const newPatientEntry = req.body;
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

export default router;
