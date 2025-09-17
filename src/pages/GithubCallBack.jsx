import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../constants/userConstants";

export default function GithubCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
            axios.get(`${URL}/auth/githublogin?code=${code}`)
                .then(res => {
                    localStorage.setItem("token", res.data.server_token);
                    navigate("/");
                })
                .catch(err => console.error(err));
        }
    }, [navigate]);

    return <p>Logging in with GitHub...</p>;
}
