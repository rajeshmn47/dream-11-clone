import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as React from "react";

import { URL } from "../constants/userConstants";

const Err = styled.p`
  color: red;
`;

export function Otp({ open, setOpen, otp, setOtp, handleotp, err }) {
  const toggleDrawer = () => {
    console.log("rajesh");
    setOpen(false);
  };
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      style={{
        display: "flex",
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "97vw",
          height: "110vh",
          display: "flex",
          backgroundColor: "#FAFAFA",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper style={{ padding: "5vh 2vw", width: "90%", height: "30%" }}>
          <TextField
            placeholder="enter otp you recieved on your mail"
            variant="standard"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disableElevation
            style={{ backgroundColor: "#24B937" }}
            onClick={() => handleotp()}
          >
            Confirm otp
          </Button>
          {err && <Err>{err}</Err>}
        </Paper>
      </div>
    </Drawer>
  );
}

export default Otp;
