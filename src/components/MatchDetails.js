import "./home.css";
import "./create.css";

import styled from "@emotion/styled";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import WestIcon from "@mui/icons-material/West";
import { Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { getDatabase, onValue, ref } from "firebase/database";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactCanvasConfetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import {
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getmatch } from "../actions/matchAction";
import { addconfetti, removeconfetti } from "../actions/userAction";
import { URL } from "../constants/userConstants";
import db from "../firebase";
import { showBalls } from "../utils/lastballs";
import { showName } from "../utils/name";
import Bottomnav from "./navbar/bottomnavbar";
import MatchTabs from "./MatchTabs";
import SavedTeam from "./savedteam";
import ShowOver from "./showover";
import Steppr from "./stepper";

const TopContainer = styled.div`
  background-color: var(--black);
  color: #ffffff;
  p {
    text-transform: capitalize;
    font-weight: 800;
    font-size: 14px;
    padding: 3px 0;
    color: #757272;
  }
  padding: 10px 20px;
  position: fixed;
  height: 160px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
`;

const GreenMark = styled.span`
  background-color: var(--green);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  margin-right: 6px;
`;
const Top = styled.div`
  background-color: var(--black);
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
  width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 140px;
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
  justify-content: space-between;
`;
export function MatchDetails({ players }) {
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [contests, setContests] = useState([]);
  const dispatch = useDispatch();
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
      if (match_details?.matchId) {
        const docRef = doc(db, "commentary", match_details.matchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        } else {
          // docSnap.data() will be undefined in this case
        }
        const unsub = onSnapshot(
          doc(db, "commentary", match_details?.matchId),
          (doc) => {
            if (doc.data()) {
              console.log(doc.data(), "data");
              setCommentary([...doc.data().capital]);
              setLivescore({ ...doc.data().miniscore });
            }
          }
        );
      }
    }
    getdata(match_details);
    // onSnapshot((docRef, "cities"), (snapshot) => {
    // let array = []; // Get users all recent talks and render that in leftColumn content
    // console.log(snapshot, "snaps");
    // });
  }, [match_details]);

  useEffect(() => {
    window.addEventListener("resize", showAnimation);
    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimensions]);
  const { search } = useLocation();
  const history = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    async function getupcoming() {
      if (id?.length > 3) {
        dispatch(getmatch(id));
        const data = await axios.get(`${URL}/getcontests/${id}`);
        setContests(data.data.contests);
      }
    }
    getupcoming();
  }, [id]);
  return (
    <Container>
      <>
        <TopContainer>
          <Top>
            <LeftSide>
              <WestIcon
                onClick={() => history(-1)}
                style={{ cursor: "pointer" }}
              />
              {match_details && (
                <h1>
                  {match_details.teamAwayCode} Vs {match_details.teamHomeCode}
                </h1>
              )}
            </LeftSide>
            <RightSide>
              <Brightness1Icon />
              <AccountBalanceWalletOutlinedIcon />
              <NotificationAddOutlinedIcon />
            </RightSide>
          </Top>
          {matchlive?.runFI && livescore?.matchScoreDetails && (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sm={4} xs={4} style={{ textAlign: "left" }}>
                  <p
                    style={{
                      height: "15px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {matchlive.titleFI}
                  </p>
                  <p>
                    {livescore.matchScoreDetails.inningsScoreList[0]?.score}/
                    {livescore.matchScoreDetails.inningsScoreList[0]?.wickets ||
                      0}
                    ({livescore.matchScoreDetails.inningsScoreList[0]?.overs})
                  </p>
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
                  <GreenMark />
                  {matchlive.result == "Complete" ? "Completed" : "In Play"}
                </Grid>
                <Grid item sm={4} xs={4} style={{ textAlign: "right" }}>
                  {matchlive?.runSI && livescore?.matchScoreDetails && (
                    <>
                      <p
                        style={{
                          height: "15px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        {matchlive.titleSI}
                      </p>
                      <p>
                        {" "}
                        {livescore.matchScoreDetails.inningsScoreList[1]?.score}
                        /
                        {livescore.matchScoreDetails.inningsScoreList[1]
                          ?.wickets || 0}
                        (
                        {livescore.matchScoreDetails.inningsScoreList[1]?.overs}
                        )
                      </p>
                    </>
                  )}
                </Grid>
              </Grid>
              <p
                style={{
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {matchlive?.status?.split("(11b rem)").join("")}
              </p>
              <Separator />
              <BottomT>
                <Batsman>
                  <BowlTop>
                    <Name>{showName(livescore?.batsmanStriker?.batName)}</Name>
                    {livescore?.batsmanStriker?.batRuns}(
                    {livescore?.batsmanStriker?.batBalls})
                  </BowlTop>
                  <BowlTop>
                    <Name>
                      {showName(livescore?.batsmanNonStriker?.batName)}
                      ()
                    </Name>
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
            </>
          )}
        </TopContainer>
        <Bottom>
          <MatchTabs
            tabs={contests}
            id={id}
            g={match_details}
            livescore={livescore}
          />
        </Bottom>
      </>
    </Container>
  );
}

export default MatchDetails;
