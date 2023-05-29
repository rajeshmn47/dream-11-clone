import styled from "@emotion/styled";
import { SettingsSystemDaydream } from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { FURL, URL } from "../constants/userConstants";
import Commentary from "./commentary";
import ConfirmModal from "./confirmcontest";
import BaseTab from "./ContestTabs";
import { LeaderBoard } from "./leaderboard";
import Loader from "./loader";
import SavedTeam from "./savedteam";
import ScoreCard from "./scorecard/scorecard";
import SelectTeam from "./selectteam";
import Stats from "./stats";
import { TeamShort } from "./TeamShort";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
`;

const ContestContainerJ = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 10px;
`;

const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: #ec1801;
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: red !important;
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
    background-color: #ec1801;
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: red !important;
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
  background-color: #008a36;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

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
  background-color: #000000;
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
  background-color: green;
  color: #ffffff;
  width: 80px;
  margin-right: 50px;
`;

const JoincontestBtn = styled(Button)`
  background-color: green;
  color: #ffffff;
  width: 180px;
  margin: 0 auto !important;
  &:hover {
    background-color: green;
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
  background-color: #fef4de;
`;

const TabP = styled(TabPanel)`
  .MuiBox-root {
    padding: 0 0 !important;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MatchTabs({ tabs, g, livescore }) {
  const [value, setValue] = React.useState(0);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
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
    async function getplayers() {
      if (user?._id && id) {
        const data = await axios.get(
          `${URL}/getteam/?matchId=${id}&userid=${user._id}`
        );
        const joinedC = await axios.get(
          `${URL}/getjoinedcontest/${id}?userid=${user._id}`
        );
        setContest([...joinedC.data.contests]);
        setTeam([...data.data.team]);
      }
    }
    getplayers();
  }, [user, id]);
  useEffect(() => {
    async function getteams() {
      const teamdata = await axios.get(
        `${URL}/getteamsofcontest/${contest[0]?._id}`
      );
      setLeaderboard(teamdata.data.teams);
    }
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
  const handleOpen = (i) => {
    setModal(i);
    setSelectTeams({ selected: true, team: null });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlejoin = async (t) => {
    console.log("join contest");
    const joinedC = await axios.get(
      `${URL}/getjoinedcontest/${id}?userid=${user._id}`
    );
    setContest([...joinedC.data.contests]);
    alert.success("contest joined successfully");
    setSelectTeams({ selected: false, team: t });
  };
  return (
    <div style={{ zIndex: "1" }}>
      {!selectTeams.selected ? (
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
              <Tab label="Contests" {...a11yProps(0)} />
              <Tab
                label={`My Contests(${contest && contest.length})`}
                {...a11yProps(1)}
              />
              <Tab
                label={`My Teams(${team && team.length})`}
                {...a11yProps(2)}
              />
              <Tab label="Commentary" {...a11yProps(3)} />
              <Tab label="Scorecard" {...a11yProps(4)} />
              <Tab label="Stats" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ContestsContainer container item sm={12} xs={12}>
              {tabs &&
                tabs.map((tab) => (
                  <ContestContainer onClick={() => handleOpen(tab)}>
                    <Contest>
                      <First>
                        <p>Prize Pool</p>
                        <p>Entry</p>
                      </First>
                      <First>
                        <h1>{tab.price}</h1>
                        <First>
                          <del>₹ 19</del>
                          <FreeButton>
                            ₹ {Math.floor(tab.price / tab.totalSpots)}
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
                        <SpotsLeft>{tab.spotsLeft} spots left</SpotsLeft>
                        <SpotsRight>{tab.totalSpots} spots</SpotsRight>
                      </First>
                    </Contest>
                    <Last>
                      ₹{Math.floor(tab.price / tab.totalSpots)}
                      <EmojiEventsOutlinedIcon
                        style={{ margin: "0 15px", marginBottom: "3px" }}
                      />
                      {Math.floor((tab.numWinners / tab.totalSpots) * 100)}%
                      Single
                    </Last>
                  </ContestContainer>
                ))}
              <ConfirmModal
                open={open}
                setOpen={setOpen}
                handleclose={handleClose}
                modal={modal}
                teamid={selectedTeam?._id}
                id={id}
              />
            </ContestsContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ContestsContainer container item sm={12} xs={12}>
              {contest.length > 0 ? (
                contest.map((tab) => (
                  <ContestContainerJ
                    onClick={() =>
                      navigate(`/contestdetail/${tab.contests._id}`)
                    }
                  >
                    <ContestJ>
                      <First>
                        <p>Contests</p>
                        <p>{tab?.contests?.totalSpots} spots</p>
                        {match_details?.result == "Yes" && (
                          <h5
                            style={{ color: "#008a36", fontFamily: "OpenSans" }}
                          >
                            u won {tab?.team.won}
                            rs!
                          </h5>
                        )}
                      </First>
                    </ContestJ>
                    <LastJ>
                      <p>glory awaits</p>
                      <First>guaranteed</First>
                    </LastJ>

                    <StatusC>
                      <SpotsLeft>
                        {tab?.team?.username}
                        <p style={{ color: "#1ca14d", fontSize: "12px" }}>
                          IN WINNING ZONE
                        </p>
                      </SpotsLeft>
                      <SpotsLeft>{tab?.team?.teamnumber}</SpotsLeft>
                      <SpotsLeft>{tab?.team?.points}</SpotsLeft>
                      <SpotsRight
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        #{tab?.team?.rank}
                        <ArrowUpwardIcon
                          style={{
                            color: "#1ca14d",
                            fontSize: "18px",
                            marginLeft: "5px",
                          }}
                        />
                      </SpotsRight>
                    </StatusC>
                  </ContestContainerJ>
                ))
              ) : (
                <NoContests>
                  <p> you have not joined a contest yet!</p>
                  <img src={`${FURL}/contest.png`} alt="" />
                  <p>What are you waiting for?</p>
                  <JoincontestBtn onClick={() => setValue(0)}>
                    join a contest
                  </JoincontestBtn>
                </NoContests>
              )}
            </ContestsContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {team?.length > 0 &&
              team.map((t) => (
                <TeamShort
                  match={matchlive || match_details}
                  match_info={match_details}
                  players={t.players}
                  plo={t}
                  id={id}
                />
              ))}
            <CreateTeam onClick={() => navigate(`/createnew/${id}`)}>
              <AddCircleOutlineRoundedIcon />
              create team
            </CreateTeam>
          </TabPanel>
          <TabP value={value} index={3}>
            <Commentary matchdata={match_details} />
          </TabP>
          <TabP value={value} index={4}>
            <ScoreCard data={matchlive} g={g} livescore={livescore} />
          </TabP>
          <TabP value={value} index={5}>
            <Stats matchdata={matchlive || match_details} team={team} />
          </TabP>
        </Box>
      ) : (
        team?.length > 0 && (
          <>
            <Heading>You can Enter 1 team in this contest</Heading>
            {team.map((t) => (
              <SelectTeam
                players={t.players}
                plo={t}
                id={id}
                selectTeams={selectTeams}
                setSelectTeams={setSelectTeams}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                match={matchlive || match_details}
              />
            ))}
            <JoinButtoncontainer>
              <p>join with</p>
              <JoinBtn onClick={handlejoin}>Join</JoinBtn>
            </JoinButtoncontainer>
          </>
        )
      )}
    </div>
  );
}
