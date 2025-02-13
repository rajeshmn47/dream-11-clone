import './home.css';

import styled from '@emotion/styled';
import { SportsCricketOutlined } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { GrMultimedia } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../actions/userAction';
import { URL } from '../../constants/userConstants';
import {
  getDisplayDate,
} from '../../utils/dateformat';
import Loader from '../loader';
import Navbar from '../navbar';
import Bottomnav from '../navbar/bottomnavbar';
import Match from './match';

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Account = styled.h3`
  font-size: 12px;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: var(--green);
    color: #ffffff;
  }
`;

const Deatil = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  text-align: left;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
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
  background-size: cover;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(196, 195, 195, 0.15);
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
  align-items: center;
`;
const ViewAll = styled(Button)`
  color: #ffffff;
  text-transform: capitalize;
  font-weight: 800;
  font-size: 18px;
`;

const Spanner = styled.div`
  width: 20px;
  height: 5px;
`;

const AllMatches = styled(Grid)`
  padding: 5px 65px;
  @media (max-width: 600px) {  /* xs and sm breakpoints */
    padding: 0px;  /* Adjust padding for mobile */
  }
`;

export function Home() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastLoading, setPastLoading] = useState(true);
  const [date, setDate] = useState();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function getupcoming() {
      if (user?._id) {
        setLoading(true);
        setPastLoading(true);
        const data = await API.get(`${URL}/homeMatches`);
        setLoading(false);
        const ucm = data.data.upcoming.results
          .filter((k) => new Date(k.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setUpcoming([...ucm]);
        const lrr = data.data.live.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        setLive([...lrr]);
        setPastLoading(false);
        if (data.data.past.results.length > 0) {
          setPast([
            data.data.past.results
              .sort((b, a) => new Date(a.date) - new Date(b.date))
              .reverse()
              .pop(),
          ]);
        } else {
          // setPast([
          // data.data.past.results
          //    .sort((b, a) => new Date(a.date) - new Date(b.date))
          //   .pop(),
          // ]);
        }
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
  return (
    <>
      <Navbar home />
      <div className="homecontainer">
        <CricketBg id="section1">
          <TopDiv>
            <h3 style={{ color: '#FFFFFF', position: 'relative', whiteSpace: 'nowrap' }}>
              My Matches
            </h3>
            <ViewAll
              style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
              onClick={() => navigate(`/completed/${user?._id}`)}
            >
              View All
              <ArrowForwardIosIcon style={{ fontSize: '12px' }} />
            </ViewAll>
          </TopDiv>
          {pastLoading ? (
            <div className="loadContainer">
              {' '}
              <Loader />
              {' '}
            </div>
          ) : past?.length > 0 ? (
            past.map(
              (u) => u && (
                <div className='pastMatchContainer'>
                  <Grid container rowSpacing={2} columnSpacing={4} justifyContent="center">
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                      <div
                        className="matchcontainere"
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
                              fontSize: '12px',
                              fontWeight: '200',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ marginRight: '5px' }}>
                              {u?.away.code}
                            </span>
                            {' '}
                            vs
                            <span style={{ marginLeft: '5px' }}>
                              {u?.home.code}
                            </span>
                          </h5>
                          <NotificationAddOutlinedIcon
                            style={{ fontSize: '18px' }}
                          />
                        </Top>
                        <div className="match">
                          <div className="matchcenter">
                            <div className="matchlefts">
                              <img src={u?.teamAwayFlagUrl} alt="" width="40" />
                              <h5>{u?.away?.code}</h5>
                            </div>
                            <div
                              className={u?.result == 'Yes' ? 'completed' : 'time'}
                            >
                              {u?.result === 'Yes' && (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    <Dot />
                                    <h5 style={{ fontWeight: '200' }}>Completed</h5>
                                  </div>
                                  <p
                                    style={{
                                      color: '#5e5b5b',
                                      textTransform: 'auto',
                                      fontSize: '10px',
                                      marginTop: '2px',
                                      fontWeight: '200',
                                    }}
                                  >
                                    {getDisplayDate(u.date, 'i')}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="matchrights">
                              <h5>
                                {' '}
                                {u.home.code}
                              </h5>
                              <img src={u.teamHomeFlagUrl} alt="" width="40" />
                            </div>
                          </div>
                        </div>
                        <div
                          className="bottom"
                          style={{
                            position: 'relative',
                            padding: '6px 15px',
                            fontSize: '12px',
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
                            <GrMultimedia
                              className="reacticon"
                              style={{ fontSize: '16px', fontWeight: '200' }}
                            />
                            <SportsCricketOutlined
                              style={{
                                fontSize: '20px',
                                marginLeft: '5.1px',
                                fontWeight: '200',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ),
            )
          ) : (
            <div className="notfound">No results found :(</div>
          )}
        </CricketBg>
        {live?.length > 0 && (
          <div className="matches">
            <h3>Live Matches</h3>
            <AllMatches container rowSpacing={2} columnSpacing={4} justifyContent="center">
              {live.map((u) => (
                <Grid item sm={12} xs={12} lg={6} md={6}>
                  <Match u={u} live />
                </Grid>
              ))}
            </AllMatches>
          </div>
        )}
        <div className="upcomingmatches">
          <h3>Upcoming Matches</h3>
          <AllMatches container rowSpacing={2} columnSpacing={4} justifyContent="center">
            {!loading ? (
              upcoming?.length > 0 ? (
                <>
                  {upcoming.map((u) => (
                    <Grid item sm={12} xs={12} lg={6} md={6}>
                      <Match u={u} />
                    </Grid>
                  ))}
                </>
              ) : null
            ) : (
              <Loader />
            )}
          </AllMatches>
        </div>
      </div >
      <Bottomnav />
    </>
  );
}

export default Home;
