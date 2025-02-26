import styled from "@emotion/styled";
import { Button, Drawer, Paper, TextField, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4); /* Subtle overlay */
`;

const OtpBox = styled(Paper)`
  width: 100%;
  max-width: 380px;
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  background: #fff;
`;

const CloseButton = styled(IconButton)`
width:20px;
  position: absolute !important;
  top: 10px !important;
  right: 10px !important;
`;

export function Otp({ open, setOpen, otp, setOtp, handleOtp, err }) {
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer anchor="top" open={open} onClose={toggleDrawer}>
      <Container>
        <OtpBox>
          {/* Properly aligned close button */}
          <CloseButton onClick={toggleDrawer}>
            <CloseIcon />
          </CloseButton>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Enter OTP
          </Typography>
          <TextField
            placeholder="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "18px",
              },
            }}
          />
          <div style={{marginTop: "10px"}}>
            {err ? (
              <Typography variant="body2" color="error">
                {err}!
              </Typography>
            ) : (<Typography variant="body2" color="textSecondary">
              Enter otp u recieved!
            </Typography>)}
          </div>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#03d47c",
              mt: 2,
              padding: "10px 0",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#02b86c" },
            }}
            onClick={handleOtp}
          >
            Confirm OTP
          </Button>
          <Button variant="text" sx={{ mt: 1 }} onClick={toggleDrawer}>
            Close
          </Button>
        </OtpBox>
      </Container>
    </Drawer>
  );
}

export default Otp;







