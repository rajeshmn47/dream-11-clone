import '../home.css';
import '../create.css';

import styled from '@emotion/styled';
import { SettingsApplicationsTwoTone } from '@mui/icons-material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Grid, Slider, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { URL } from '../../constants/userConstants';
import Loader from '../loader';
import Navbar from '../navbar';
import Bottomnav from '../navbar/bottomnavbar';

const Container = styled(Grid)`
  padding: 10px 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const tabs = [{ label: 'winnings' }, { label: 'leaderboard' }];

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
