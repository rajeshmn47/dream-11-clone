import "./create.css";

import styled from "@emotion/styled";
import {
  PlaylistAddCheckCircleSharp,
  SendTimeExtension,
  SettingsApplicationsTwoTone,
} from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { URL } from "../../constants/userConstants";
import Bottomnav from "../navbar/bottomnavbar";
import Next from "../captain";
import CategoryTabs from "./categorytabs";
import BasicTabs from "../MatchTabs";
import LiveCategoryTabs from "./playerscategory";
import Steppr from "../stepper";

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
  background-color: var(--black);
  height: 150px;
  margin: 0 auto;
  color: #ffffff;
`;
const NoPlayer = styled.div`
  background-color: var(--green);
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
  color: var(--green);
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
  bottom: 15%;
`;

const NextButton = styled.button`
  background-color: var(--green);
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
  background-color: var(--black);
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
export function CreateTeam() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [nonPlayers, setNonPlayers] = useState([]);
  const [lmPlayers, setLmplayers] = useState([]);
  const [live, setLive] = useState();
  useEffect(() => {
    async function getupcoming() {
      if (id) {
        setLoading(true);
        const data = await axios.get(`${URL}/getplayers/${id}`);
        console.log(data, "testdata");
        setLive(data.data.live);
        let awayPlayers = data.data.matchdetails.teamAwayPlayers.map((obj) => ({
          ...obj,
          isHome: false,
          code: data.data.matchdetails.teamAwayCode,
        }));
        let homePlayers = data.data.matchdetails.teamHomePlayers.map((obj) => ({
          ...obj,
          isHome: true,
          code: data.data.matchdetails.teamHomeCode,
        }));
        if (!data.data.live) {
          if (state?.editMode) {
            const p = awayPlayers.concat(homePlayers).map((obj) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.map((r) =>
                state.selectedPlayers.find((f) => f.playerId == r.playerId)
                  ? { ...r, isSelected: true }
                  : r
              ),
            ]);
          } else {
            const p = awayPlayers.concat(homePlayers).map((obj) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([...p]);
          }
        } else {
          if (state?.editMode) {
            const p = awayPlayers.concat(homePlayers).map((obj) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.map((r) =>
                state.selectedPlayers.find((f) => f.playerId == r.playerId)
                  ? { ...r, isSelected: true }
                  : r
              ),
            ]);
          } else {
            const p = awayPlayers
              .splice(0, 11)
              .concat(homePlayers.splice(0, 11))
              .map((obj) => ({
                ...obj,
                isSelected: false,
              }));
            setPlayers([...p]);
          }
        }
        setMatch(data.data.matchdetails);
        const k = homePlayers;
        const l = awayPlayers;
        const nonp = k
          .splice(k.length - 11, k.length)
          .concat(l.splice(l.length - 11, l.length))
          .map((obj) => ({
            ...obj,
            isSelected: false,
          }));
        setNonPlayers([...nonp]);
        const lm = k
          .splice(k.length - 5, k.length)
          .concat(l.splice(l.length - 8, l.length))
          .map((obj) => ({
            ...obj,
            isSelected: false,
          }));
        setLmplayers([...lm]);
      }
      setLoading(false);
    }
    getupcoming();
  }, [id, state]);
  useEffect(() => {
    async function getplayers() {
      if (user?._id && match) {
        const data = await axios.get(
          `${URL}/getteam/${match?.titleFI}/${match.titleSI}`
        );
        const moredata = await axios.get(
          `${URL}/getteam/${match?.titleSI}/${match?.titleFI}`
        );
        console.log(data.data.lmplayers, moredata.data.lmplayers, "lmplayers");
        setLmplayers([...data.data.lmplayers]);
      }
    }
    getplayers();
  }, [match, user]);
  console.log(match, "matchdata");
  const handleClick = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    setNext(true);
  };
  console.log(state?.selectedPlayers, state?.editMode, "state");
  return (
    <Container>
      {!next ? (
        <>
          <NoPlayers container spacing={2}>
            <PlayersIndicator container spacing={2}>
              <Grid item xs={3} sm={3}>
                Players
                <p>
                  {players.filter((p) => p.isSelected).length}
                  /11
                </p>
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
                    <NoPlayer />
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
                    <BlankPlayer />
                  </Grid>
                ))}
          </NoPlayers>
          {live ? (
            <LiveCategoryTabs
              players={players}
              setPlayers={setPlayers}
              match={match}
              nonPlayers={nonPlayers}
              loading={loading}
            />
          ) : (
            <CategoryTabs
              players={players}
              setPlayers={setPlayers}
              match={match}
              nonPlayers={nonPlayers}
              lmPlayers={lmPlayers}
              loading={loading}
            />
          )}
          <NextButtonContainer>
            <PrevButton>
              <RemoveRedEyeOutlinedIcon />
              Preview / Lineup
              <GroupsRoundedIcon />
            </PrevButton>
            <NextButton
              disabled={
                players.filter((k) => k.isSelected === true).length < 11
              }
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
          <Bottomnav />
        </>
      ) : (
        <Next
          players={players.filter((k) => k.isSelected === true)}
          editMode={state?.editMode}
          teamId={state?.teamId}
        />
      )}
    </Container>
  );
}

export default CreateTeam;
