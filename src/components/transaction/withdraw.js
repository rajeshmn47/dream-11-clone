import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { URL } from '../../constants/userConstants';

const Container = styled.div`
  padding: 15px 15px;
  background-color: #efefef;
  height: 290px;
`;

const SubContainer = styled.div`
  padding: 15px 15px;
`;

const Label = styled.label`
  font-weight: 700;
  width: 130px;
  float: left;
  text-align: right;
  margin-right: 5px;
  font-size: 14px;
  font-weight: 700;
`;
const Row = styled.div``;
const Sub = styled.span`
  font-size: 14px;
`;

const Image = styled.img`
  max-width: 100%;
  margin: 5px 0;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 17px;
  margin: 0 0 20px;
  margin-bottom: 20px;
  line-height: 26px;
  text-transform: capitalize;
  border-bottom: 1px solid rgba(15, 35, 39, 0.4);
  padding: 10px 0 9.5px;
`;

const Note = styled.p`
  color: #fe0000;
  font-size: 12px;
`;

const TabP = styled(TabPanel)`
  .MuiBox-root {
    padding: 0 0 !important;
  }
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

export default function Withdraw({ tabs, g, livescore }) {
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
  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('amount is required'),
    upiId: Yup.string()
      .required('Utr is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    async function getplayers() {
      if (user?._id && id) {
        const data = await axios.get(
          `${URL}/getteam/?matchId=${id}&userid=${user._id}`,
        );
        const joinedC = await axios.get(
          `${URL}/getjoinedcontest/${id}?userid=${user._id}`,
        );
        leaderboardChanges(joinedC.data.contests);
        setContest([...joinedC.data.contests]);
        setTeam([...data.data.team]);
      }
    }
    getplayers();
  }, [user, id]);
  useEffect(() => {
    async function getteams() {
      if (contest[0]?._id) {
        const teamdata = await axios.get(
          `${URL}/getteamsofcontest/${contest[0]?._id}`,
        );
        setLeaderboard(teamdata.data.teams);
      }
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
  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    /** @type {any} */

    axios
      .post(`${URL}/payment/withdraw`, { ...formData, userId: user._id })
      .then((l) => {
        console.log('added to database', l);
        // alert.success("deposit data added successfully");
      });
    // e.preventDefault();
  };

  console.log(contest, matchlive, 'match_details');
  return (
    <Container>
      <Heading> Withdraw</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="withdrawForm">
        <TextField
          required
          id="amount"
          name="amount"
          label="Amount"
          variant="standard"
          fullWidth
          margin="dense"
          {...register('amount')}
          error={!!errors.amount}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.amount?.message}
        </Typography>
        <TextField
          required
          id="upiId"
          name="upiId"
          label="UPI ID"
          variant="standard"
          fullWidth
          margin="dense"
          {...register('upiId')}
          error={!!errors.utr}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.upiId?.message}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          style={{ backgroundColor: '#24B937' }}
        >
          Withdraw
        </Button>
      </form>
    </Container>
  );
}
