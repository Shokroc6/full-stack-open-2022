
import { NewPatientEntry, Gender, Entry, HealthCheckRating, Discharge, SickLeave} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (s: unknown): string => {
  if (!isString(s)) {
    throw new Error('Incorrect or missing comment');
  }

  return s;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== 'object') return false;

  const entryType = (entry as Entry).type;
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(entryType);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }

  entries.forEach(entry => {
    if (!isEntry(entry)) {
      throw new Error('Incorrect entry: ' + JSON.stringify(entry));
    }
  });

  return entries as Entry[]; 
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ){   
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries),
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType).map(v => v.toString()).includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }
  return type;
};

const isNum = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNum(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const isDischarge = (param: unknown): param is Discharge => {
  if ( !param || typeof param !== 'object' ) {
    return false;
  }
  if('date' in param && 'criteria' in param) {
    return isString(param.date) && isDate(param.date) && isString(param.criteria);
  }
  else return false;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const isSickLeave = (param: unknown): param is SickLeave => {
  if ( !param || typeof param !== 'object' ) {
    return false;
  }
  if('startDate' in param && 'endDate' in param) {
    return isString(param.startDate) && isDate(param.startDate) &&isString(param.endDate) && isDate(param.endDate);
  }
  else return false;
};

const isArray = (value: unknown): value is Array<any> => {
  return Array.isArray(value);
};

const isStringArray = (value: unknown): value is string[] => {
  return isArray(value) && value.every(item => isString(item));
};

const parseDiagnosisCodes = (value: unknown): Array<string> => {
  if (!isStringArray(value)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + value);
  }
  return value;
};


const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }

  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect sick leave: ' + sickLeave);
  }
  return sickLeave;
};



export const toNewEntry = (object: unknown): EntryWithoutId => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  let commonFields;

  if ( 'diagnosisCodes' in object){   
    commonFields = {
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
  } else {
    commonFields = {
      diagnosisCodes: []
    };
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object 
  ){   
    commonFields = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist)
    };
  } else {
    throw new Error('Incorrect data: a commonFields field missing');
  }




  if(!('type' in object))   throw new Error('Incorrect data: type field missing');
  const entryType = parseEntryType(object.type);

  switch (entryType) {
    case EntryType.HealthCheck:{
      if (
        'healthCheckRating' in object
      ){   
        const newEntry: EntryWithoutId = {
            ...commonFields,
          type: EntryType.HealthCheck,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      
        return newEntry;
      }
    
      throw new Error('Incorrect data: healthCheckRating field missing');
    }

    case EntryType.Hospital:{
      if (
        'discharge' in object
      ){   
        const newEntry: EntryWithoutId = {
            ...commonFields,
          type: EntryType.Hospital,
          discharge: parseDischarge(object.discharge),
        };
      
        return newEntry;
      }
    
      throw new Error('Incorrect data: discharge field missing');
    }

    case EntryType.OccupationalHealthcare:{      
      if (
        'employerName' in object &&
        'sickLeave' in object 
      ){   
        const newEntry: EntryWithoutId = {
            ...commonFields,
            type: EntryType.OccupationalHealthcare,
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
        };
      
        return newEntry;
      }
      throw new Error('Incorrect data: a OccupationalHealthcare field missing');
    }
    default:
      throw new Error(`Unhandled entry type: ${JSON.stringify(object)}`);
  }
};


export default toNewPatientEntry;