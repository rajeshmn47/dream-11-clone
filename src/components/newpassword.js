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

export function NewPassword({
  open,
  setOpen,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handlenewPassword,
  err,
}) {
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
            placeholder="enter password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            placeholder="confirm your password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disableElevation
            style={{ backgroundColor: "#24B937" }}
            onClick={() => handlenewPassword()}
          >
            submit
          </Button>
          {err && <Err>{err}</Err>}
        </Paper>
      </div>
    </Drawer>
  );
}

export default NewPassword;
