import styled from "@emotion/styled";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import SouthIcon from "@mui/icons-material/South";
import Slider from "@mui/material/Slider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { URL } from "../../constants/userConstants";

import { storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
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

export default function Deposit({ tabs, g, livescore }) {
  const [value, setValue] = React.useState(0);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
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
    amount: Yup.string().required("amount is required"),
    utr: Yup.string()
      .required("Utr is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
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
          `${URL}/getteam/?matchId=${id}&userid=${user._id}`
        );
        const joinedC = await axios.get(
          `${URL}/getjoinedcontest/${id}?userid=${user._id}`
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
          `${URL}/getteamsofcontest/${contest[0]?._id}`
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
    /** @type {any}*/
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          let data = {
            ...formData,
            userId:user._id,
            recieptUrl: downloadURL,
          };
          axios
            .post(`${URL}/payment/deposit`, {
              ...data,
            })
            .then((l) => {
              console.log("added to database", l);
              //alert.success("deposit data added successfully");
            });
        });
      }
    );
    //e.preventDefault();
  };

  console.log(contest, matchlive, "match_details");
  return (
    <>
      <Container>
        <Heading>deposit</Heading>
        <SubContainer>
          <Row>
            <Label>UPI :</Label>
            <Sub>7259293140@ybl</Sub>
            <Sub></Sub>
          </Row>
          <Row>
            <Label>Account Holder :</Label>
            <Sub>Rajesh M N</Sub>
            <Sub></Sub>
          </Row>
          <Row>
            <Label>Need Help? :</Label>
            <Sub></Sub>
            <Sub></Sub>
          </Row>
          <Image src="./phonepe.png" alt="" />
        </SubContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="depositForm">
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            variant="standard"
            fullWidth
            margin="dense"
            {...register("amount")}
            error={errors.amount ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.amount?.message}
          </Typography>
          <TextField
            required
            id="utr"
            name="utr"
            label="Unique Transaction Reference"
            variant="standard"
            fullWidth
            margin="dense"
            {...register("utr")}
            error={errors.utr ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.utr?.message}
          </Typography>
          <label for="file-upload" class="custom-file-upload">
            upload picture
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Note>
            IMPORTANT : After completing the Transaction Please backfill the UTR
            No (and Upload screenshot). If you don't backfill it, the deposit
            Transaction will not Complete. Please be sure to backfill UTR (and
            Upload proof)
          </Note>
          <Button
            variant="contained"
            type="submit"
            disableElevation
            style={{ backgroundColor: "#24B937" }}
          >
            Deposit
          </Button>
        </form>
      </Container>
    </>
  );
}
