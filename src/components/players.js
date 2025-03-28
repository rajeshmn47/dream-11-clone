import './home.css';

import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import Bottomnav from './navbar/bottomnavbar';
import Steppr from './stepper';

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
export function Players() {
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function getupcoming() {
      const data = await API.get(`${URL}/homeMatches`);
      const datas = await API.get(`${URL}/getplayers`);
      console.log(datas);
      setUpcoming(data.data.upcoming.results);
      setLive(data.data.live.results);
      setPast(data.data.past.results);
      setPlayers(data.data.players);
    }
    getupcoming();
  }, [user]);
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: '1vw' }} />
        FC4U
      </div>
      <div className="stepper">
        <Steppr />
      </div>
      <div className="hometop">
        <div className="hometopicon selectgame">
          <SportsCricketIcon style={{ color: '#C41E22' }} />
          <h5>Cricket</h5>
        </div>
        <div className="hometopicon">
          <SportsSoccerIcon />
          <h5>Football</h5>
        </div>
        <div className="hometopicon">
          <SportsBasketballIcon />
          <h5>Basketball</h5>
        </div>
        <div className="hometopicon">
          <SportsHockeyIcon />
          <h5>Hockey</h5>
        </div>
      </div>
      <div className="matchstatuses">
        <button className="matchstatus">live</button>
        <button className="matchstatus">upcoming</button>
        <button className="matchstatus">completed</button>
      </div>
      <div className="matches">
        {players.length > 0
          ? players.map((u) => (
            <Player>
              <h1>{u.name}</h1>
              <img src={u.image} alt="" />
            </Player>
          ))
          : null}
      </div>
      <Bottomnav />
    </>
  );
}

export default Players;
