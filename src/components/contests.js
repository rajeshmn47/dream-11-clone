import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import Tab from "@mui/material/Tab";
import "./home.css";
import "./create.css";
import { addconfetti, removeconfetti } from "../actions/userAction";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WestIcon from "@mui/icons-material/West";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { unstable_HistoryRouter } from "react-router-dom";
import SavedTeam from "./savedteam";
import { useSelector, useDispatch } from "react-redux";
import ReactCanvasConfetti from "react-confetti";
import BasicTabs from "./tabs";
import { URL } from "../constants/userConstants";
import db from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { getDoc } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Grid } from "@mui/material";
import { showName } from "../utils/name";
import { showBalls } from "../utils/lastballs";
import ShowOver from "./showover";

const TopContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  p {
    text-transform: capitalize;
    font-weight: 800;
    font-size: 14px;
    padding: 3px 0;
    color: #757272;
  }
  padding: 10px 10px;
  position: fixed;
  height: 160px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
`;

const GreenMark = styled.span`
  background-color: #1ca14d;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  margin-right: 6px;
`;
const Top = styled.div`
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 2px;
`;

const Bottom = styled.div`
  margin-top: 150px;
  z-index: 10;
`;
const LeftSide = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  .MuiTabs-indicator {
    background-color: #ec1801 !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: #000000 !important;
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

const Separator = styled.div`
  margin-top: 5px;
  height: 1px;
  background-color: #757272;
  width: 100%;
`;

const Batsman = styled.div`
  width: 170px;
  font-size: 12px;
  margin-right: 10px;
`;

const Bowler = styled.div`
  width: 140px;
  font-size: 12px;
`;
const Name = styled.h5`
  white-space: nowrap;
  font-size: 12px;
  width: 85px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const BowlTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-top: 1px;
`;

const BottomT = styled.div`
  display: flex;
  margin-top: 3px;
  justify-content:space-between;
`;
export const Contests = ({ players }) => {
  const [contests, setContests] = useState([]);
  const [match, setMatch] = useState(null);
  const dispatch = useDispatch();
  const [matchLive, setMatchLive] = useState(null);
  const { confetti } = useSelector((state) => state.user);
  const [commentary, setCommentary] = useState([]);
  const [livescore, setLivescore] = useState();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const showAnimation = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    async function getdata(m) {
      console.log(match, match?.cmtMatchId, "comment");
      if (match?.cmtMatchId) {
        console.log(m, "commentary");
        const docRef = doc(db, "cities", match.cmtMatchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        const unsub = onSnapshot(
          doc(db, "cities", match?.cmtMatchId),
          (doc) => {
            console.log("Current data: ", doc.data());
            if (doc.data()) {
              setCommentary([...doc.data().capital]);
              setLivescore({ ...doc.data().miniscore });
            }
          }
        );
      }
    }
    getdata(match);
    //onSnapshot((docRef, "cities"), (snapshot) => {
    // let array = []; // Get users all recent talks and render that in leftColumn content
    // console.log(snapshot, "snaps");
    //});
  }, [match]);
  console.log(livescore?.matchScoreDetails.inningsScoreList, "livescore");

  useEffect(() => {
    window.addEventListener("resize", showAnimation);
    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimensions]);
  const search = useLocation().search;
  let history = useNavigate();

  const { id } = useParams();
  console.log(id); //12345
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`${URL}/getcontests/${id}`);
      const matchdata = await axios.get(`${URL}/getmatch/${id}`);
      const matchlivedata = await axios.get(`${URL}/getmatchlive/${id}`);
      console.log(data, "contestdata");
      console.log(matchdata, matchlivedata, "match");
      setMatch(matchdata.data.match);
      setMatchLive(matchlivedata.data.match);
      setContests(data.data.contests);
    }
    getupcoming();
  }, [id]);
  return (
    <Container>
      <TopContainer>
        <Top>
          <LeftSide>
            <WestIcon
              onClick={() => history(-1)}
              style={{ cursor: "pointer" }}
            />
            {match && (
              <h1>
                {match.teamAwayCode} Vs {match.teamHomeCode}
              </h1>
            )}
          </LeftSide>
          <RightSide>
            <Brightness1Icon />
            <AccountBalanceWalletOutlinedIcon />
            <NotificationAddOutlinedIcon />
          </RightSide>
        </Top>
        {matchLive && (
          <>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item sm={4} xs={4} style={{ textAlign: "left" }}>
                {matchLive?.runFI && livescore?.matchScoreDetails && (
                  <>
                    <p
                      style={{
                        height: "15px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {matchLive.titleFI}
                    </p>
                    <p>
                      {livescore.matchScoreDetails.inningsScoreList[0]?.score}/
                      {livescore.matchScoreDetails.inningsScoreList[0]
                        ?.wickets || 0}
                      ({livescore.matchScoreDetails.inningsScoreList[0]?.overs})
                    </p>
                  </>
                )}
              </Grid>
              <Grid
                item
                sm={4}
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GreenMark></GreenMark>
                {matchLive.result == "Yes" ? "Completed" : "In Play"}
              </Grid>
              <Grid item sm={4} xs={4} style={{ textAlign: "right" }}>
                {matchLive?.runSI && livescore?.matchScoreDetails && (
                  <>
                    <p
                      style={{
                        height: "15px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      {matchLive.titleSI}
                    </p>
                    <p>
                      {" "}
                      {livescore.matchScoreDetails.inningsScoreList[1]?.score}/
                      {livescore.matchScoreDetails.inningsScoreList[1]
                        ?.wickets || 0}
                      ({livescore.matchScoreDetails.inningsScoreList[1]?.overs})
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
            <p style={{ textAlign: "center" }}>
              {matchLive?.status?.split("(11b rem)").join("")}
            </p>
          </>
        )}
        <Separator />
        <BottomT>
          <Batsman>
            <BowlTop>
              <Name>{showName(livescore?.batsmanStriker?.batName)}</Name>
              {livescore?.batsmanStriker?.batRuns}(
              {livescore?.batsmanStriker?.batBalls})
            </BowlTop>
            <BowlTop>
              <Name>{showName(livescore?.batsmanNonStriker?.batName)}</Name>
              {livescore?.batsmanNonStriker?.batRuns}(
              {livescore?.batsmanNonStriker?.batBalls})
            </BowlTop>
          </Batsman>
          <Bowler>
            <BowlTop>
              <Name>{showName(livescore?.bowlerStriker?.bowlName)}</Name>
              {livescore?.bowlerStriker?.bowlWkts}/
              {livescore?.bowlerStriker?.bowlRuns}(
              {livescore?.bowlerStriker?.bowlOvs})
            </BowlTop>
            <BowlTop>
              <ShowOver arr={livescore?.recentOvsStats} />
            </BowlTop>
          </Bowler>
        </BottomT>
      </TopContainer>
      <Bottom>
        <BasicTabs tabs={contests} id={id} g={match} />
      </Bottom>
    </Container>
  );
};

export default Contests;
