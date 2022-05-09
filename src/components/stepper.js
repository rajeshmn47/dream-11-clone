import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { StepIconProps } from '@mui/material/StepIcon';
import { Fragment } from 'react';
import './home.css'

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Select Team</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Create Team</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Join Contests</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];



  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={1} >
        {steps.map((a) => (
          <Step color='#FFFFFF'  key={a.label} style={{color:'#FFFFFF',backgroundColor:'FFFFFF'}}>
            <StepLabel color='#FFFFFF' style={{color:'#FFFFFF',backgroundColor:'FFFFFF'}}>{a.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
