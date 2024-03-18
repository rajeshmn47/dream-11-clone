import './home.css';
import './create.css';

import styled from '@emotion/styled';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import WestIcon from '@mui/icons-material/West';
import { Grid, Slider } from '@mui/material';
import { useState } from 'react';

import BasicTabs from './ContestTabs';

const Top = styled.div`
  background-color: var(--black);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
`;

const Bottom = styled.div``;
const LeftSide = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  .MuiTabs-indicator {
    background-color: var(--red) !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: var(--black) !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
`;
const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: var(--green);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;

const tabs = [{ label: 'winnings' }, { label: 'leaderboard' }];

export function JoinedContests({ players }) {
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);

  return (
    <Container>
      <Top>
        <LeftSide>
          <WestIcon />

          <h1>Ban Vs Ind</h1>
        </LeftSide>
        <RightSide>
          <Brightness1Icon />
          <AccountBalanceWalletOutlinedIcon />
          <NotificationAddOutlinedIcon />
        </RightSide>
      </Top>
      <Bottom>
        <ContestsContainer>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: '0 15px', marginBottom: '3px' }}
              />
              25% Single
            </Last>
          </ContestContainer>
        </ContestsContainer>
      </Bottom>
      <BasicTabs tabs={tabs} />
    </Container>
  );
}

export default JoinedContests;
