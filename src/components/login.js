import "./register.css";

import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { react, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../actions/userAction";
import { URL } from "../constants/userConstants";
import { useAlert } from "react-alert";
import { Box, Typography } from "@mui/material";

const Err = styled.p`
  color: red;
`;

export function Login() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
    }
  }, [user, isAuthenticated, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const formdata = { email, password };
    dispatch(login(formdata));
  };
  return (
    <Box sx={{ backgroundColor: "#03D47C", minHeight: "100vh" }}>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
        Dream 11
      </div>

      <Box
        sx={{
          marginTop: 15,
          marginLeft: { xs: "none", sm: "none", md: "33%" },
          marginRight: { xs: "none", sm: "none", md: "33%" },
        }}
      >
        <Paper
          style={{
            padding: 25,
            minHeight: "60vh",
            border: "solid 1px black",
          }}
        >
          <Typography variant="h3">LOG IN & PLAY</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "30%",
                marginRight: "1vw",
                height: "30px",
                border: "solid 1px black",
              }}
              onClick={() =>
                alert("not working yet,only google login is working")
              }
            >
              <img src="./github.svg" alt="" />
              Github
            </Button>
            <Button
              variant="contained"
              elevation="2"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "30%",
                height: "30px",
                display: "flex",
                alignItems: "center",
                border: "solid 1px black",
              }}
              onClick={() => navigate("/googlelogin")}
            >
              <img src="./google.svg" alt="" style={{ marginRight: "5px" }} />
              Google
            </Button>
          </Box>
          <form onSubmit={handlesubmit} className="loginform">
            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              sx={{
                borderRadius: "5px",
                padding: 1,
                mb: 1,
                border: "solid 1px black",
              }}
            />

            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                border: "solid 1px black",
                borderRadius: "5px",
                padding: 1,
                mb: 2,
              }}
            />
            <Button
              type="submit"
              className="itseveryday"
              variant="contained"
              disableElevation
              sx={{ backgroundColor: "#03d47c", marginTop: 2 }}
            >
              Log in
            </Button>
          </form>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Link to="/forgot-password">Forgot Password</Link>
            </Box>
            <Box>
              <Link to="/register">Don't have an account? Sign up</Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
