import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const Err = styled.p`
  color: #e53935;
  font-size: 13.5px;
  margin: 6px 0 0;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

export function NewPassword({
  open,
  setOpen,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handlenewPassword,
  err,
  success
}) {
  const toggleDrawer = () => {
    console.log('rajesh');
    setOpen(false);
  };
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      style={{
        display: 'flex',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '97vw',
          height: '110vh',
          display: 'flex',
          backgroundColor: '#FAFAFA',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper style={{ padding: '5vh 2vw', width: '90%', height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="enter password"
            variant="standard"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            placeholder="confirm your password"
            variant="standard"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disableElevation
            style={{ backgroundColor: '#FF4B00' }}
            onClick={() => handlenewPassword()}
          >
            submit
          </Button>
          {err &&
            <Err>
              {err}{" "}
              {success && <span><a href="/login">login</a></span>}
            </Err>}
        </Paper>
      </div>
    </Drawer>
  );
}

export default NewPassword;
