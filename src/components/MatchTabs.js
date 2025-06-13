import styled from '@emotion/styled';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SouthIcon from '@mui/icons-material/South';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { FURL, URL } from '../constants/userConstants';
import { leaderboardChanges } from '../utils/leaderboardchanges';
import Commentary from './commentary';
import ConfirmModal from './confirmcontest';
import ScoreCard from './scorecard/scorecard';
import SelectTeam from './selectteam';
import Stats from './stats';
import { TeamShort } from './TeamShort';
//import ReactPullToRefresh from 'react-pull-to-refresh';
import PullToRefresh from 'react-simple-pull-to-refresh';
// Import the CSS
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ContestContainerN from './ContestContainer';
import MyContestsTab from './MyContestsTab';

const ContestCardStyled = styled.div`
  border-radius: 16px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.18);
    transform: translateY(-2px) scale(1.01);
  }
`;

const PrizeText = styled.h1`
  font-size: 2rem;
  color: var(--red);
  margin: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EntryFee = styled.span`
  font-size: 1.1rem;
  color: #444;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 4px 12px;
  margin-left: 8px;
  font-weight: 600;
`;

const SpotsBar = styled(Slider)`
  && {
    margin-top: 10px;
    margin-bottom: 10px;
    .MuiSlider-track {
      background-color: var(--green);
    }
    .MuiSlider-rail {
      background-color: #eee;
    }
  }
`;

const SpotsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 0 0;
`;

const SpotsLeft = styled.span`
  color: ${props => props.low ? 'var(--red)' : '#444'};
  font-weight: 600;
`;

const JoinBtnStyled = styled(Button)`
  && {
    background-color: var(--red);
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;
    margin-top: 18px;
    padding: 12px 0;
    border-radius: 8px;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(255,0,0,0.08);
    transition: background 0.2s;
    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  color:#5e5b5b;
`;

const ContestContainerJ = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 10px;
  color:#5e5b5b;
`;

const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: var(--lightred) !important;
  }
`;

const ContestJ = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: var(--lightred) !important;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: var(--red);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;

const LastJ = styled.div`
  background-color: #f6f6f6;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: space-between;
  color: #888;
  h1 {
    padding: 0 0 !important;
  }
`;

const CreateTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--black);
  color: #ffffff;
  width: 200px;
  margin: 0 auto;
  height: 35px;
  border-radius: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const Heading = styled.h3`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  margin-bottom: 20px;
  font-size: 12px;
  padding: 10px 10px;
`;

const JoinBtn = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 80px;
  margin-right: 50px;
`;

const JoincontestBtn = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 180px;
  margin: 0 auto !important;
  &:hover {
    background-color: var(--green);
  }
`;

const JoinButtoncontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  width: 100%;
  z-index: 100000000000000000000000000000;
  background-color: #ffffff;
`;

const NoContests = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 400px;
  img {
    max-width: 100%;
  }
`;

const StatusC = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color:var(--lightred);
  border-bottom: 1px solid;
  border-bottom-color: currentcolor;
  border-color: rgba(106, 106, 106, 0.12);
`;

const TabP = styled(TabPanel)`
  .MuiBox-root {
    padding: 0 0 !important;
  }
`;

const M = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: flex;
  border: 1px solid #888;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-right: 5px;
`;

const C = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const F = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: lowercase;
  font-size: 10px;
  margin-right: 5px;
