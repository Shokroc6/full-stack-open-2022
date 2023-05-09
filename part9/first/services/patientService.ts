import patientData from "../data/patients";
import { PatientEntry, NonSsnePatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatientEntry from "../utils";

const patientEntries: Array<PatientEntry> = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<PatientEntry> => {
  return patientEntries;
};

const getNonSsnePatientEntry = (): Array<NonSsnePatientEntry> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...toNewPatientEntry(entry),
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSsnePatientEntry,
};
