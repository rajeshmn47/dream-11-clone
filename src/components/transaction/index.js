import './deposit.css';

import styled from '@emotion/styled';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { URL } from '../../constants/userConstants';
import Navbar from '../navbar';
import Bottomnav from '../navbar/bottomnavbar';
import Deposit from './deposit';
import Withdraw from './withdraw';

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
  .Mui-selected {
    background-color: #efefef;
  }
  .css-aym9vq-MuiButtonBase-root-MuiTab-root {
    flex-direction: row;
    min-height: 38px;
    padding: 8px 5px;
  }
  .css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root {
    display: none;
  }
  .MuiTabs-indicator {
    top: 0;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0 0 20px;
  text-transform: capitalize;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.58);
  padding: 5px 0 20px 10px;
  margin: 0 !important;
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
  background-color: #fef4de;
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

export default function TransactionTabs({ tabs, g, livescore }) {
  const { state } = useLocation();
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
    if (state?.tab == 'withdrawal') {
      setValue(1);
    }
  }, [state]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    if (
      !(matchlive?.result == 'In Progress' || matchlive?.result == 'Complete')
    ) {
      if (!team?.length > 0) {
        setValue(2);
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

  const handlejoin = async (t) => {
    console.log('join contest');
    const joinedC = await axios.get(
      `${URL}/getjoinedcontest/${id}?userid=${user._id}`,
    );
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    alert.success('contest joined successfully');
    setSelectTeams({ selected: false, team: t });
  };

  const loadjoined = async (t) => {
    console.log('join contest');
    const joinedC = await axios.get(
      `${URL}/getjoinedcontest/${id}?userid=${user._id}`,
    );
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    setSelectTeams({ selected: false, team: t });
  };
  console.log(contest, matchlive, 'match_details');
  return (
    <>
      <Navbar />
      <Container style={{ zIndex: '1' }}>
        <Title>transfer online</Title>
        <Box sx={{ width: '100%' }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              <Tab
                icon={<AccountBalanceIcon style={{ margin: '0 5px' }} />}
                label="Deposit"
                {...a11yProps(0)}
              />

              <Tab
                icon={<AccountBalanceIcon style={{ margin: '0 5px' }} />}
                label="Withdrawal"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Deposit />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Withdraw />
          </TabPanel>
        </Box>
      </Container>
      <Bottomnav />
    </>
  );
}
