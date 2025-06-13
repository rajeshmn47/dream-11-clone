import './create.css';

import styled from '@emotion/styled';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import Next from './captain';
import Bottomnav from './navbar/bottomnavbar';

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
  background-color: var(--lightreen);
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const NextButtonContainer = styled.div`
  position: fixed;
  bottom: 15%;
  left: 25%;
  z-index: 1000000000000000000000000;
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

const NoLineups = styled.h3`
  color: var(--red);
`;
export function CreateTeam() {
  const PlayersNumber = new Array(11).fill(null);
  const [TeamArray, setTeamArray] = useState(new Array(11).fill(null));
  const [upcoming, setUpcoming] = useState([]);
  const { id } = useParams();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [players, setPlayers] = useState([]);
  const [next, setNext] = useState(false);
  useEffect(() => {
    async function getupcoming() {
       const data = await API.get(`${URL}/getplayers_new/${id}`);
      console.log(data);

      const players = data.data.players.teamAwayPlayers
        .concat(data.data.players.teamHomePlayers)
        .map((obj) => ({
          ...obj,
          isSelected: false,
        }));
      setPlayers([...players]);
    }
    getupcoming();
  }, []);
  console.log(players);
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
    console.log('clicked next');
    setNext(true);
  };

  return (
    <>
      {!next ? (
        <>
          <NoPlayers container spacing={2}>
            {players.filter((k) => k.isSelected === true).length <= 11
              && players
                .filter((k) => k.isSelected === true)
                .map((p, index) => (
                  <Grid item lg={1} md={1} xs={1} sm={1}>
                    <NoPlayer />
                  </Grid>
                ))}
            {players.filter((k) => k.isSelected === true).length <= 11
              && players
                .slice(
                  0,
                  11 - players.filter((k) => k.isSelected === true).length,
                )
                .map((g) => (
                  <Grid item lg={1} md={1} xs={1} sm={1}>
                    <BlankPlayer />
                  </Grid>
                ))}
          </NoPlayers>
          <PlayersList>
            {players.length > 0 ? (
              players.map((p) => (
                <EachPlayer
                  className={p.isSelected ? 'selected' : 'notselected'}
                >
                  <img src={p.image} alt="" />
                  <Link to={`/player/${p.playerId}`}>{p.playerName}</Link>
                  {p.isSelected ? (
                    <RemoveButton onClick={() => handleRemove(p._id)}>
                      <RemoveCircleOutlineRoundedIcon />
                    </RemoveButton>
                  ) : (
                    <AddButton
                      onClick={() => handleClick(p._id)}
                      disabled={
                        players.filter((k) => k.isSelected === true).length
                        >= 11
                      }
                      className={
                        players.filter((k) => k.isSelected === true).length
                        >= 11
                          ? 'disabled'
                          : 'notdisabled'
                      }
                    >
                      <AddCircleOutlineRoundedIcon />
                    </AddButton>
                  )}
                </EachPlayer>
              ))
            ) : (
              <NoLineups>
                Lineups not out yet,check 30 minutes before the game
              </NoLineups>
            )}
          </PlayersList>
          <NextButtonContainer>
            <NextButton
              disabled={
                players.filter((k) => k.isSelected === true).length < 11
              }
              className={
                players.filter((k) => k.isSelected === true).length >= 11
                  ? 'notdisabled'
                  : 'disablednext'
              }
              onClick={() => handleNext()}
            >
              next
            </NextButton>
          </NextButtonContainer>
          <Bottomnav />
        </>
      ) : (
        <Next players={players.filter((k) => k.isSelected === true)} />
      )}
    </>
  );
}

export default CreateTeam;
