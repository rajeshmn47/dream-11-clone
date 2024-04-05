import './home.css';
import './create.css';

import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import { FURL } from '../constants/userConstants';
import { getImgurl } from '../utils/img_url';
import Loader from './loader';
import { useSelector } from 'react-redux';


const Container = styled.div`
  background-image: url('${FURL}/pitch.png');
  width: 100% !important;
  height: 100vh !important;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  font-family: "Open Sans";
`;

const Heading = styled.h3`
color:#FFF;
text-align:center;
text-transform:uppercase;
`

const PlayerP = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height:60px;
  img {
    width: 70px;
    height: 70px;
    display: block;
  }
  p {
    margin: 0 !important;
    padding: 0 10px !important;
  }
`;

const Title = styled.h3`
  position: absolute;
  bottom: -10px;
  background-color: var(--black);
  color: #ffffff;
  padding: 1px 5px;
  border-radius: 5px;
  font-weight:600;
  min-width:52px;
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  display: flex;
  text-transform:capitalize;
  align-items: center;
  justify-content: center;
  z-index:30;
`;

const AwayTitle = styled.h3`
  position: absolute;
  bottom: -10px;
  background-color: var(--white);
  color: #212121;
  padding: 1px 5px;
  border-radius: 5px;
  font-weight:600;
  min-width:52px;
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  display: flex;
  text-transform:capitalize;
  align-items: center;
  justify-content: center;
  z-index:30;
`;

const Images = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:relative;
`;
const PImage = styled.img`
width: 60px !important;
    height: 50px !important;
    z-index:10 !important;
`
const Jersey = styled.img`
display:none !important;
`;

{/*
const Images = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:relative;
`;
const PImage = styled.img`
width: 35px !important;
    height: 41px !important;
    z-index:10 !important;
`
const Jersey = styled.img`
width: 50px !important;
height: 15px !important;
    position:absolute;
    z-index:20 !important;
    top: 34.7px;
`*/}

export function SavedTeam() {
  const navigate = useNavigate();
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { id } = useParams();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    async function getteam() {
      const data = await API.get(`${URL}/getteam/${id}`);
      function gethome(id) {
        let isHome = !!match_details?.teamHomePlayers.find((h) =>  h.playerId==id);
        console.log(isHome,'ishome')
        return isHome;
      }
      gethome(data);
      setPlayers([...data.data.team.players.map((p) => ({ ...p, isHome: gethome(p.playerId) }))]);
    }
    getteam();
  }, [id,match_details]);
  console.log(match_details,'details')

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
    <div style={{ height: '100%' }}>
      {players ? (
        <Container>
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon onClick={() => navigate(-1)} />
          </div>
          <div>
            <Heading>wicket-keepers</Heading>
            <Grid container justifyContent="space-evenly" justify="space-evenly">
              {players.slice(0, 2).map((p) => (
                <Grid item xs={6} sm={6}>
                  <PlayerP>
                    <Images>
                      <PImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                      <Jersey src="https://cricketvectors.akamaized.net/jersey/limited/org/K.png?impolicy=default_web" alt="" />
                    </Images>
                    {p.isHome ?
                      <Title>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</Title>
                      : <AwayTitle>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</AwayTitle>}</PlayerP>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <Heading>batters</Heading>
            <Grid container>
              {players.slice(2, 6).map((p) => (
                <Grid item xs={3} sm={3}>
                  <PlayerP>
                    <Images>
                      <PImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                      <Jersey src="https://cricketvectors.akamaized.net/jersey/limited/org/K.png?impolicy=default_web" alt="" />
                    </Images>
                    {p.isHome ?
                      <Title>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</Title>
                      : <AwayTitle>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</AwayTitle>}</PlayerP>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <Heading>all-rounders</Heading>
            <Grid container>
              {players.slice(6, 8).map((p) => (
                <Grid item xs={6} sm={6}>
                  <PlayerP>
                    <Images>
                      <PImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                      <Jersey src="https://cricketvectors.akamaized.net/jersey/limited/org/K.png?impolicy=default_web" alt="" />
                    </Images>
                    {p.isHome ?
                      <Title>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</Title>
                      : <AwayTitle>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</AwayTitle>}
                  </PlayerP>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <Heading>bowlers</Heading>
            <Grid container>
              {players.slice(8, 11).map((p) => (
                <Grid item xs={4} sm={4}>
                  <PlayerP>
                    <Images>
                      <PImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                      <Jersey src="https://cricketvectors.akamaized.net/jersey/limited/org/K.png?impolicy=default_web" alt="" />
                    </Images>
                    {p.isHome ?
                      <Title>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</Title>
                      : <AwayTitle>{p.playerName.split(' ')[1] ? p.playerName.split(' ')[1] : p.playerName.split(' ')[0]}</AwayTitle>}
                  </PlayerP>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SavedTeam;
