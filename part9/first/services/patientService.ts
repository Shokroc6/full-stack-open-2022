import patientData from "../data/patients";
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Entry, EntryWithoutId } from "../types";
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


const getAEntry = (id: string) => {
  return patientEntries.find((obj) => obj.id === id);
};

const getNonSsnePatientEntry = (): Array<NonSensitivePatientEntry> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
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

const addEntry = (patient: PatientEntry, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSsnePatientEntry,
  getAEntry,
  addEntry
};
