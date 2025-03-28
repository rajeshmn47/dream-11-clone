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
import { login } from '../actions/userAction';

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
    <>
      {/* Header */}
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: '1vw' }} />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>FC4U</span>
      </div>

      {/* Login Form Section */}
      <div className="login">
        <Paper className="login-container">
          <h5 className="login-title">LOG IN & PLAY</h5>

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
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input-field"
            />

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            {/* Login Button */}
            <Button type="submit" className="login-btn" variant="contained" disableElevation>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          {/* Links */}
          <div className="login-links">
            <Link to="/forgot-password" className="link">Forgot password?</Link>
            <Link to="/register" className="link">Don't have an account? Sign up</Link>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default Login;
