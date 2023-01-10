import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicTabs from "./tabs";
import CategoryTabs from "./playerscategory";
import styled from "@emotion/styled";
import "./create.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import Next from "./captain";
import {
  PlaylistAddCheckCircleSharp,
  SendTimeExtension,
  SettingsApplicationsTwoTone,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

const Container = styled.div`
  position: relative;
  .MuiBox-root {
    padding: 0 !important;
  }
`;

const PlayersIndicator = styled(Grid)`
  font-size: 12px;
  font-family: "Open Sans";
  font-weight: 500;
  margin: 0 auto;
  color: #9c9898;
  p {
    font-weight: 700 !important;
    font-size: 14px;
    color: #ffffff;
  }
`;
const PlayersContainer = styled.div``;
const Player = styled.div`
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  justify-content: space-between;
  img {
    width: 150px !important;
  }
`;

const NoPlayers = styled(Grid)`
  width: 100%;
  margin-left: 0;
  margin: 0px 0px;
  padding: 15px 0;
  background-color: #000000;
  height: 150px;
  margin: 0 auto;
  color: #ffffff;
`;
const NoPlayer = styled.div`
  background-color: green;
  color: #ffffff;
  text-align: center;
  height: 10px;
  clip-path: polygon(15% 0%, 100% 0, 85% 100%, 0% 100%);
`;

const BlankPlayer = styled.div`
  background-color: #ffffff;
  color: #ffffff;
  text-align: center;
  height: 10px;
  clip-path: polygon(15% 0%, 100% 0, 85% 100%, 0% 100%);
`;

const PlayersList = styled.div`
  padding: 0 0;
`;

const EachPlayer = styled.div`
  img {
    width: 50px !important;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    font-family: "Open Sans";
    font-weight: bold;
    text-transform: capitalize;
  }
  border: 1px solid #e7e7e7;
  border-left: none;
  border-right: none;
  padding: 20px 0;
`;

const AddButton = styled.button`
  color: green;
  background-color: #fff;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  color: #df5f1f;
  background-color: #fef4de;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const NextButtonContainer = styled.div`
  left: 0%;
  z-index: 1000000000000000000000000;
  width: 300px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 45%;
`;

const NextButton = styled.button`
  background-color: #008a36;
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 20px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
`;

const PrevButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 10px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  display: flex;
  align-items: center;
  width: 230px;
  justify-content: space-evenly;
  white-space: nowrap;
`;

const Code = styled.p`
  text-transform: uppercase;
  color: #9c9898 !important;
`;
export const CreateTeam = () => {
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [next, setNext] = useState(false);
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`http://localhost:8000/getplayers/${id}`);
      console.log(data);

      let players = data.data.players.teamAwayPlayers
        .concat(data.data.players.teamHomePlayers)
        .map((obj) => ({
          ...obj,
          isSelected: false,
        }));
      setPlayers([...players]);
      setMatch(data.data.matchdetails);
    }
    getupcoming();
  }, []);

  console.log(players);
  const handleClick = (i) => {
    let po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i) => {
    let po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    console.log("clicked next");
    setNext(true);
  };

  return (
    <Container>
      {!next ? (
        <>
          <NoPlayers container spacing={2}>
            <PlayersIndicator container spacing={2}>
              <Grid item xs={3} sm={3}>
                Players
                <p>{players.filter((p) => p.isSelected).length}/11</p>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Code>{match?.teamAwayCode}</Code>
                <p>1</p>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Code>{match?.teamHomeCode}</Code>
                <p>1</p>
              </Grid>
              <Grid item xs={3} sm={3}>
                Credits Left
                <p>83.5</p>
              </Grid>
            </PlayersIndicator>
            {players.filter((k) => k.isSelected === true).length <= 11 &&
              players
                .filter((k) => k.isSelected === true)
                .map((p, index) => (
                  <Grid item lg={1} md={1} xs={1} sm={1}>
                    <NoPlayer></NoPlayer>
                  </Grid>
                ))}
            {players.filter((k) => k.isSelected === true).length <= 11 &&
              players
                .slice(
                  0,
                  11 - players.filter((k) => k.isSelected === true).length
                )
                .map((g) => (
                  <Grid item lg={1} md={1} xs={1} sm={1}>
                    <BlankPlayer></BlankPlayer>
                  </Grid>
                ))}
          </NoPlayers>
          <CategoryTabs players={players} setPlayers={setPlayers} />

          <Bottomnav />
        </>
      ) : (
        <Next players={players.filter((k) => k.isSelected === true)} />
      )}
      <NextButtonContainer>
        <PrevButton>
          <RemoveRedEyeOutlinedIcon />
          Preview / Lineup
          <GroupsRoundedIcon />
        </PrevButton>
        <NextButton
          disabled={players.filter((k) => k.isSelected === true).length < 11}
          className={
            players.filter((k) => k.isSelected === true).length >= 11
              ? "notdisabled"
              : "disablednext"
          }
          onClick={() => handleNext()}
        >
          next
        </NextButton>
      </NextButtonContainer>
    </Container>
  );
};

export default CreateTeam;
