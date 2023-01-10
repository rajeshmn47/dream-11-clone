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
export const Contests = ({ players }) => {
  const [contests, setContests] = useState([]);
  const [match, setMatch] = useState(null);
  const search = useLocation().search;
  let history = useNavigate();

  const { id } = useParams();
  console.log(id); //12345
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`http://localhost:8000/getcontests/${id}`);
      const matchdata = await axios.get(`http://localhost:8000/getmatch/${id}`);
      console.log(matchdata);
      setMatch(matchdata.data.match);
      setContests(data.data.contests);
    }
    getupcoming();
  }, []);
  return (
    <Container>
      <Top>
        <LeftSide>
          <WestIcon onClick={() => history(-1)} style={{ cursor: "pointer" }} />
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
      <Bottom>
        <BasicTabs tabs={contests} id={id} />
      </Bottom>
    </Container>
  );
};

export default Contests;
