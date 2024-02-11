import "../home.css";
import "../create.css";
import Bottomnav from "../navbar/bottomnavbar";
import { useState } from "react";
import Loader from "../loader";
import Navbar from "../navbar";
import styled from "@emotion/styled";
import axios from "axios";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid, Slider, TextField } from "@mui/material";
import { URL } from "../../constants/userConstants";

const Container = styled(Grid)`
  padding: 10px 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const tabs = [{ label: "winnings" }, { label: "leaderboard" }];

export default function FindPeople() {
  const [results, setResults] = useState([]);
  const handleChange = async (t) => {
    await axios.get(URL);
  };
  return (
    <>
      <Navbar />
      <Container>
        <Title>Search People U Know</Title>
        <TextField
          label="Find People"
          fullWidth
          onChange={(e) => handleChange(e.target.value)}
        />
      </Container>
      <Bottomnav />
    </>
  );
}
