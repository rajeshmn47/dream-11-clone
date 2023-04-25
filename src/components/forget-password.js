import "./register.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useState, react, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../constants/userConstants";
import { login } from "../actions/userAction";
import styled from "@emotion/styled";
import Otp from "./otp";
import NewPassword from "./newpassword";

const Err = styled.p`
  color: red;
`;

export const ForgotPassword = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [showInput, SetShowInput] = useState(false);
  const [err, setErr] = useState();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();
  const [cp, setCp] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [user, isAuthenticated]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const { data } = await axios.get(`${URL}/auth/forgot-password/${email}`);
    console.log(data, "data");
    if (data.success) {
      setOpen(true);
    }
  };
  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/forgot-password-otp`, {
      email: email,
      otp: otp,
    });
    console.log(data);
    setErr(data.data.message);
    if (data.data.success) {
      setCp(true);
    }
  };
  const handlenewPassword = async () => {
    const data = await axios.post(`${URL}/auth/changepassword`, {
      email: email,
      password: password,
    });
    console.log(data);
    setErr(data.data.message);
  };
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
        Dream 11
      </div>
      {!open ? (
        <div className="register">
          <Paper style={{ padding: "2vh 2vw" }}>
            <h5 style={{ marginBottom: "10px" }}>LOG IN & PLAY</h5>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "black",
                  width: "50%",
                  marginRight: "1vw",
                }}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                elevation="2"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "black",
                  width: "50%",
                }}
              >
                Google
              </Button>
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
                style={{ backgroundColor: "#24B937" }}
              >
                send otp
              </Button>
              {error && <Err>{error}</Err>}
            </form>
            <Link to="/forgot-password">forgot password</Link>
            <Link to="/register">Dont have a account?Sign up</Link>
          </Paper>
        </div>
      ) : !cp ? (
        <Otp
          open={open}
          setOpen={setOpen}
          otp={otp}
          setOtp={setOtp}
          handleotp={handleotp}
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
};

export default ForgotPassword;
