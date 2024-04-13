import './home.css';
import './create.css';

import styled from '@emotion/styled';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import WestIcon from '@mui/icons-material/West';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import Contest from './contests/contest';
import ContestTabs from './ContestTabs';
import SelectTeam from './selectteam';

const Top = styled.div`
  background-color: var(--black);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  position: fixed;
  z-index: 1;
  height: 50px;
  top: 0;
  left: 0;
`;

const Buttons = styled.div`
position:fixed;
bottom:0;
background-color:#FFF;
width:100%;
display:flex;
justify-content:space-between;
padding:10px;
`;

const CreateButton = styled(Button)`
text-align:center;
width:45%;
background-color:var(--black);
color: #fff;
:hover{
  color:inherit;
  background-color:inherit;
}
`;

const JoinButton = styled(Button)`
text-align:center;
width:45%;
background-color:var(--green);
color: #fff;
:hover{
  color:inherit;
  background-color:inherit;
}
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
    background-color: var(--red) !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: var(--black) !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
`;
const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0 0;
  margin-top: 70px !important;
  cursor: pointer;
`;

const tabs = [{ label: 'winnings' }, { label: 'leaderboard' }];

export function ContestDetail() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { match_details, matchlive } = useSelector((state) => state.match);
  const { state } = useLocation();
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [teams, setTeams] = useState();
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [switchTeam, setSwitchTeam] = useState(null);
  const [joinTeam, setJoinTeam] = useState(null);
  const alert = useAlert();
  const [selectTeams, setSelectTeams] = useState({
    selected: false,
    team: null,
  });
  const [match, setMatch] = useState(null);
  const [contest, setContest] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    async function getteams() {
      if (id.length > 3) {
        const teamdata = await API.get(`${URL}/getteamsofcontest/${id}`);
        const contestdata = await API.get(`${URL}/getcontest/${id}`);
        setContest(contestdata.data.contest);
        setMatch(teamdata.data.match);
        const t = teamdata.data.teams.sort((a, b) => a.points - b.points);
        setLeaderboard([...t]);
      }
    }
    getteams();
  }, [id]);
  useEffect(() => {
    async function getplayers() {
      if (user?._id && match_details?.matchId) {
        const data = await API.get(
          `${URL}/getteam/?matchId=${match_details?.matchId}`,
        );
        setTeams([...data.data.team]);
      }
    }
    getplayers();
  }, [user, match_details]);
  useEffect(() => {
    if (selectedTeam) {
      setSelectTeams({
        selected: true,
        team: selectedTeam,
      });
    } else {
      setSelectTeams({
        selected: false,
        team: null,
      });
    }
  }, [selectedTeam]);
  useEffect(() => {
    if (switchTeam) {
      setSelectTeams({
        selected: true,
        team: null,
      });
    } else {
      setSelectTeams({
        selected: false,
        team: null,
      });
    }
  }, [switchTeam]);
  useEffect(() => {
    if (joinTeam) {
      setSelectTeams({
        selected: true,
        team: null,
      });
    } else {
      setSelectTeams({
        selected: false,
        team: null,
      });
    }
  }, [joinTeam]);

  const handleSwap = (e, team) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setSwitchTeam(team);
  };

  const handleClick = (e) => {
    console.log('please join team');
    setJoinTeam(true);
  };

  const handleJoin = async (e) => {
    try {
      if (switchTeam?._id && selectedTeam?._id) {
        const { data } = await API.get(
          `${URL}/reJoinCn/${contest?._id}?oldTeamId=${switchTeam?._id}&newTeamId=${selectedTeam?._id}`,
        );
        setSelectedTeam(null);
        setSwitchTeam(null);
        const teamdata = await API.get(`${URL}/getteamsofcontest/${id}`);
        const contestdata = await API.get(`${URL}/getcontest/${id}`);
        alert.success('contest swapped successfully');
        setContest(contestdata.data.contest);
        setMatch(teamdata.data.match);
        const t = teamdata.data.teams.sort((a, b) => a.points - b.points);
        setLeaderboard([...t]);
      }
      else if (joinTeam) {
        const data = await API.get(
          `${URL}/joincontest/${contest?._id}?teamid=${selectedTeam?._id}`,
        );
        setSelectedTeam(null);
        setSwitchTeam(null);
        const teamdata = await API.get(`${URL}/getteamsofcontest/${id}`);
        const contestdata = await API.get(`${URL}/getcontest/${id}`);
        alert.success('contest joined successfully');
        setContest(contestdata.data.contest);
        setMatch(teamdata.data.match);
        const t = teamdata.data.teams.sort((a, b) => a.points - b.points);
        setLeaderboard([...t]);
        setJoinTeam(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(
    !!selectTeams?.team,
    selectTeams?.team,
    switchTeam,
    'match_details',
  );
  return (
    <>
    {contest&&<>
      {!selectTeams?.selected ? (
        <>
          <ContestsContainer container>
            <Top>
              <LeftSide>
                <WestIcon
                  onClick={() => history(-1)}
                  style={{ cursor: 'pointer' }}
                />
                {match && (
                  <h1>
                    <span style={{ marginRight: '5px' }}>
                      {match.teamAwayCode}
                    </span>
                    vs
                    <span style={{ marginLeft: '5px' }}>
                      {match.teamHomeCode}
                    </span>
                  </h1>
                )}
              </LeftSide>
              <RightSide>
                <Brightness1Icon />
                <AccountBalanceWalletOutlinedIcon />
                <NotificationAddOutlinedIcon />
              </RightSide>
            </Top>
            <Contest contest={contest} handleClick={handleClick} />
          </ContestsContainer>
          <ContestTabs
            contest={contest}
            leaderboard={leaderboard}
            handleSwap={handleSwap}
          />
        </>
      ) : (
        <>
          {teams?.map((t) => (
            <SelectTeam
              players={t.players}
              plo={t}
              id={match_details?.matchId}
              teamIds={
                contest?.teamsId?.length > 0 ? [...contest.teamsId] : ['id']
              }
              joinTeam={joinTeam}
              selectTeams={selectTeams}
              setSelectTeams={setSelectTeams}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              match={matchlive || match_details}
              matchdetails={match_details}
            />
          ))}
          <Buttons>
            <CreateButton onClick={() => history(`/createteam/${match_details?.matchId}`)}>create team</CreateButton>
            {!selectTeams?.team ?
              <Button style={{ width: "50%" }} disabled={!selectTeams?.team} onClick={() => handleJoin()}>
                Join Team
              </Button> :
              <JoinButton disabled={!selectTeams?.team} onClick={() => handleJoin()}>
                Join Team
              </JoinButton>}
          </Buttons>
        </>
      )}
    </>}
    </>
  );
}

export default ContestDetail;
