import './register.css';
import 'react-phone-number-input/style.css';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { LOGIN_SUCCESS, URL } from '../constants/userConstants';
import Otp from './otp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing:border-box;

  .MuiPaper-root {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export function Register() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Must be at least 6 characters')
      .max(20, 'Must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Must be at least 6 characters')
      .max(40, 'Must not exceed 40 characters'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9+-]+$/, 'Only numbers allowed')
      .min(10, 'Must be 10 characters')
      .max(10, 'Must not exceed 10 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (error) alert.error(error);
  }, [user, isAuthenticated, error]);

  const onSubmit = async (formData) => {
    setEmail(formData.email);
    try {
      const data = await axios.post(`${URL}/auth/register`, formData);
      if (data.data.success) {
        setSuccess(data.data.message);
        alert.success(data.data.message);
        //setOpen(true);
        navigate('/login')
      } else {
        alert.error(e.response.data.message);
        setErr(data.data.message);
      }
    } catch (e) {
      console.log(e, 'e')
      alert.error(e.response.data.message);
    }
  };

  const handleOtp = async () => {
    try {
      const data = await axios.post(`${URL}/auth/otp`, { email, otp });
      setErr(data.data.message);
      localStorage.setItem('token', data.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
      alert.success(data.data.message);
    } catch (e) {
      alert.error('Invalid OTP!');
      console.log(e.response.data.message, 'e')
      setErr(e.response.data.message)
    }
  };

  return (
    <Container>
      <div className="registertopbar">
        <ArrowBackIcon style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => navigate(-1)} />
        Register & Play
      </div>

      <Paper className="MuiPaper-root">
        <form onSubmit={handleSubmit(onSubmit)} className="registerform">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="dense"
            {...register('email')}
            error={!!errors.email}
          />
          <Typography variant="inherit">{errors.email?.message}</Typography>

          <TextField
            id="username"
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            type="text"
            {...register('username')}
            error={!!errors.username}
          />
          <Typography variant="inherit">{errors.username?.message}</Typography>

          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
          />
          <Typography variant="inherit">{errors.phoneNumber?.message}</Typography>

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register('password')}
            error={!!errors.password}
          />
          <Typography variant="inherit">{errors.password?.message}</Typography>

          <Button className="register-btn" variant="contained" type="submit">
            Register
          </Button>
        </form>

        <div className="register-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <br />
          <Link to="/login">Already a user? Log in</Link>
        </div>
      </Paper>

      <Otp open={open} setOpen={setOpen} otp={otp} setOtp={setOtp} handleOtp={handleOtp} err={err} />
    </Container>
  );
}

export default Register;

