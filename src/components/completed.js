import "./home.css";

import styled from "@emotion/styled";
import {
  SettingsApplicationsTwoTone,
  SportsCricketOutlined,
} from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Button, Drawer, Typography } from "@mui/material";
import axios from "axios";
import extractColors from "extract-colors";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { URL } from "../constants/userConstants";
import {
  getDisplayDate,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from "../utils/dateformat";
import Bottomnav from "./navbar/bottomnavbar";
import Loader from "./loader";
import Navbar from "./navbar";
import Steppr from "./stepper";

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
  .MuiTabScrollButton-root {
    width: 15px;
    white-space: nowrap;
  }
`;

const DeatilTop = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const CricketBg = styled.div`
  background-image: url("./cricketbg.jpg");
  box-sizing: border-box;
  padding: 10px 10px;
  height: 150px;
  margin-bottom: 60px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(170, 170, 170, 0.15);
  padding: 5px 15px;
  background-color: #ffffff;
`;

const Dot = styled.div`
  background-color: var(--green) !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ViewAll = styled(Button)`
  color: #ffffff;
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
        <Box sx={{ p: 1 }}>
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

export function Completed() {
  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const i = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);
  useEffect(() => {
    async function getupcoming() {
      if (user?._id) {
        setLoading(true);
        const data = await axios.get(`${URL}/myMatches/${user._id}`);
        const cm = data.data.completed.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date)
        );
        const um = data.data.upcoming?.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date)
        );
        const lm = data.data.upcoming?.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date)
        );
        setPast(cm);
        setUpcoming(um);
        setLive(lm);
        setLoading(false);
      }
    }
    getupcoming();
  }, [user]);
  useEffect(() => {
    const servertoken =
      localStorage.getItem("token") && localStorage.getItem("token");
    if (!servertoken) {
      navigate("/login");
    }
  }, []);
  const handleClick = () => {
    setOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      {!loading ? (
        <Container>
          <div className="homecontainer">
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
                  <Tab label="Upcoming" {...a11yProps(0)} />
                  <Tab
                    label={`Live`}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={`Completed`}
                    {...a11yProps(2)}
                  />

                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="matches">
                  {upcoming?.length > 0 ? (
                    <>
                      {upcoming.map((u) => (
                        <div
                          className="matchcontainer"
                          onClick={() => navigate(`/contests/${u.id}`)}
                          style={{
                            postion: "absolute !important",
                            backgroundColor: "#000",
                          }}
                        >
                          <Top>
                            <h5
                              style={{
                                color: "#595959",
                                height: "3vh",
                                fontSize: "12px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {u.match_title}
                            </h5>
                            <NotificationAddOutlinedIcon
                              style={{ fontSize: "18px" }}
                            />
                          </Top>
                          <div className="match">
                            <div className="matchcenter">
                              <div className="matchlefts">
                                <img src={u.teamAwayFlagUrl} alt="" width="40" />
                                <h5>{u.away.code}</h5>
                              </div>
                              <div
                                className={u.result == "Yes" ? "completed" : "time"}
                              >
                                {u.result != "Yes" && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#5e5b5b",
                                        textTransform: "auto",
                                        fontSize: "10px",
                                        marginTop: "2px",
                                      }}
                                    >
                                      {!(u.result == "Yes") ? (
                                        sameDayorNot(new Date(), new Date(u.date)) ||
                                          isTommorrow(new Date(), new Date(u.date)) ? (
                                          <div>
                                            <p>{hoursRemaining(u.date, "k", date)}</p>
                                            <p
                                              style={{
                                                color: "#5e5b5b",
                                                textTransform: "auto",
                                                fontSize: "10px",
                                                marginTop: "2px",
                                              }}
                                            >
                                              {getDisplayDate(u.date, "i", date) &&
                                                getDisplayDate(u.date, "i", date)}
                                            </p>
                                          </div>
                                        ) : (
                                          <p
                                            style={{
                                              color: "#e10000",
                                              textTransform: "auto",
                                            }}
                                          >
                                            {getDisplayDate(u.date, "i") && getDisplayDate(u.date, "i")}
                                          </p>
                                        )
                                      ) : (
                                        "Completed"
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="matchrights">
                                <h5> {u.home.code}</h5>
                                <img src={u.teamHomeFlagUrl} alt="" width="40" />
                              </div>
                            </div>
                          </div>
                          <div
                            className="bottom"
                            style={{ position: "relative", padding: "6px 15px" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "150px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {u.teams.length > 0 && (
                                <h5
                                  className=""
                                  style={{
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                  }}
                                >
                                  {u.teams.length} teams
                                </h5>
                              )}
                              <div className="meg">
                                {u.contests.length > 0 && (
                                  <h5
                                    style={{
                                      textTransform: "capitalize",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {u.contests.length} contests
                                  </h5>
                                )}
                              </div>
                            </div>
                            <div className="icon">
                              <SportsCricketOutlined
                                style={{ color: "#595959", fontSize: "18px" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="matches">
                  {past?.length > 0 ? (
                    <>
                      {past.map((u) => (
                        <div
                          className="matchcontainer"
                          onClick={() => navigate(`/contests/${u.id}`)}
                          style={{
                            postion: "absolute !important",
                            backgroundColor: "#000",
                          }}
                        >
                          <Top>
                            <h5
                              style={{
                                color: "#595959",
                                height: "3vh",
                                fontSize: "12px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ marginRight: "5px" }}>
                                {u.away.code}
                              </span>{" "}
                              vs
                              <span style={{ marginLeft: "5px" }}>{u.home.code}</span>
                            </h5>
                            <NotificationAddOutlinedIcon
                              style={{ fontSize: "18px" }}
                            />
                          </Top>
                          <div className="match">
                            <div className="matchcenter">
                              <div className="matchlefts">
                                <img src={u.teamAwayFlagUrl} alt="" width="40" />
                                <h5>{u.away.code}</h5>
                              </div>
                              <div
                                className={u.result == "Yes" ? "completed" : "time"}
                              >
                                {u.result === "Yes" && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      <Dot />
                                      <h5 style={{ fontWeight: "600 !important" }}>
                                        Completed
                                      </h5>
                                    </div>
                                    <p
                                      style={{
                                        color: "#5e5b5b",
                                        textTransform: "auto",
                                        fontSize: "10px",
                                        marginTop: "2px",
                                      }}
                                    >
                                      {getDisplayDate(u.date, "i", date)}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="matchrights">
                                <h5> {u.home.code}</h5>
                                <img src={u.teamHomeFlagUrl} alt="" width="40" />
                              </div>
                            </div>
                          </div>
                          <div
                            className="bottom"
                            style={{ position: "relative", padding: "6px 15px" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "150px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {u.teams.length > 0 && (
                                <h5
                                  className=""
                                  style={{
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                  }}
                                >
                                  {u.teams.length} teams
                                </h5>
                              )}
                              <div className="meg">
                                {u.contests.length > 0 && (
                                  <h5
                                    style={{
                                      textTransform: "capitalize",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {u.contests.length} contests
                                  </h5>
                                )}
                              </div>
                            </div>
                            <div className="icon">
                              <h5
                                style={{ marginRight: "10px", color: "var(--green)" }}
                              >
                                u won {u.won}
                                rs !
                              </h5>
                              <SportsCricketOutlined
                                style={{ color: "#595959", fontSize: "18px" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </TabPanel>
            </Box>

          </div>
        </Container>
      ) : (
        <Loader />
      )}
      <Bottomnav />
    </>
  );
}

export default Completed;
