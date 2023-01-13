import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import Tab from "@mui/material/Tab";
import "./home.css";
import "./create.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WestIcon from "@mui/icons-material/West";
import styled from "@emotion/styled";
import SavedTeam from "./savedteam";
import BaseTab from "./tabsdata";
import { Grid, Slider } from "@mui/material";

const Top = styled.div`
  background-color: #000000;
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
    background-color: #ec1801 !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: #000000 !important;
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
  margin: 0 0;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: #ec1801;
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
  background-color: #008a36;
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

const tabs = [{ label: "winnings" }, { label: "leaderboard" }];

export const ContestDetail = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [match, setMatch] = useState(null);
  const [contest, setContest] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    async function getteams() {
      const teamdata = await axios.get(
        `http://localhost:8000/getteamsofcontest/${id}`
      );
      const contestdata = await axios.get(
        `http://localhost:8000/getcontest/${id}`
      );
      console.log(contestdata, "contest");
      setContest(contestdata.data.contest);
      setMatch(teamdata.data.match);
      setLeaderboard(teamdata.data.teams);
    }
    getteams();
  }, [id]);
  console.log(match,'match')
  return (
    <>
      <ContestsContainer container>
        <Top>
          <LeftSide>
            <WestIcon
              onClick={() => history(-1)}
              style={{ cursor: "pointer" }}
            />
            {match && (
              <h1>
                {match.teamAwayCode} Vs {match.teamHomeCode}
              </h1>
            )}
          </LeftSide>
          <RightSide>
            <Brightness1Icon />
            <AccountBalanceWalletOutlinedIcon />
            <NotificationAddOutlinedIcon />
          </RightSide>
        </Top>
        {contest && (
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>{contest.price}</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>
                    ₹ {Math.floor(contest.price / contest.totalSpots)}
                  </FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider
                  defaultValue={contest.totalSpots - contest.spotsLeft}
                  min={0}
                  max={contest.totalSpots}
                />
              </SliderContainer>
              <First>
                <SpotsLeft>{contest.spotsLeft} spots left</SpotsLeft>
                <SpotsRight>{contest.totalSpots} spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹{Math.floor(contest.price / contest.totalSpots)}
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              {Math.floor((contest.numWinners / contest.totalSpots) * 100)}%
              Single
            </Last>
          </ContestContainer>
        )}
      </ContestsContainer>
      <BaseTab contest={contest} teams={leaderboard} />
    </>
  );
};

export default ContestDetail;
