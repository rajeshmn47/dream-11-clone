import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';

const steps = ['Select Match', 'Create Team', 'Join Contest'];

export default function Steppr() {
  return (
    <Box sx={{ width: '100%', color: '#FFFFFF' }}>
      <Stepper
        color="secondary"
        activeStep={0}
        alternativeLabel
        sx={{ width: '100%', color: '#FFFFFF' }}
      >
        {steps.map((label) => (
          <Step
            color="secondary"
            key={label}
            sx={{ width: '100%', color: '#FFFFFF' }}
          >
            <StepLabel
              color="secondary"
              style={{ width: '100%', color: '#FFFFFF' }}
            >
              <h5 style={{ margin: '0', color: '#FFFFFF' }}>{label}</h5>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
