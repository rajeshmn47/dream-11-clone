import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import axios from "axios";
import styled from "@emotion/styled";
import Cracker from "./Cracker";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Animate from "./animate";
import { addconfetti, removeconfetti } from "../actions/userAction";
import db from "../firebase";
import { setDoc } from "firebase/firestore";
import { getDatabase, ref, push, set } from "firebase/database";
import {getkeys} from "../apikeys";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { URL } from "../constants/userConstants";

const CommentaryContainer = styled.div`
  padding: 15px;
  height: 100%;
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

export const AddCommentary = () => {
  const [matchIds, setMatchIds] = useState([]);
  useEffect(() => {
    async function getmatches() {
      const data = await axios.get(`${URL}/livematches`);
      for (let i = 0; i < data.data.matches.length; i++) {
        if (data.data.matches[i].cmtMatchId.length > 3) {
          console.log(data.data.matches[i].cmtMatchId, "id");
          const options = {
            method: "GET",
            url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${data.data.matches[i].cmtMatchId}/comm`,
            headers: {
              "X-RapidAPI-Key":
                "3ddef92f6emsh8301b1a8e1fd478p15bb8bjsnd0bb5446cadc",
              "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
            },
          };
          try {
            const washingtonRef = doc(
              db,
              "cities",
              data.data.matches[i].cmtMatchId
            );
            const response = await axios.request(options);
            const docRef = doc(db, "cities", data.data.matches[i].cmtMatchId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
            console.log(response.data.commentaryList);
            let a = response.data.commentaryList[0];
            if (docSnap?.data()?.capital) {
              await setDoc(washingtonRef, {
                capital: [...docSnap.data().capital, a],
              });
            } else {
              await setDoc(washingtonRef, {
                capital: [a],
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    getmatches();
  }, []);
  const handleSubmit = async () => {
    const options = {
      method: "GET",
      url: "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881/comm",
      headers: {
        "X-RapidAPI-Key": "f6c54e8046msh9ade928a37f126bp15dc9fjsnbdbaac07848f",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const washingtonRef = doc(db, "cities", "66397");
      const response = await axios.request(options);
      const docRef = doc(db, "cities", "DS");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      console.log(response.data.commentaryList);
      let a =
        response.data.commentaryList[response.data.commentaryList.length - 1];
      await setDoc(washingtonRef, {
        capital: [...docSnap.data().capital, a],
      });
    } catch (error) {
      console.error(error);
    }
    const docRef = doc(db, "cities", "DS");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    const washingtonRef = doc(db, "cities", "DS");
  };
  return (
    <>
      <CommentaryContainer>rajesh</CommentaryContainer>
      <Button onClick={() => handleSubmit()}>submit</Button>
    </>
  );
};

export default AddCommentary;
