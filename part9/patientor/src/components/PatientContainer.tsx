import { Patient, Diagnosis, EntryWithoutId, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";
import EntryForm from "./AddEntryForm";
import { useState } from "react";
import { Typography } from "@mui/material";
import patientService from "../services/patients";

type PatientPageProps = {
  patient: Patient;
  diagnoses: Diagnosis[];
};

const PatientPage = ({patient, diagnoses} : PatientPageProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [entries, setEntries] = useState<Entry[]>(patient.entries);
  const add = async (id: string, newEntry: EntryWithoutId) => {
  
    if (!newEntry) {
      // Show error message for unsupported entry type
      return;
    }
  
    try {
      const entry = await patientService.addEntry(id, newEntry);
      setEntries(entries.concat(entry as Entry));
  
      // Clear the error message if any
      setErrorMessage(null);
    } catch (error) {
      // Handle error cases, such as invalid form values and backend errors
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h3>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h3>
      <p>ssn: {patient.ssn} </p>
      <p>occupation: {patient.occupation} </p>      
      {errorMessage && (
        <Typography variant="subtitle1" color="error">
          {errorMessage}
        </Typography>
      )}

      <h4>Entries:</h4>
      <EntryForm patientId={patient.id} add={add}/>
      {entries.map((entry) => ( 
        <EntryDetails key={entry.id} entry={entry} />
      ))}

    </div>
  )
}

interface PatientContainerProps {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
}

const PatientContainer: React.FC<PatientContainerProps> = ({ patient, diagnoses }) => {
  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return <PatientPage patient={patient}  diagnoses={diagnoses}/>;
};

export default PatientContainer;