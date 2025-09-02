import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { URL } from '../../constants/userConstants';
import { storage } from '../../firebase';

const PanelBox = styled(Box)`
 @media(max-width: 600px) {
       .MuiBox-root {
         padding: 0 0 !important;
       }
     }
       `

const Container = styled.div`
  padding: 15px 15px;
  background-color: #efefef;
  height: 950px;
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

const InfoBox = styled(Box)`
  background-color: #f4f6f8;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const UploadInput = styled.input`
  display: none;
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

export default function Deposit({ tabs, g, livescore }) {
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
  const [file, setFile] = useState(null);
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('amount is required'),
    utr: Yup.string()
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
  const navigate = useNavigate();

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
  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    const storag = getStorage();
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const data = {
            ...formData,
            userId: user._id,
            recieptUrl: downloadURL,
          };
          axios
            .post(`${URL}/payment/deposit`, {
              ...data,
            })
            .then((l) => {
              console.log('added to database', l);
              // alert.success("deposit data added successfully");
            });
        });
      },
    );
    // e.preventDefault();
  };

  console.log(contest, matchlive, 'match_details');
  return (
    <PanelBox
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 4 }}
    >
      <Card sx={{ width: "100%", maxWidth: 480, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Deposit
          </Typography>

          {/* UPI Info Section */}
          <InfoBox>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Typography variant="body2" fontWeight="bold">
                  UPI ID:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2">7259293140@ybl</Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" fontWeight="bold">
                  Account Holder:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2">Rajesh M N</Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" fontWeight="bold">
                  Need Help?:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" color="primary">
                  Contact Support
                </Typography>
              </Grid>
            </Grid>
          </InfoBox>

          <Box display="flex" justifyContent="center" mb={2}>
            <img src="./phonepe.png" alt="PhonePe" style={{ width: 160 }} />
          </Box>

          {/* Deposit Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Amount"
              placeholder="Enter deposit amount"
              variant="outlined"
              margin="normal"
              {...register("amount")}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />

            <TextField
              fullWidth
              label="Unique Transaction Reference (UTR)"
              placeholder="Enter UTR number"
              variant="outlined"
              margin="normal"
              {...register("utr")}
              error={!!errors.utr}
              helperText={errors.utr?.message}
            />

            {/* File Upload */}
            <Box mt={2} mb={2}>
              <label htmlFor="file-upload">
                <UploadInput
                  id="file-upload"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ py: 1.2, borderRadius: 2 }}
                >
                  Upload Screenshot
                </Button>
              </label>
            </Box>

            {/* Warning Note */}
            <Alert severity="warning" sx={{ fontSize: 13, mb: 2 }}>
              IMPORTANT: After completing the transaction, please enter the UTR
              number and upload the screenshot. If you don’t, your deposit will
              not be processed.
            </Alert>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              size="large"
              style={{
                marginTop: 18,
                fontSize: 16,
                borderRadius: 8,
                fontWeight: 700,
                width: "100%",
                background: "var(--red)",
                color: "#fff"
              }}
            >
              Deposit
            </Button>
          </form>
        </CardContent>
      </Card>
    </PanelBox>
  );
}
