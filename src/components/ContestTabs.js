import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FURL } from '../constants/userConstants';
import { leaderboardChanges } from '../utils/leaderboardchanges';

const ContestsContainer = styled(Grid)``;
const Tabel = styled.div`
  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  td,
  th {
    padding: 10px 10px;
    text-align: center;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    text-align: center;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 10px;
    font-family: "Open Sans";
    text-align: center;
  }
  #morewidth {
    width: 200px;
  }
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
  table,
  tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  img {
    width: 25px;
    margin-right: 5px;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 9px;
`;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0;
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
    color: var(--lightgreen) !important;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px !important;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px !important;
  }
  width: 100%;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
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
const Paragraph = styled.p`
  padding: 15px 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const Left = styled.div``;

const Right = styled.div``;

const LastPanel = styled.div``;

const Won = styled.div`
  color: var(--green);
  display: flex;
  align-items: center;
  font-size: 14px;
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
        <Box sx={{ p: 0 }}>
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

export default function ContestTabs({ contest, leaderboard, handleSwap }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  leaderboardChanges(leaderboard);
  const handleClick = (e, id) => {
    navigate(`/savedteam/${id}`);
  };

  return (
    <Container style={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Winnings" {...a11yProps(0)} />
        <Tab label="Leaderboard" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ContestsContainer container item sm={12} xs={12}>
          <First>
            <table>
              <tr>
                <th>Rank</th>
                <th>Winnings</th>
              </tr>
              {contest
                && contest.prizeDetails.map((p, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      ₹
                      {p.prize}
                    </td>
                  </tr>
                ))}
            </table>
          </First>
        </ContestsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>View all the teams after contest deadline</Paragraph>
        <LastPanel />
        <Tabel>
          <table>
            <tr>
              <th id="morewidth">
                All Teams (
                {leaderboard.length}
                )
              </th>
              <th>Points</th>
              <th>Rank</th>
            </tr>

            {leaderboard.length > 0
                && leaderboard
                  .sort((a, b) => b._doc.points - a._doc.points)
                  .map((f, index) => (
                    <tr
                      className={f._doc.userId === user?._id ? 'selected' : ''}
                      onClick={(e) => handleClick(e, f._doc._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ width: '200px !important' }} id="morewidth">
                        <Profile>
                          <img src={`${FURL}/profilepic.png`} alt="" />
                          <Name>
                            {f.user.username}
                            {' '}
                            (T
                            {f._doc.teamId}
                            )
                            <Won>
                              {match_details?.result == 'Complete' && (
                              <p
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {f._doc.userId == user._id ? (
                                  <>
                                    <span
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginRight: '6px',
                                      }}
                                    >
                                      {index < contest?.prizeDetails.length
                                          && match_details?.result
                                            == 'Complete' && (
                                            <>
                                              <EmojiEventsOutlinedIcon
                                                style={{
                                                  color:
                                                    'var(--green) !important',
                                                  fontSize: '16px',
                                                  marginTop: '3px',
                                                  marginRight: '5px',
                                                }}
                                              />
                                              you won
                                            </>
                                      )}
                                    </span>
                                    {' '}
                                    <span>
                                      {index < contest?.prizeDetails.length
                                          && `₹${
                                            contest?.prizeDetails[index].prize}`}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <EmojiEventsOutlinedIcon
                                      style={{
                                        color: 'var(--green) !important',
                                        fontSize: '16px',
                                        marginTop: '3px',
                                        marginRight: '5px',
                                      }}
                                    />
                                    <span>won</span>
                                    <span>
                                      {index < contest?.prizeDetails.length
                                          && contest?.prizeDetails[index].prize}
                                    </span>
                                  </>
                                )}
                              </p>
                              )}
                            </Won>
                          </Name>
                        </Profile>
                      </td>
                      <td>{f._doc.points}</td>
                      <td style={{ zIndex: 10 }}>
                        {f._doc.userId === user?._id && (
                          <SwapHorizIcon
                            onClick={(e) => handleSwap(e, f?._doc)}
                          />
                        )}
                      </td>
                      <td>
                        #
                        {index + 1}
                      </td>
                    </tr>
                  ))}
          </table>
        </Tabel>
      </TabPanel>
    </Container>
  );
}
