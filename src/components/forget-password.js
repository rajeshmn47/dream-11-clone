import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { URL } from '../constants/userConstants';
import NewPassword from './newpassword';
import Otp from './otp';

const Err = styled.p`
  color: red;
`;

export function ForgotPassword() {
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();
  const [showInput, SetShowInput] = useState(false);
  const [err, setErr] = useState();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();
  const [cp, setCp] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [user, isAuthenticated]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const { data } = await axios.get(`${URL}/auth/forgot-password/${email}`);
    console.log(data, 'data');
    if (data.success) {
      setOpen(true);
    }
  };
  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/forgot-password-otp`, {
      email,
      otp,
    });
    console.log(data);
    setErr(data.data.message);
    if (data.data.success) {
      setCp(true);
    }
  };
  const handlenewPassword = async () => {
    const data = await axios.post(`${URL}/auth/changepassword`, {
      email,
      password,
    });
    console.log(data);
    setErr(data.data.message);
  };
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: '1vw' }} />
        FC4U
      </div>
      {!open ? (
        <div className="login">
          <Paper style={{ padding: '2vh 2vw', height: '320px' }}>
            <h5 style={{ marginBottom: '10px' }}>LOG IN & PLAY</h5>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
              }}
            >
              
            </div>
            <form onSubmit={handlesubmit} className="forgotform">
              <TextField
                id="fullWidth"
                defaultValue="Hello World"
                variant="standard"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button
                type="submit"
                className="itseveryday"
                variant="contained"
                disableElevation
                style={{ backgroundColor: '#03d47c',marginTop:'10px' }}
              >
                send otp
              </Button>
              {error && <Err>{error}</Err>}
            </form>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link to="/forgot-password">forgot password</Link>
              <Link to="/register">Dont have a account?Sign up</Link>
            </div>
          </Paper>
        </div>
      ) : !cp ? (
        <Otp
          open={open}
          setOpen={setOpen}
          otp={otp}
          setOtp={setOtp}
          handleOtp={handleotp}
          err={err}
        />
      ) : (
        <NewPassword
          open={cp}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handlenewPassword={handlenewPassword}
          err={err}
        />
      )}
    </>
  );
}

export default ForgotPassword;
