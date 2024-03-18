import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../actions/userAction';
import { URL } from '../../constants/userConstants';

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

export default function AWithdrawal({ tabs, g, livescore }) {
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
  console.log(contest, matchlive, 'match_details');
  return (
    <Container style={{ zIndex: '1' }} />
  );
}
