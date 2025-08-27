import styled from '@emotion/styled';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../actions/userAction';
import { FURL, URL } from '../../constants/userConstants';
import {
  checkar,
  checkwk,
  getImgurl,
} from '../../utils/img_url';
import Loader from '../loader';
import Announced from './Announced';

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
`;
const Contest = styled.div`
a{
  text-decoration:none;
}
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
  .MuiTabs-flexContainer {
    justify-content: space-between !important;
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
  background-color: var(--green);
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
`;

const PlayersList = styled.div`
  padding: 0 0;
  height: 400px;
  overflow-y: auto;
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
  border-bottom: 1px solid #e7e7e7;
  border-left: none;
  border-right: none;
  padding: 0px 0;
`;

const AddButton = styled.button`
  color: #fff;
  background: var(--green);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(44,62,80,0.10);
  transition: background 0.2s;
  &:disabled {
    background: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled(AddButton)`
  background: var(--red);
`;

const NoLineups = styled.h3`
  color: var(--red);
  padding: 0 10px;
  text-align: center;
  height: 100px;
  margin-top: 15px;
`;

const Center = styled.div`
  display: flex;
  p {
    margin-top: 5px;
    font-size: 10px;
    color: #060667;
  }
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  h1 {
    text-align: left;
    font-size: 14px !important;
  }
  a{
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
`;

const BlueDot = styled.span`
  background-color: var(--green) !important;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
`;

const RedDot = styled.span`
  background-color: red !important;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
`;
const Points = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const ImgCtr = styled.div`
  position: relative;
  text-transform: uppercase;
  padding-top: 10px;
  img {
    display: block;
    width: 70px !important;
  }
`;
const Home = styled.div`
  position: absolute;
  bottom: 2px;
  left: 2px;
  background-color: #d6d6d6;
  color: var(--black);
  height: 10px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 3px;
`;
const Away = styled.div`
  background-color: var(--black);
  color: var(--white);
  position: absolute;
  bottom: 2px;
  left: 2px;
  height: 10px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 3px;
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

export default function LiveCategoryTabs({
  id,
  players,
  match,
  setPlayers,
  nonPlayers,
  loading,
}) {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getplayers() {
      if (user?._id && match) {
        const data = await API.get(
          `${URL}/getteam/${match?.teamHomeName}/${match?.teamAwayName}`,
        );
        const contestdata = await API.get(`${URL}/getcontestsofuser/${id}`);
        setContest(contestdata.data.contests);
      }
    }
    getplayers();
  }, [user, match]);

  useEffect(() => {
    async function getplayers() {
      if (user?._id) {
        const data = await API.get(`${URL}/getteam/?matchId=${id}`);
        setTeam(data.data.team);
        const contestdata = await API.get(`${URL}/getcontestsofuser/${id}`);
        setContest(contestdata.data.contests);
      }
    }
    getplayers();
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    console.log('stillitis clicked');
    setModal(i);
    setOpen(true);
  };
  const handleClose = () => {
    console.log('handleopenclose');
    setOpen(false);
  };
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

  return (
    <Contest>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant='scrollable'
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab
              label={`WK(${players.filter((p) => checkwk(p.position) && p.isSelected)
                .length
                })`}
              {...a11yProps(0)}
            />
            <Tab
              label={`BAT(${players.filter((p) => (p.position === 'batsman' || p.position === 'batter') && p.isSelected)
                .length
                })`}
              {...a11yProps(1)}
            />
            <Tab
              label={`AR(${players.filter((p) => checkar(p.position) && p.isSelected)
                .length
                })`}
              {...a11yProps(2)}
            />
            <Tab
              label={`BOW(${players.filter((p) => p.position === 'bowler' && p.isSelected)
                .length
                })`}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        {!loading ? (
          <>
            <TabPanel value={value} index={0}>
              <PlayersList>
                <>
                  <Announced title="Announced" />
                  {players.length > 0 ? (
                    players
                      .filter((p, index) => checkwk(p.position))
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <BlueDot />
                            <Link to={`../player/${p.playerId}`} style={{ whiteSpace: 'nowrap' }}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                  <Announced title="Unannounced" />
                  {nonPlayers.length > 0 ? (
                    nonPlayers
                      .filter((p, index) => checkwk(p.position))
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <RedDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PlayersList>
                <>
                  <Announced title="Announced" />
                  {players.length > 0 ? (
                    players
                      .filter(
                        (p, index) => p.position === 'batsman' || p.position == 'batsmen' || p.position === 'batter',
                      )
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${FURL}/player_logo.jpeg`; // fallback image in your public folder
                              }}
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center className='playerNameContainer'>
                            <BlueDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}a</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
                <>
                  <Announced title="Unannounced" />
                  {nonPlayers.length > 0 ? (
                    nonPlayers
                      .filter(
                        (p, index) => p.position === 'batsman' || p.position == 'batsmen' || p.position == "batter",
                      )
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${FURL}/player_logo.jpeg`; // fallback image in your public folder
                              }}
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <RedDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PlayersList>
                <>
                  <Announced title="Announced" />
                  {players.length > 0 ? (
                    players
                      .filter((p) => checkar(p.position))
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${FURL}/player_logo.jpeg`; // fallback image in your public folder
                              }}
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <BlueDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                  <Announced title="Unannounced" />
                  {nonPlayers.length > 0 ? (
                    nonPlayers
                      .filter((p) => checkar(p.position))
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${FURL}/player_logo.jpeg`; // fallback image in your public folder
                              }}
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <RedDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PlayersList>
                <>
                  <Announced title="Announced" />
                  {players.length > 0 ? (
                    players
                      .filter((p) => p.position === 'bowler')
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <BlueDot />
                            <Link to={`..
                            
                            
                            /player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                  <Announced title="Unannounced" />
                  {nonPlayers.length > 0 ? (
                    nonPlayers
                      .filter((p) => p.position === 'bowler')
                      .map((p) => (
                        <EachPlayer
                          className={p.isSelected ? 'selected' : 'notselected'}
                        >
                          <ImgCtr>
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${p.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                              alt=""
                            />
                            {p.isHome ? (
                              <Home>{p.code}</Home>
                            ) : (
                              <Away>{p.code}</Away>
                            )}
                          </ImgCtr>
                          <Center>
                            <RedDot />
                            <Link to={`../player/${p.playerId}`}>{p.playerName}</Link>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton onClick={() => handleRemove(p._id)}>
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p._id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? 'disabled'
                                  : 'notdisabled'
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </Contest>
  );
}
