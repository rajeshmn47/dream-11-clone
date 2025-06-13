import './home.css';

import styled from '@emotion/styled';
import {
  SportsCricketOutlined,
} from '@mui/icons-material';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import {
  Box, Button, Tab, Tabs, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import {
  getDisplayDate,
  getJustDate,
  getJustHours,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from '../utils/dateformat';
import Match from './home/match';
import Loader from './loader';
import Navbar from './navbar';
import Bottomnav from './navbar/bottomnavbar';

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
    'aria-controls': `simple-tabpanel-${index}`,
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
        const data = await API.get(`${URL}/myMatches`);
        const cm = data.data.completed.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date),
        );
        const um = data.data.upcoming?.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date),
        );
        const lm = data.data.live?.results.sort(
          (b, a) => new Date(a.date) - new Date(b.date),
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
    const servertoken = localStorage.getItem('token') && localStorage.getItem('token');
    if (!servertoken) {
      navigate('/login');
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
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  <Tab label="Upcoming" {...a11yProps(0)} />
                  <Tab label="Live" {...a11yProps(1)} />
                  <Tab label="Completed" {...a11yProps(2)} />
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
                            postion: 'absolute !important',
                            backgroundColor: '#000',
                          }}
                        >
                          <Top>
                            <h5
                              style={{
                                color: '#595959',
                                height: '3vh',
                                fontSize: '12px',
                                fontWeight: '200',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {u.match_title}
                            </h5>
                            <NotificationAddOutlinedIcon
                              style={{ fontSize: '18px' }}
                            />
                          </Top>
                          <div className="match">
                            <div className="matchcenter">
                              <div>
                                <div className="matchlefts">
                                  <img src={u.teamAwayFlagUrl} alt="" width="40" />
                                  <h5 style={{ color: '#212121', marginLeft: '20px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{u.away.name}</h5>
                                </div>
                                <div className="matchrights">
                                  <img src={u.teamHomeFlagUrl} alt="" width="40" />
                                  <h5 style={{ color: '#212121', marginLeft: '20px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                                    {' '}
                                    {u.home.name}
                                  </h5>
                                </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  textTransform: 'uppercase',
                                }}>
                                  <Dot />
                                  <h5 style={{ fontWeight: '200', color: '#5a5a5a', fontSize: '10px' }}>{getJustHours(u?.date)}</h5>
                                </div>
                                <p
                                  style={{
                                    color: '#e10000',
                                    textTransform: 'auto',
                                    fontWeight: '200',
                                    fontSize: '10px'
                                  }}
                                >
                                  {getDisplayDate(u.date, 'i') && getJustDate(u.date, 'i')}
                                </p>

                              </div>

                            </div>
                          </div>
                          <div
                            className="bottom"
                            style={{
                              position: 'relative',
                              padding: '6px 15px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '150px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              {u.teams.length > 0 && (
                                <h5
                                  className=""
                                  style={{
                                    textTransform: 'capitalize',
                                    fontSize: '12px',
                                  }}
                                >
                                  {u.teams.length}
                                  {' '}
                                  teams
                                </h5>
                              )}
                              <div className="meg">
                                {u.contests.length > 0 && (
                                  <h5
                                    style={{
                                      textTransform: 'capitalize',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {u.contests.length}
                                    {' '}
                                    contests
                                  </h5>
                                )}
                              </div>
                            </div>
                            <div className="icon">
                              <SportsCricketOutlined
                                style={{ color: '#595959', fontSize: '18px' }}
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
                {live?.length > 0 && (
                  <div className="matches">
                    {live.map((u) => (
                      <Match u={u} live />
                    ))}
                  </div>
                )}
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
                            postion: 'absolute !important',
                            backgroundColor: '#000',
                          }}
                        >
                          <Top>
                            <h5
                              style={{
                                color: '#595959',
                                height: '3vh',
                                fontSize: '12px',
                                fontWeight: '200',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ marginRight: '5px' }}>
                                {u.away.code}
                              </span>
                              {' '}
                              vs
                              <span style={{ marginLeft: '5px' }}>
                                {u.home.code}
                              </span>
                            </h5>

                          </Top>
                          <div className="match">
                            <div className="matchcenter">
                              <div>
                                <div className="matchlefts">
                                  <img src={u.teamAwayFlagUrl} alt="" width="40" />
                                  <h5 style={{ color: '#212121', marginLeft: '20px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{u.away.name}</h5>
                                </div>
                                <div className="matchrights">
                                  <img src={u.teamHomeFlagUrl} alt="" width="40" />
                                  <h5 style={{ color: '#212121', marginLeft: '20px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                                    {' '}
                                    {u.home.name}
                                  </h5>
                                </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  textTransform: 'uppercase',
                                }}>
                                  <Dot />
                                  <h5 style={{ fontWeight: '200', color: '#5a5a5a', fontSize: '10px' }}>Completed</h5>
                                </div>
                                <p
                                  style={{
                                    color: '#e10000',
                                    textTransform: 'auto',
                                    fontWeight: '200',
                                    fontSize: '10px'
                                  }}
                                >
                                  {getDisplayDate(u.date, 'i') && getJustDate(u.date, 'i')}
                                </p>

                              </div>

                            </div>
                          </div>
                          <div
                            className="bottom"
                            style={{
                              position: 'relative',
                              padding: '6px 15px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '150px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              {u.teams.length > 0 && (
                                <h5
                                  className=""
                                  style={{
                                    textTransform: 'capitalize',
                                    fontSize: '12px',
                                    fontWeight: '200',
                                  }}
                                >
                                  {u.teams.length}
                                  {' '}
                                  teams
                                </h5>
                              )}
                              <div className="meg">
                                {u.contests.length > 0 && (
                                  <h5
                                    style={{
                                      textTransform: 'capitalize',
                                      fontSize: '12px',
                                      fontWeight: '200',
                                    }}
                                  >
                                    {u.contests.length}
                                    {' '}
                                    contests
                                  </h5>
                                )}
                              </div>
                            </div>
                            <div className="icon">
                              <h5
                                style={{
                                  marginRight: '10px',
                                  color: 'var(--brightgreen)',
                                  fontWeight: '200',
                                  textTransform: 'uppercase',
                                }}
                              >
                                YOU Won ₹
                                {u.won}
                              </h5>

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
