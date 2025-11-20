import './login.css';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp } from '../../actions/userAction';  // <-- You will trigger OTP here
import { LOGIN_SUCCESS, URL } from '../../constants/userConstants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: #f7f7f7;
  box-sizing: border-box;

  .MuiPaper-root {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    .MuiPaper-root {
      max-width: 300px;
      box-shadow: none;
      background: transparent;
    }
    justify-content: flex-start;
  }
`;

const Title = styled.h3`
  font-size: 28px;
  color: var(--heading-color);
  margin-bottom: 6px;
`;

const SubInfo = styled.p`
  color: var(--paragraph-color);
  margin-bottom: 20px;
`;

const ChangedTextField = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 50px !important;
  }
`;

const ChangedButton = styled(Button)`
  border-radius: 50px;
  padding: 14px 0px;
  background-color: var(--red);
  font-size: 16px;

  &:hover {
    background-color: red;
  }
`;

const LogoContainer = styled.div`
  padding: 10px;
`

export function LoginPhone() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${URL}/auth/phoneLogin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: phone }),
            });

            const data = await response.json();

            if (data.success) {
                alert("OTP sent successfully!");
                setOtpSent(true);
            } else {
                alert(data.message || "Failed to send OTP");
            }

        } catch (err) {
            alert("Something went wrong while sending OTP");
        }

        setLoading(false);
    };

    // ----------------------------
    // VERIFY OTP FUNCTION
    // ----------------------------
    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            alert("Enter valid 6-digit OTP");
            return;
        }

        try {
            setLoading(true);
            let phoneNum = `+91${phone}`;
            const response = await fetch(`${URL}/auth/verifyPhoneOtp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: phoneNum, otp }),
            });

            const data = await response.json();
            console.log(data, 'data');
            localStorage.setItem('token', data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
            if (data.success) {
                alert("Login successful!");
                navigate("/");
            } else {
                alert(data.message || "Invalid OTP");
            }

        } catch (err) {
            alert(err, "Something went wrong while verifying OTP");
        }

        setLoading(false);
    };

    return (
        <Container>
            <div className="app-title">
                <LogoContainer>
                    <img src="./andrologo.jpeg" alt="" width="200" />
                </LogoContainer>
            </div>

            <Paper>
                {!otpSent ? (
                    <>
                        <Title>Login via Phone</Title>
                        <SubInfo>Enter your mobile number to receive OTP</SubInfo>

                        <form className="login-form" onSubmit={handleSendOtp}>
                            <ChangedTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                className="input-field"
                            />

                            <ChangedButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                disableElevation
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </ChangedButton>
                        </form>

                        <div style={{ marginTop: 15 }}>
                            <Link to="/login">Login with Email?</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Title>Enter OTP</Title>
                        <SubInfo>We sent an OTP to +91 {phone}</SubInfo>

                        <form className="login-form" onSubmit={handleVerifyOtp}>
                            <ChangedTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                type="number"
                                className="input-field"
                            />

                            <ChangedButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                disableElevation
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </ChangedButton>
                        </form>

                        <div style={{ marginTop: 15 }}>
                            <Button variant="text" onClick={() => setOtpSent(false)}>
                                Change phone number?
                            </Button>
                        </div>
                    </>
                )}
            </Paper>
        </Container>
    );
}

export default LoginPhone;
