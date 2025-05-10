import './create.css';

import styled from '@emotion/styled';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { API } from '../../actions/userAction';
import { URL } from '../../constants/userConstants';
import Next from '../captain';
import Bottomnav from '../navbar/bottomnavbar';
import CategoryTabs from './categorytabs';
import LiveCategoryTabs from './playerscategory';

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
  padding: 15px 10px;
  background-color: var(--black);
  height: 150px;
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
const Info = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;`

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
        const data = await API.get(`${URL}/getplayers_new/${id}`);
        console.log(data, 'testdata');
        setLive(data.data.live);
        const awayPlayers = data.data.matchdetails.teamAwayPlayers.map((obj) => ({
          ...obj,
          isHome: false,
          code: data.data.matchdetails.teamAwayCode,
        }));
        const homePlayers = data.data.matchdetails.teamHomePlayers.map((obj) => ({
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
              ...p.map((r) => (state.selectedPlayers.find((f) => f.playerId == r.playerId)
                ? { ...r, isSelected: true }
                : r)),
            ]);
          } else {
            const p = awayPlayers.concat(homePlayers).map((obj) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([...p]);
          }
        } else if (state?.editMode) {
          const p = awayPlayers.concat(homePlayers).map((obj) => ({
            ...obj,
            isSelected: false,
          }));
          setPlayers([
            ...p.map((r) => (state.selectedPlayers.find((f) => f.playerId == r.playerId)
              ? { ...r, isSelected: true }
              : r)),
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
        setMatch(data.data.matchdetails);
        const k = homePlayers;
        const l = awayPlayers;
        console.log(data.data.matchdetails.teamHomePlayers,data.data.matchdetails.teamAwayPlayers,'awaylastmatchplayers')
        const nonp = k
          .slice(11, k.length)
          .concat(l.slice(11, l.length))
          .map((obj) => ({
            ...obj,
            isSelected: false,
          }));
        setNonPlayers([...nonp]);
        const lm = k
          .slice(0, 11)
          .concat(l.slice(0, 11))
          .map((obj) => ({
            ...obj,
            isSelected: false,
          }));
        //setLmplayers([...lm]);
      }
      setLoading(false);
    }
    getupcoming();
  }, [id, state]);
  useEffect(() => {
    async function getplayers() {
      if (user?._id && match?.teamHomeId) {
        const data = await API.get(
          `${URL}/getteam/${match?.teamHomeId}/${match.teamAwayId}`,
        );
        console.log(data.data.lmplayers, 'lmplayers');
        setLmplayers([...data.data.lmplayers]);
      }
    }
    getplayers();
  }, [match, user]);
  console.log(match, 'matchdata');
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
  console.log(state?.selectedPlayers, state?.editMode, 'state');
  return (
    <Container>
      {!next ? (
        <>
          <NoPlayers container spacing={2}>
            <PlayersIndicator container spacing={2} item lg={12} md={12} xs={12} sm={12} justifyContent="space-between">
              <Grid item>
                <Info>
                  Players
                  <p>
                    {players.filter((p) => p.isSelected).length}
                    /11
                  </p>
                </Info>
              </Grid>
              <Grid item justifyContent="center">
                <Info>
                  <Code>{match?.teamAwayCode}</Code>
                  <p>1</p>
                </Info>
              </Grid>
              <Grid item>
                <Info>
                  <Code>{match?.teamHomeCode}</Code>
                  <p>1</p>
                </Info>
              </Grid>
              <Grid item>
                <Info>
                  Credits Left
                  <p>83.5</p>
                </Info>
              </Grid>
            </PlayersIndicator>
            {players.filter((k) => k.isSelected === true).length <= 11
              && players
                .filter((k) => k.isSelected === true)
                .map((p, index) => (
                  <Grid item lg={12 / 11} md={12 / 11} xs={12 / 11} sm={12 / 11}>
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
                  <Grid item lg={12 / 11} md={12 / 11} xs={12 / 11} sm={12 / 11}>
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
