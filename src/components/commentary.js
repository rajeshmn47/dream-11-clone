import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import { Konfettikanone } from "react-konfettikanone";
import Cracker from "./Cracker";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Animate from "./animate";
import { addconfetti, removeconfetti } from "../actions/userAction";

const CommentaryContainer = styled.div`
  padding: 15px;
  height: 200px;
  overflow-y: scroll;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  font-family: "Open Sans" !important;
  padding: 5px 0;
`;

const Event = styled.div`
  padding-right: 20px;
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

export const Commentary = ({ matchdata }) => {
  const socket = io.connect("http://localhost:4000");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [commentary, setCommentary] = useState([]);
  const scrollit = useRef();
  const dispatch = useDispatch();
  const [launched, setLaunched] = useState(true);
  const [lastPong, setLastPong] = useState(null);
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    setCommentary([...matchdata.commentary.slice(0, 10)]);
  }, []);
  useEffect(() => {
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("ponged", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("newcommentary", async (data) => {
      addcommentary({ ...data.commentary });
      console.log(data.commentary.eventType, data.commentary, "newcommentary");
      if (
        data.commentary.eventType == "wicket" ||
        data.commentary.eventType == "four" ||
        data.commentary.eventType == "six"
      ) {
        console.log("confetti");
        dispatch(addconfetti());
        setTimeout(() => {
          dispatch(removeconfetti());
        }, 13000);
      }
    });
    return () => {
      console.log("rajesh left component");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.emit("leave", {
        matchid: matchdata.matchId,
      });
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
      setIsConnected(true);
      if (matchdata.matchId) {
        socket.emit("join", {
          matchid: matchdata.matchId,
        });
      }
    });
  }, [matchdata]);

  const addcommentary = (value) => {
    let a = [];
    a.push(...commentary);
    a.push(value);
    console.log(a, "antara");
    setCommentary((commentary) => [value, ...commentary]);
    let url = "./notifications.mp3";
    let audio = new Audio(url);
    audio.play();
  };

  return (
    <>
      <CommentaryContainer>
        {commentary?.map((p) => (
          <>
            <Comment ref={scrollit}>
              <Event>
                {p?.eventType == "wicket" ? (
                  <Wicket>w</Wicket>
                ) : p?.eventType == "four" ? (
                  <Four>4</Four>
                ) : null}
                {p?.overNum}
              </Event>
              <Des>{p?.comment_text?.replace("$", "")}</Des>
            </Comment>
          </>
        ))}
        <Animate confetti={confetti} setConfetti={setConfetti} />
      </CommentaryContainer>
    </>
  );
};

export default Commentary;
