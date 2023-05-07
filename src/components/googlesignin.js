import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants/userConstants";
import axios from "axios";

export default function Logingoogle() {
  const history = useNavigate();

  const onGoogleSuccess = async (response) => {
    const access_token = response.tokenId;
    const { data } = await axios.post(`${URL}/auth/googlelogin`, {
      tokenId: access_token,
    });
    console.log(data);
    localStorage.setItem("token", data.server_token);
    window.location.reload();
  };

  const onGoogleFailure = (err) => {
    console.log(err);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151a30",
        color: "white",
      }}
    >
      <p style={{textAlign:'center'}}>Google Oauth Sign In</p>
      <GoogleLogin
        clientId="711974125982-gaeieriu9q60ctbps2qpbjitv0374d7l.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        className="google-login-button"
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
