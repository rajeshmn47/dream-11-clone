import "./home.css";
import "./create.css";

import styled from "@emotion/styled";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Grid } from "@mui/material";
import { style } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { URL } from "../constants/userConstants";
import { getImgurl } from "../utils/img_url";
import Bottomnav from "./navbar/bottomnavbar";
import Loader from "./loader";
import Steppr from "./stepper";

const CaptainSelector = styled.div``;
const Player = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    width: 100px;
    text-transform: capitalize;
  }
`;

const CaptainC = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  font-weight: 700;
  color: #cccccc;
  width: 30px;
  font-size: 16px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ViceCaptain = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  color: #cccccc;
  font-weight: 700;
  font-size: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Name = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  img {
    width: 50px !important;
    height: 50px !important;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
  h1 {
    white-space: nowrap;
  }
`;

const NextButtonContainer = styled.div`
  position: fixed;
  bottom: 8%;
  left: 0%;
  z-index: 1000000000000000000000000;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
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

const Container = styled.div`
  background-image: url("./pitch.png");
  width: 100% !important;
  height: 100vh !important;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: "Open Sans";
`;

const PlayerP = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  img {
    width: 70px !important;
    height: 70px !important;
    display: block;
    border-radius: 50%;
  }
  p {
    margin: 0 !important;
    padding: 0 10px !important;
  }
`;

const Title = styled.p`
  position: absolute;
  bottom: 0px;
  background-color: var(--black);
  color: #ffffff;
  padding: 2px 5px;
  border-radius: 2px;
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SavedTeam() {
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { id } = useParams();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    async function getteam() {
      const data = await axios.get(`${URL}/getteam/${id}`);
      setPlayers(data.data.team.players);
    }
    getteam();
  }, [id]);

  const handleCaptain = (i) => {
    const op = players.map((p) => {
      p.isCaptain = false;
      return p;
    });
    const po = op.map((p) => {
      if (p._id === i) {
        p.isCaptain = true;
      }
      return p;
    });
    setSelectedPlayers([...po]);
  };

  const handleViceCaptain = (i) => {
    const op = players.map((p) => {
      p.isViceCaptain = false;
      return p;
    });
    const po = op.map((p) => {
      if (p._id === i) {
        p.isViceCaptain = true;
      }
      return p;
    });
    setSelectedPlayers([...po]);
  };
  const handleSave = async () => {
    setSave(true);
  };

  const isCandVcselected = () => {
    const a = selectedPlayers.find((s) => s.isCaptain);
    const b = selectedPlayers.find((s) => s.isViceCaptain);
    return a && b;
  };
  return (
    <div style={{ height: "100%" }}>
      {players ? (
        <Container>
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={() => navigate(-1)} />
          </div>
          <Grid container justifyContent="space-evenly" justify="space-evenly">
            {players.slice(0, 2).map((p) => (
              <Grid item xs={6} sm={6}>
                <PlayerP>
                  <img src={getImgurl(p.image, p.playerName)} alt="" />
                  <Title>{p.playerName.split(" ")[1]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(2, 6).map((p) => (
              <Grid item xs={3} sm={3}>
                <PlayerP>
                  <img src={getImgurl(p.image, p.playerName)} alt="" />
                  <Title>{p.playerName.split(" ")[1]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(6, 8).map((p) => (
              <Grid item xs={6} sm={6}>
                <PlayerP>
                  <img src={getImgurl(p.image, p.playerName)} alt="" />
                  <Title>{p.playerName.split(" ")[1]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(8, 11).map((p) => (
              <Grid item xs={4} sm={4}>
                <PlayerP>
                  <img src={getImgurl(p.image, p.playerName)} alt="" />
                  <Title>{p.playerName.split(" ")[1]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SavedTeam;
