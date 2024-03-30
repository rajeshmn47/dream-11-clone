import './home.css';
import './create.css';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import Team from './Team';

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

const Top = styled.div`
  background-image: url("localhost:3000/pitch.png");
  width: 100% !important;
  height: 200px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-repeat: repeat !important;
  background-color: var(--green);
  background-size: 100% !important;
  color: #ffffff;
  text-transform: uppercase;
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      margin: 0;
      padding: 0;
    }
  }
  img {
    width: 40px !important;
    height: 40px !important;
  }
`;

const PlayerP = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  img {
    width: 70px !important;
    height: 70px !important;
    border-radius: 50%;
    display: block !important;
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

const Bottom = styled(Grid)`
  background-color: #ffffff;
  padding: 10px 10px;
`;

const Each = styled(Grid)`
  font-size: 14px;
  color: #777777;
  span {
    font-size: 16px !important;
    font-weight: 600 !important;
    color: var(--black);
  }
`;

const EachTeam = styled.div`
  box-shadow: 5px 5px 4px 2px #cecccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 15px 0;
`;
const Captain = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  background-color: #ffffff;
  color: var(--black);
  border-radius: 5px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VCaptain = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  background-color: var(--black);
  color: #ffffff;
  border-radius: 5px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CaptainsContainer = styled.div`
  position: relative;
`;

const CaptainI = styled.div`
  position: absolute;
  border: 3px solid var(--black);
  padding: 2px 2px;
  left: -20%;
  top: -20%;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  width: 15px;
  background-color: #ffffff;
  color: var(--black);
`;

const VcaptainI = styled.div`
  position: absolute;
  border: 3px solid #ffffff;
  padding: 2px 2px;
  left: -20%;
  top: -20%;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  width: 15px;
  background-color: var(--black);
`;
export function TeamShort({
  match, match_info, players, id, plo,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captains, setCaptains] = useState([]);
  const [matchinfo, setMatchinfo] = useState([]);
  useEffect(() => {
    async function filterDifferent() {
      const h = match.teamHomePlayers.filter((f) => selectedPlayers.some((s) => f.playerId == s.playerId)).length;
      const o = match.teamAwayPlayers.filter((f) => selectedPlayers.some((s) => f.playerId == s.playerId)).length;
      const a = [
        { awayCode: match_info.teamAwayCode, number: o },
        { homeCode: match_info.teamHomeCode, number: h },
      ];
      setMatchinfo([...a]);
    }
    filterDifferent();
  }, [id, selectedPlayers, plo]);

  useEffect(() => {
    async function filterDifferent() {
      const cap = match.teamAwayPlayers
        .concat(match.teamHomePlayers)
        .filter((f) => f.playerId == plo.captainId);
      const vcap = match.teamAwayPlayers
        .concat(match.teamHomePlayers)
        .filter((f) => f.playerId == plo.viceCaptainId);

      setCaptains([...cap, ...vcap]);
    }
    filterDifferent();
  }, [plo, match]);
  useEffect(() => {
    const pl = players.map((obj) => ({
      ...obj,
    }));
    setSelectedPlayers([...pl]);
  }, [id]);

  return (
    <Grid item md={4} lg={4} xs={12} sm={12}>
      {players ? (
        <Team
          matchinfo={matchinfo}
          captains={captains}
          selectedPlayers={selectedPlayers}
          matchId={id}
          teamId={plo._id}
        />
      ) : (
        <h1>select team</h1>
      )}
    </Grid>
  );
}

export default TeamShort;
