import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  font-family: "Open Sans" !important;
  padding: 5px 0;
`;

const Event = styled.div`
  padding-right: 30px;
  width: 45px;
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
  const [lastPong, setLastPong] = useState(null);
  console.log(matchdata.commentary, "iamcomment");

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("ponged", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("newcommentary", async (data) => {
      console.log(data, "new message");
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
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
    socket.on("newcommentary", async (data) => {
      console.log(data, "commentary");
    });
  }, [matchdata]);

  return (
    <>
      <div style={{ padding: "15px" }}>
        {matchdata.commentary?.map((p) => (
          <>
            <Comment>
              <Event>
                {p?.eventType == "wicket" ? (
                  <Wicket>w</Wicket>
                ) : p?.eventType == "four" ? (
                  <Four>4</Four>
                ) : null}
                {p?.overNum}
              </Event>
              <Des>{p?.comment_text.replace("$", "")}</Des>
            </Comment>
          </>
        ))}
      </div>
    </>
  );
};

export default Commentary;
