import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { Card, CardContent, Typography,  Box } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  const HealthCheckRatingIcon = (rating: HealthCheckRating) => {
    const color = () => {
      switch (rating) {
        case HealthCheckRating.Healthy:
          return 'primary';
        case HealthCheckRating.LowRisk:
          return 'secondary';
        case HealthCheckRating.HighRisk:
          return 'error';
        case HealthCheckRating.CriticalRisk:
          return 'action';
        default:
          return undefined;
      }
    };

    return <FavoriteIcon color={color()} fontSize="small" />;
  };

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box marginBottom="1em">
        <Card>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <HospitalIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>
              Health check rating: {HealthCheckRatingIcon(entry.healthCheckRating)}
            </Typography>
          </CardContent>
        </Card>
        </Box>
      );
    case 'Hospital':
      return (
        <Box marginBottom="1em">
        <Card>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <HospitalIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Discharge date: {entry.discharge.date}</Typography>
            <Typography>Discharge criteria: {entry.discharge.criteria}</Typography>
          </CardContent>
        </Card>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box marginBottom="1em">
        <Card>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <WorkIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.sickLeave && (
              <Typography>
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            )}
          </CardContent>
        </Card>
        </Box>
      );
      default:
        return assertNever(entry);
    }
  };
  
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
  };
  
  export default EntryDetails;
  
