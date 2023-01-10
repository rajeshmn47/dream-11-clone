import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ConfirmModal from "./confirmcon";
import BaseTab from "./tabsdata";
import SavedTeam from "./savedteam";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SettingsSystemDaydream } from "@mui/icons-material";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
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

export default function BasicTabs({ tabs, id }) {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();
  console.log(open, "basicsoftabs");

  useEffect(() => {
    async function getplayers() {
      if (user?._id) {
        const data = await axios.get(
          `http://localhost:8000/getteam/?matchId=${id}&userid=${user._id}`
        );
        console.log(data, "data");
        setTeam(data.data.team);
        const contestdata = await axios.get(
          `http://localhost:8000/getcontestsofuser/${id}?userid=${user._id}`
        );
        console.log(contestdata);
        setContest(contestdata.data.contests);
      }
    }
    getplayers();
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    console.log("stillitis clicked");
    setModal(i);
    setOpen(true);
  };
  const handleClose = () => {
    console.log("handleopenclose");
    setOpen(false);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Contests" {...a11yProps(0)} />
          <Tab
            label={`My Contests(${contest && contest.length})`}
            {...a11yProps(1)}
          />
          <Tab label={`My Teams(${team && team.length})`} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContestsContainer container item sm={12} xs={12}>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
          </ContestContainer>
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
                  {Math.floor((tab.numWinners / tab.totalSpots) * 100)}% Single
                </Last>
              </ContestContainer>
            ))}
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
          </ContestContainer>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
            <ConfirmModal
              open={open}
              setOpen={setOpen}
              handleclose={handleClose}
              modal={modal}
              teamid={team?.length > 0 && team[0]._id}
              id={id}
            />
          </ContestContainer>
        </ContestsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContestsContainer container item sm={12} xs={12}>
          {contest.length > 0 &&
            contest.map((tab) => (
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
                  {Math.floor((tab.numWinners / tab.totalSpots) * 100)}% Single
                </Last>
              </ContestContainer>
            ))}
        </ContestsContainer>
        <BaseTab contest={contest} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {team?.length > 0 && (
          <SavedTeam players={team?.length > 0 && team[0].players} />
        )}
        <CreateTeam onClick={() => navigate(`/createnew/${id}`)}>
          <AddCircleOutlineRoundedIcon />
          create team
        </CreateTeam>
      </TabPanel>
    </Box>
  );
}
