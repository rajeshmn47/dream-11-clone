import './login.css';
import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/userAction';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing:border-box;
  background-color: #f7f7f7;
   .MuiPaper-root {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TopBar = styled.div`
   display:flex;
   align-items:center;
   margin-bottom:10px;
`;

const Title = styled.h3`
   font-size: 32px;
   color: var(--heading-color);
   margin: 5px 0;
`;

const SubTitle = styled.p`
   color: var(--paragraph-color);
   margin-bottom: 20px;
`;

const Info = styled.p`
   color: var(--paragraph-color);
`;

const ChangedTextField = styled(TextField)`
border-radius: 5px;
.MuiInputBase-root{
  border-radius: 50px !important;
}
`

const ChangedButton = styled(Button)`
border-radius: 50px;
padding: 15px 0px;
background-color: var(--red);
.MuiButtonBase-root{
  border-radius: 50px !important;
}
:hover{
  background-color: red;
}
`;

const RegisterLinks = styled.div`
margin:15px 0;
`;

const Err = styled.p`
  color: red;
`;

export function Login() {
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const alert = useAlert();
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      alert.error(error);
    }
  }, [user, isAuthenticated, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = { email, password };
    dispatch(login(formdata));
  };

  return (
    <Container>
      <TopBar>
        <Title>Let’s login.</Title>
      </TopBar>
      <SubTitle>Let’s us know what your email, and your password</SubTitle>
      {/* Header */}

      {/* Login Form Section */}
      {/* Social Login Buttons 
          <div className="social-login">
            <Button
              variant="contained"
              //disabled={true}
              className="social-btn github"
              onClick={() => alert('Not working yet, only Google login is available')}
            >
              <img src="./github.svg" alt="Github" className="social-icon" />
              Github
            </Button>
            <Button
              variant="contained"
              //disabled={true}
              className="social-btn"
              onClick={() => navigate('/googlelogin')}
            >
              <img src="./google.svg" alt="Google" className="social-icon" />
              Google
            </Button>
          </div>
*/}
      {/* Login Form */}
      <form onSubmit={handlesubmit} className="login-form">
        <ChangedTextField
          fullWidth
          variant="outlined"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input-field"
        />

        <ChangedTextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        {/* Login Button */}
        <ChangedButton type="submit" className="" variant="contained" disableElevation>
          {loading ? 'Logging in...' : 'Log in'}
        </ChangedButton>
      </form>

      {/* Links */}
      <RegisterLinks>
        <Link to="/forgot-password">Forgot password?</Link>
        <br />
        <Info>Don't have an account? <Link to="/register">Sign up</Link></Info>
      </RegisterLinks>
    </Container>
  );
}

export default Login;