`;

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MatchTabs({ tabs, g, livescore, getdata }) {
  const [value, setValue] = React.useState(0);
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  const { id } = useParams();
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const alert = useAlert();
  const [selectTeams, setSelectTeams] = React.useState({
    selected: false,
    team: null,
  });
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getplayers();
  }, [user, id]);

  useEffect(() => {
    getteams();
  }, [contest]);

  useEffect(() => {
    if (selectTeams.team) {
      setOpen(true);
    }
  }, [selectTeams]);

  useEffect(() => {
    setSelectTeams({
      open: false,
      team: selectedTeam,
    });
  }, [selectedTeam]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = (e, i) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (
      !(matchlive?.result == 'In Progress' || matchlive?.result == 'Complete')
    ) {
      if (!team?.length > 0) {
        setValue(1);
        alert.info('create a team before joining contest!');
      } else {
        setModal(i);
        setSelectTeams({ selected: true, team: null });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getteams() {
    if (contest[0]?._id) {
      const teamdata = await API.get(
        `${URL}/getteamsofcontest/${contest[0]?._id}`,
      );
      setLeaderboard(teamdata.data.teams);
    }
  }

  async function getplayers() {
    if (user?._id && id) {
      const data = await API.get(`${URL}/getteam/?matchId=${id}`);
      const joinedC = await API.get(`${URL}/getjoinedcontest/${id}`);
      leaderboardChanges(joinedC.data.contests);
      setContest([...joinedC.data.contests]);
      setTeam([...data.data.team]);
    }
  }

  const handlejoin = async (t) => {
    console.log('join contest');
    const joinedC = await API.get(`${URL}/getjoinedcontest/${id}`);
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    alert.success('contest joined successfully');
    setSelectTeams({ selected: false, team: t });
  };

  const loadjoined = async (t) => {
    console.log('join contest');
    const joinedC = await API.get(`${URL}/getjoinedcontest/${id}`);
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    setSelectTeams({ selected: false, team: t });
  };

  const refreshData = async () => {
    getdata();
    getteams();
    getplayers();
  };

  console.log(contest, matchlive, 'match_details');

  const tabConfig = [
    {
      label: "Contests",
      condition: !(matchlive?.result === "In Progress" || matchlive?.result === "Complete"),
      content: (
        <ContestsContainer container spacing={2} justifyContent="center">
          {tabs
            && tabs.map((tab) => (
              <Grid item md={4} lg={4} sm={12} xs={12}
                onClick={() => navigate(`/contestdetail/${tab._id}`, {
                  state: {
                    match_details: matchlive,
                  },
                })}
              >
                {/*<ContestContainer>
                  <Contest>
                    <First>
                      <p>Prize Pool</p>
                      <p>Entry</p>
                    </First>
                    <First>
                      <h1>{tab.price}</h1>
                      <First>
                        <del>₹ 19</del>
                        <FreeButton onClick={(e) => handleOpen(e, tab)}>
                          ₹
                          {' '}
                          {Math.floor(tab.price / tab.totalSpots)}
                        </FreeButton>
                      </First>
                    </First>
                    <SliderContainer>
                      <Slider
                        defaultValue={tab.totalSpots - tab.spotsLeft}
                        min={0}
                        max={tab.totalSpots}
                        disabled
                      />
                    </SliderContainer>
                    <First>
                      <SpotsLeft>
                        {tab.spotsLeft}
                        {' '}
                        spots left
                      </SpotsLeft>
                      <SpotsRight>
                        {tab.totalSpots}
                        {' '}
                        spots
                      </SpotsRight>
                    </First>
                  </Contest>
                  <Last>
                    ₹
                    {Math.floor(tab.price / tab.totalSpots)}
                    <EmojiEventsOutlinedIcon
                      style={{ margin: '0 15px', marginBottom: '3px' }}
                    />
                    {Math.floor((tab.numWinners / tab.totalSpots) * 100)}
                    %
                    Single
                  </Last>
                </ContestContainer>*/}
                <ContestContainerN
                  price={tab.price}
                  entryFee={Math.floor(tab.price / tab.totalSpots)}
                  totalSpots={tab.totalSpots}
                  spotsLeft={tab.spotsLeft}
                  numWinners={tab.numWinners}
                  isAlmostFull={tab.spotsLeft <= 10}
                  onJoin={e => handleOpen(e, tab)}
                  onClick={() => navigate(`/contestdetail/${tab._id}`, { state: { match_details: matchlive } })}
                />
              </Grid>
            ))}
          <ConfirmModal
            open={open}
            setOpen={setOpen}
            handleclose={handleClose}
            modal={modal}
            teamid={selectedTeam?._id}
            id={id}
            loadjoined={loadjoined}
            setSelectedTeam={setSelectedTeam}
          />
        </ContestsContainer>
      ),
    },
    {
      label: `My Contests (${contest.length})`,
      condition: contest.length > 0,
      content: (
        <MyContestsTab
          contest={contest}
          matchlive={matchlive}
          navigate={navigate}
          setValue={setValue}
        />
      ),
    },
    {
      label: `My Teams (${team?.length})`,
      condition: match_details,
      content: (
        <Grid container spacing={2} justifyContent="center">
          {team?.length > 0
            && team.map((t) => (
              <TeamShort
                match={matchlive || match_details}
                match_info={match_details}
                players={t.players}
                plo={t}
                id={id}
              />
            ))}
          {!(
            matchlive?.result == 'In Progress'
            || matchlive?.result == 'Complete'
          ) && (
              <CreateTeam onClick={() => navigate(`/createteam/${id}`)}>
                <AddCircleOutlineRoundedIcon />
                <p style={{ textTransform: 'uppercase' }}>create team</p>
              </CreateTeam>
            )}
        </Grid>
      ),
    },
    {
      label: "Commentary",
      condition: !!matchlive,
      content: <Commentary matchdata={match_details} />,
    },
    {
      label: "Scorecard",
      condition: !!matchlive,
      content: <ScoreCard data={matchlive} g={g} livescore={livescore} />,
    },
    {
      label: "Stats",
      condition: match_details,
      content: <Stats matchdata={matchlive || match_details} team={team} />,
    },
    {
      label: "Live",
      condition: matchlive,
      content: (
        <video id="videoPlayer" width="100%" controls autoPlay muted={false}>
          <source src={`${URL}/highlights/final_${match_details?.matchId}.mp4`} type="video/mp4" />
        </video>
      ),
    },
  ];

  return (
    <PullToRefresh onRefresh={getdata}>
      <div style={{ zIndex: '1' }}>
        {!selectTeams.selected ? (
          <Box sx={{ width: '100%' }}>
            <div style={{ zIndex: "1" }}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                  >
                    {tabConfig
                      .filter((tab) => tab.condition) // Only render tabs that meet the condition
                      .map((tab, index) => (
                        <Tab key={index} label={tab.label} {...a11yProps(index)} />
                      ))}
                  </Tabs>
                </Box>
                {tabConfig
                  .filter((tab) => tab.condition) // Only render TabPanels that meet the condition
                  .map((tab, index) => {
                    return (
                      tab?.label == "Commentary" ?
                        <TabP key={index} value={value} index={index}>
                          {tab.content}
                        </TabP>
                        :
                        <TabPanel key={index} value={value} index={index}>
                          {tab.content}
                        </TabPanel>
                    )
                  })}
              </Box>
            </div>
          </Box>
        ) : (
          team?.length > 0 && (
            <>
              <Heading>Please select team by clicking button in the side</Heading>
              {team.map((t) => (
                <SelectTeam
                  players={t.players}
                  plo={t}
                  id={id}
                  teamIds={
                    contest
                      .find((c) => c?.contest?._id == modal?._id)
                      ?.teams?.map((t) => t?._id).length > 0
                      && contest?.length > 0
                      ? [
                        ...contest
                          .find((c) => c?.contest?._id == modal?._id)
                          ?.teams?.map((t) => t?._id),
                      ]
                      : ['id']
                  }
                  selectTeams={selectTeams}
                  setSelectTeams={setSelectTeams}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                  match={matchlive || match_details}
                  matchdetails={match_details}
                />
              ))}
            </>
          )
        )}
      </div>
    </PullToRefresh>
  );
}
