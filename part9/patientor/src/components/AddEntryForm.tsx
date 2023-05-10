import { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { EntryWithoutId } from '../types';
interface EntryFormProps {
  patientId: string;
  add: (id: string, newEntry: EntryWithoutId) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({patientId, add}:EntryFormProps) => {
  const [entryType, setEntryType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [entryDate, setEntryDate] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // Add necessary state variables for HealthCheck, Hospital, and OccupationalHealthcare entries
  // HealthCheckRating
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  // HospitalEntry
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  // OccupationalHealthcareEntry
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

  // Add form submit handler here
  const constructNewEntry = (): EntryWithoutId | null => {
    const baseEntry = {
      description,
      date: entryDate,
      specialist: 'Placeholder specialist', // Replace this with an actual specialist input field if necessary
      diagnosisCodes,
    };
  
    switch (entryType) {
      case 'HealthCheck':
        return {
          ...baseEntry,
          type: entryType,
          healthCheckRating,
        };
      case 'Hospital':
        return {
          ...baseEntry,
          type: entryType,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      case 'OccupationalHealthcare':
        return {
          ...baseEntry,
          type: entryType,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
      default:
        return null;
    }
  };
  
  const resetForm = () => {
    setDescription('');
    setEntryType('');
    setEntryDate('');
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };
  

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const newEntry = constructNewEntry();
  
    if (!newEntry) {
      // Show error message for unsupported entry type
      return;
    }
  
    try {
      await add(patientId, newEntry);
      resetForm();
  
      // Update the patient's entries in the application state
      // This logic depends on how you manage your application state (e.g., using Redux, React Context, or local state)
  
      // Reset form fields if necessary
    } catch (error) {
      // Handle error cases, such as invalid form values and backend errors
      // Show an appropriate error message to the user
    }
  };
  
  
  return (
    <form onSubmit={onSubmit}>
      {/* Entry type selection */}
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={entryType}
          onChange={(event) => setEntryType(event.target.value as string)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>
      </FormControl>

      {/* Other form fields for description, date, diagnosisCodes, etc. */}
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        label="Date"
        fullWidth
        type="date"
        value={entryDate}
        onChange={(event) => setEntryDate(event.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value as string[])}
        >
          <MenuItem
              key="1"
              value="X01"
            >
              X01
            </MenuItem>
            <MenuItem
              key="2"
              value="X02"
            >
              X02
            </MenuItem>
            <MenuItem
              key="3"
              value="X03"
            >
              X03
            </MenuItem>
        </Select>
      </FormControl>

      {/* Add form fields specific to each entry type based on entryType state */}
      {entryType === 'HealthCheck' && (
        <TextField
          label="Health Check Rating"
          fullWidth
          type="number"
          value={healthCheckRating}
          onChange={(event) => setHealthCheckRating(parseInt(event.target.value))}
        />
      )}

      {entryType === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            fullWidth
            type="date"
            value={dischargeDate}
            onChange={(event) => setDischargeDate(event.target.value)}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={(event) => setDischargeCriteria(event.target.value)}
          />
        </>
      )}

      {entryType === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={(event) => setEmployerName(event.target.value)}
          />
          <TextField
            label="Sick Leave Start Date"
            fullWidth
            type="date"
            value={sickLeaveStartDate}
            onChange={(event) => setSickLeaveStartDate(event.target.value)}
          />
          <TextField
            label="Sick Leave End Date"
            fullWidth
            type="date"
            value={sickLeaveEndDate}
            onChange={(event) => setSickLeaveEndDate(event.target.value)}
          />
        </>
      )}

      {/* Submit button */}
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </form>
  );
};

export default EntryForm;
