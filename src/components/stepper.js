import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function Steppr() {
  return (
    <Box sx={{ width: '100%',color:'#FFFFFF' }}>
      <Stepper activeStep={0} alternativeLabel sx={{ width: '100%',color:'#FFFFFF' }}>
        {steps.map((label) => (
          <Step key={label} sx={{ width: '100%',color:'#FFFFFF' }}>
            <StepLabel style={{ width: '100%',color:'#FFFFFF' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

