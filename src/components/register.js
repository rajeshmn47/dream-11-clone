import "./register.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState, react } from "react";
import { URL } from "../constants/userConstants";
import Otp from "./otp";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log(phonenumber, username, email, password);
    const data = await axios.post(`${URL}/auth/register`, {
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
    });
    console.log(data);
    setOpen(true);
  };

  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/otp`, {
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
      otp: otp,
    });
    console.log(data);
  };
  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon style={{ marginRight: "2vw" }} />
        register & play
      </div>

      <div className="register">
        <Paper style={{ padding: "2vh 2vw" }}>
          <form onSubmit={handlesubmit} className="registerform">
            <TextField
              placeholder="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              placeholder="name"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder="Phonenumber"
              variant="standard"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              type="phone"
            />

            <TextField
              placeholder="Password"
              variant="standard"
              id="fullWidth"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Register
            </Button>
          </form>
          forgot password
        </Paper>
        <h5>Aleady a user?Log in</h5>
      </div>
      <Otp
        open={open}
        setOpen={setOpen}
        otp={otp}
        setOtp={setOtp}
        handleotp={handleotp}
      />
    </>
  );
};

export default Register;
