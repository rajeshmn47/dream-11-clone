import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loadUser } from '../actions/userAction';
import { URL } from '../constants/userConstants';

export default function Logingoogle() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const onGoogleSuccess = async (response) => {
    console.log(response, 'response');
    const access_token = response.credential;
    const { data } = await axios.post(`${URL}/auth/googlelogin`, {
      tokenId: access_token,
    });
    localStorage.setItem('token', data.server_token);
    dispatch(loadUser());
    history('/');
  };

  const onGoogleFailure = (err) => {
    console.log(err);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151a30',
        color: 'white',
      }}
    >
      <p style={{ textAlign: 'center' }}>Google Oauth Sign In</p>
      <GoogleOAuthProvider clientId="438326678548-td4f7iss3q98btacu17h57mpi8tpn7cq.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            onGoogleSuccess(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
            onGoogleFailure('err');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
