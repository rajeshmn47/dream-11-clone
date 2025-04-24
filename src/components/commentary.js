import styled from '@emotion/styled';
import {
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addconfetti, removeconfetti } from '../actions/userAction';
import { db } from "../firebase"
import Animate from './animate';
import { URL } from '../constants/userConstants';

const CommentaryContainer = styled.div`
  padding: 15px 0;
  height: 100%;
  overflow-y: scroll;
  .event-gif {
    z-index : 10000;
  }
`;
const EventGif = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`
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

const Des = styled.div`
  text-align: left;
  width: 100%;
  line-height: 20px;
  line-break: break;
  font-size: 14px;
`;

const Wicket = styled.p`
  width: 18px;
  height: 18px;
  line-height: 20px;
  border-radius: 50%;
  background-color: var(--red);
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
  background-color: var(--black);
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

export function Commentary({ matchdata }) {
  const [commentary, setCommentary] = useState([]);
  const scrollit = useRef();
  const dispatch = useDispatch();
  const [confetti, setConfetti] = useState(false);
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    async function getdata() {
      if (matchdata.matchId) {
        const docRef = doc(db, 'commentary', matchdata.matchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        } else {
          // docSnap.data() will be undefined in this case
        }
        const unsub = onSnapshot(
          doc(db, 'commentary', matchdata?.matchId),
          (doc) => {
            if (doc.data()) {
              setCommentary([...doc.data().commentary.reverse()]);
            }
          },
        );
      }
    }
    getdata();
    // onSnapshot((docRef, "cities"), (snapshot) => {
    // let array = []; // Get users all recent talks and render that in leftColumn content
    // console.log(snapshot, "snaps");
    // });
  }, [matchdata]);

  useEffect(() => {
    if (commentary[0]?.event == 'SIX') {
      //dispatch(addconfetti());
      setEventType("six");
      setTimeout(() => {
        //dispatch(removeconfetti());
        setEventType("");
      }, 4000);
    } else if (commentary[0]?.event == 'FOUR') {
      setEventType("four");
      //dispatch(addconfetti());
      setTimeout(() => {
        //dispatch(removeconfetti());
        setEventType("");
      }, 4000);
    } else if (
      commentary[0]?.event == 'WICKET'
      || commentary[0]?.event == 'over-break,WICKET'
    ) {
      //dispatch(addconfetti());
      setEventType("wicket");
      setTimeout(() => {
        //dispatch(removeconfetti());
        setEventType("");
      }, 4000);
    }
  }, [commentary]);

  console.log(commentary, 'commentary')

  return (
    <CommentaryContainer container>
      <EventGif>
        {eventType === "four" && <img src="/four.gif" alt="Four" className="event-gif" />}
        {eventType === "six" && <img src="/six.gif" alt="Six" className="event-gif" />}
        {eventType === "wicket" && <img src="/wicket.gif" alt="Wicket" className="event-gif" />}
      </EventGif>
      {commentary?.map((p) => (
        <>
          {p?.event == 'over-break' ? (
            <>
              <Break>
                <h5>
                  End of over
                  {" "}{p?.overSeparator.overNum}
                </h5>
                <BreakBot>
                  <p>{p?.overSeparator.bowlNames[0]}</p>
                  <p>
                    {p?.overSeparator.runs}
                    {' '}
                    runs
                  </p>
                  <p>
                    {p?.overSeparator.bowlwickets}
                    {' '}
                    wickets
                  </p>
                  <p>{p?.overSeparator.batTeamName}</p>
                  <p>
                    {p?.overSeparator.score}
                    /
                    {p?.overSeparator.wickets}
                  </p>
                </BreakBot>
              </Break>
              <Comment ref={scrollit}>
                <Left>
                  <Event>
                    {p?.event == 'WICKET' || p?.event == 'over-break,WICKET' ? (
                      <Wicket>w</Wicket>
                    ) : p?.event == 'FOUR' ? (
                      <Four>4</Four>
                    ) : p?.event == 'SIX' ? (
                      <Four>6</Four>
                    ) : null}
                  </Event>
                  {p?.overNumber}
                </Left>
                <Des>{p?.commText?.replace('$', '')}</Des>
              </Comment>
              {p.videoLink &&
                <>
                  <video id="videoPlayer" width="100%" style={{maxHeight:'60px'}} controls muted={true}>
                    <source src={`${URL}/mockvideos/${p.videoLink}`} type="video/mp4" />
                  </video>
                </>}
            </>
          ) : (
            <>
              <Comment ref={scrollit}>
                <Left>
                  <Event>
                    {p?.event == 'WICKET' ? (
                      <Wicket>w</Wicket>
                    ) : p?.event == 'FOUR' ? (
                      <Four>4</Four>
                    ) : p?.event == 'SIX' ? (
                      <Four>6</Four>
                    ) : null}
                  </Event>
                  {p?.overNumber}
                </Left>
                <Des>{p?.commText?.replace('$', '').replace('B0', '')}</Des>
              </Comment>
              {p.videoLink &&
                <>
                  <video id="videoPlayer" width="100%" controls muted={true} style={{maxHeight:'200px'}}>
                    <source src={`${URL}/mockvideos/${p.videoLink}`} type="video/mp4" />
                  </video>
                </>}
            </>
          )}
        </>
      ))}
      <Animate confetti={confetti} setConfetti={setConfetti} />
    </CommentaryContainer>
  );
}

export default Commentary;
