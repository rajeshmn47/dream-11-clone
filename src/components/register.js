import "./register.css";

import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { react, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LOGIN_SUCCESS, URL } from "../constants/userConstants";
import Otp from "./otp";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";

const PHONE_REGEX = new RegExp(
  /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim
);

const Err = styled.p`
  color: red;
`;

export function Register() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [err, setErr] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    phoneInput: Yup.string(),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9+-]+$/, "It must be in numbers")
      .min(10, "Phone Number must be at least 10 characters")
      .max(10, "Phone Number must not exceed 10 characters"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
    }
  }, [user, isAuthenticated, error]);

  console.log(errors, "errors");
  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    //e.preventDefault();
    setEmail(formData.email);
    const data = await axios.post(`${URL}/auth/register`, {
      ...formData,
    });
    console.log(data);
    if (data.data.success) {
      setErr(data.data.message);
      alert.success(data.data.message);
      setOpen(true);
    } else {
      alert.error(data.data.message);
      setErr(data.data.message);
    }
  };

  const handleotp = async () => {
    try{
    const data = await axios.post(`${URL}/auth/otp`, {
      email,
      otp,
    });
    setErr(data.data.message);
    localStorage.setItem("token", data.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
    alert.success(data.data.message);
  }
  catch(e){
    alert.error(e)
  }
  };

  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon
          style={{ marginRight: "20px" }}
          onClick={() => navigate(-1)}
        />
        register & play
      </div>

      <div className="register">
        <Paper style={{ padding: "5px 5px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="registerform">
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="dense"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
            <TextField
              required
              id="username"
              name="username"
              label="Name"
              variant="standard"
              fullWidth
              margin="dense"
              {...register("username")}
              error={errors.username ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="standard"
              fullWidth
              margin="dense"
              {...register("phoneNumber")}
              error={errors.phoneNumber ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.phoneNumber?.message}
            </Typography>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              variant="standard"
              fullWidth
              margin="dense"
              {...register("password")}
              error={errors.password ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Register
            </Button>
          </form>
          <Link to="/forgot-password">forgot password</Link>
        </Paper>
        <Link to="/login">Aleady a user?Log in</Link>
      </div>
      <Otp
        open={open}
        setOpen={setOpen}
        otp={otp}
        setOtp={setOtp}
        handleotp={handleotp}
        err={err}
      />
    </>
  );
}

export default Register;
