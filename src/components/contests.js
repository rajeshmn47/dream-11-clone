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
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WestIcon from "@mui/icons-material/West";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { unstable_HistoryRouter } from "react-router-dom";
import SavedTeam from "./savedteam";
import BasicTabs from "./tabs";
import { URL } from "../constants/userConstants";
import { Grid } from "@mui/material";

const TopContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  p {
    text-transform: capitalize;
    font-weight: 800;
    font-size: 14px;
    padding: 3px 0;
    color: #757272;
  }
  padding: 10px 10px;
`;

const GreenMark = styled.span`
  background-color: #1ca14d;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  margin-right: 6px;
`;
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
  .MuiTabScrollButton-root {
    width: 15px;
    white-space: nowrap;
  }
`;
export const Contests = ({ players }) => {
  const [contests, setContests] = useState([]);
  const [match, setMatch] = useState(null);
  const [matchLive, setMatchLive] = useState(null);
  const search = useLocation().search;
  let history = useNavigate();

  const { id } = useParams();
  console.log(id); //12345
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`${URL}/getcontests/${id}`);
      const matchdata = await axios.get(`${URL}/getmatch/${id}`);
      const matchlivedata = await axios.get(`${URL}/getmatchlive/${id}`);
      console.log(matchdata, matchlivedata, "match");
      setMatch(matchdata.data.match);
      setMatchLive(matchlivedata.data.match);
      setContests(data.data.contests);
    }
    getupcoming();
  }, [id]);
  return (
    <Container>
      <TopContainer>
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
        {matchLive && (
          <>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item sm={4} xs={4} style={{ textAlign: "left" }}>
                <p>{match.teamHomeName}</p>
                <p>
                  {matchLive.runFI}/{matchLive.wicketsFI}({matchLive.oversFI})
                </p>
              </Grid>
              <Grid
                item
                sm={4}
                xs={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <GreenMark></GreenMark>
                {matchLive.result == "Yes" ? "Completed" : "In Play"}
              </Grid>
              <Grid item sm={4} xs={4} style={{ textAlign: "right" }}>
                <p> {match.teamAwayName}</p>
                <p>
                  {" "}
                  {matchLive.runSI}/{matchLive.wicketsSI}({matchLive.oversSI})
                </p>
              </Grid>
            </Grid>
            <p style={{ textAlign: "center" }}>
              {matchLive.status.split("(11b rem)").join("")}
            </p>
          </>
        )}
      </TopContainer>
      <Bottom>
        <BasicTabs tabs={contests} id={id} />
      </Bottom>
    </Container>
  );
};

export default Contests;
