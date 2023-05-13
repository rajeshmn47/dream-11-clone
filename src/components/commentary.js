import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import Cracker from "./Cracker";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Animate from "./animate";
import { addconfetti, removeconfetti } from "../actions/userAction";
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
import { RemoveRedEyeSharp } from "@mui/icons-material";

const CommentaryContainer = styled.div`
  padding: 15px 0;
  height: 100%;
  overflow-y: scroll;
`;
const Left = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
`;
const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  font-family: "Open Sans" !important;
  padding: 5px 15px;
`;

const Event = styled.div`
  width: 30px;
  font-family: "Open Sans" !important;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Des = styled.p`
  text-align: left;
  width: 280px;
  line-height: 20px;
  line-break: break;
  font-size: 14px;
`;

const Wicket = styled.p`
  width: 18px;
  height: 18px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #ec1801;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: center;
  color: #ffffff;
`;

const Four = styled.p`
  width: 18px;
  height: 18px;
  line-height: 20px;
  font-size: 12px;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const Break = styled.div`
  padding: 4px 15px;
  background-color: #fafafa;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  p {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
`;

const BreakBot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Commentary = ({ matchdata }) => {
  const [commentary, setCommentary] = useState([]);
  const scrollit = useRef();
  const dispatch = useDispatch();
  const [launched, setLaunched] = useState(true);
  const [lastPong, setLastPong] = useState(null);
  const [confetti, setConfetti] = useState(false);
  console.log(commentary, "commentary");
  useEffect(() => {
    async function getdata(m) {
      console.log(matchdata, matchdata.cmtMatchId, "comment");
      if (matchdata.cmtMatchId) {
        console.log(m, "commentary");
        const docRef = doc(db, "cities", matchdata.cmtMatchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        const unsub = onSnapshot(
          doc(db, "cities", matchdata?.cmtMatchId),
          (doc) => {
            console.log("Current data: ", doc.data());
            if (doc.data()) {
              setCommentary([...doc.data().capital.reverse()]);
              console.log(commentary[0], "0");
              if (commentary[0].event == "SIX") {
                dispatch(addconfetti());
                setTimeout(() => {
                  dispatch(removeconfetti());
                }, 4000);
              } else if (commentary[0].event == "FOUR") {
                dispatch(addconfetti());
                setTimeout(() => {
                  dispatch(removeconfetti());
                }, 4000);
              } else if (
                commentary[0].event == "WICKET" ||
                commentary[0].event == "over-break,WICKET"
              ) {
                dispatch(addconfetti());
                setTimeout(() => {
                  dispatch(removeconfetti());
                }, 4000);
              }
            }
          }
        );
      }
    }
    getdata(matchdata);
    //onSnapshot((docRef, "cities"), (snapshot) => {
    // let array = []; // Get users all recent talks and render that in leftColumn content
    // console.log(snapshot, "snaps");
    //});
  }, [matchdata]);
  return (
    <>
      <CommentaryContainer>
        {commentary?.map((p) => (
          <>
            {p?.event == "over-break" ? (
              <>
                <Break>
                  <h5>End of over {p?.overSeparator.overNum}</h5>
                  <BreakBot>
                    <p>{p?.overSeparator.bowlNames[0]}</p>
                    <p>{p?.overSeparator.runs} runs</p>
                    <p>{p?.overSeparator.bowlwickets} wickets</p>
                    <p>{p?.overSeparator.batTeamName}</p>
                    <p>
                      {p?.overSeparator.score}/{p?.overSeparator.wickets}
                    </p>
                  </BreakBot>
                </Break>
                <Comment ref={scrollit}>
                  <Left>
                    <Event>
                      {p?.event == "WICKET" ||
                      p?.event == "over-break,WICKET" ? (
                        <Wicket>w</Wicket>
                      ) : p?.event == "FOUR" ? (
                        <Four>4</Four>
                      ) : p?.event == "SIX" ? (
                        <Four>6</Four>
                      ) : null}
                    </Event>
                    {p?.overNumber}
                  </Left>
                  <Des>{p?.commText?.replace("$", "")}</Des>
                </Comment>
              </>
            ) : (
              <Comment ref={scrollit}>
                <Left>
                  <Event>
                    {p?.event == "WICKET" ? (
                      <Wicket>w</Wicket>
                    ) : p?.event == "FOUR" ? (
                      <Four>4</Four>
                    ) : p?.event == "SIX" ? (
                      <Four>6</Four>
                    ) : null}
                  </Event>
                  {p?.overNumber}
                </Left>
                <Des>{p?.commText?.replace("$", "")}</Des>
              </Comment>
            )}
          </>
        ))}
        <Animate confetti={confetti} setConfetti={setConfetti} />
      </CommentaryContainer>
    </>
  );
};

export default Commentary;
