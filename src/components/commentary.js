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
import { URL, VIDEO_URL } from '../constants/userConstants';

const CommentaryContainer = styled.div`
  padding: 18px 0;
  height: 100%;
  overflow-y: auto;
  background: #f7fafd;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(44,62,80,0.06);
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(44,62,80,0.07);
  margin: 10px 18px;
  padding: 10px 16px;
  display: flex;
  align-items: flex-start;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(44,62,80,0.13);
  }
`;

const EventGif = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const Left = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 18px;
  min-width: 38px;
`;

const Event = styled.div`
  width: 32px;
  height: 32px;
  font-family: "Open Sans", sans-serif;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wicket = styled.p`
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background-color: var(--red);
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(225,0,0,0.10);
`;

const Four = styled.p`
  width: 28px;
  height: 28px;
  line-height: 28px;
  font-size: 15px;
  border-radius: 50%;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(44,62,80,0.10);
`;

const Des = styled.div`
  text-align: left;
  width: 100%;
  line-height: 22px;
  font-size: 15px;
  color: #222;
  font-family: "Open Sans", sans-serif;
`;

const Break = styled.div`
  margin: 18px 0 10px 0;
  padding: 10px 18px;
  background-color: #e3f2fd;
  border-radius: 10px;
  border: 1px solid #b3e5fc;
  box-shadow: 0 1px 4px rgba(44,62,80,0.05);
  h5 {
    margin: 0 0 6px 0;
    color: #1976d2;
    font-weight: 700;
    font-size: 16px;
  }
  p {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #1976d2;
    margin: 0 8px 0 0;
  }
`;

const BreakBot = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const VideoThumb = styled.video`
  width: 100%;
  max-height: 120px;
  border-radius: 8px;
  margin: 8px 0 0 0;
  box-shadow: 0 1px 8px rgba(44,62,80,0.10);
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(44,62,80,0.18);
  }
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
    <CommentaryContainer>
      <EventGif>
        {eventType === "four" && <img src="/four.gif" alt="Four" className="event-gif" />}
        {eventType === "six" && <img src="/six.gif" alt="Six" className="event-gif" />}
        {eventType === "wicket" && <img src="/wicket.gif" alt="Wicket" className="event-gif" />}
      </EventGif>
      {commentary?.map((p, idx) => (
        <div key={idx}>
          {p?.event === 'over-break' ? (
            <>
              <Break>
                <h5>
                  End of over {p?.overSeparator.overNum}
                </h5>
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
              <CommentCard>
                <Left>
                  {(p?.event === 'WICKET' || p?.event === 'over-break,WICKET' || p?.event === 'FOUR' || p?.event === 'SIX') &&
                    <Event>
                      {p?.event === 'WICKET' || p?.event === 'over-break,WICKET' ? (
                        <Wicket>W</Wicket>
                      ) : p?.event === 'FOUR' ? (
                        <Four>4</Four>
                      ) : p?.event === 'SIX' ? (
                        <Four>6</Four>
                      ) : null}
                    </Event>}
                  <span style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{p?.overNumber}</span>
                </Left>
                <Des>{p?.commText?.replace('$', '')}</Des>
              </CommentCard>
              {p.videoLink && (
                <VideoThumb controls muted>
                  <source src={`${VIDEO_URL}/mockvideos/${p.videoLink}`} type="video/mp4" />
                </VideoThumb>
              )}
            </>
          ) : (
            <>
              <CommentCard>
                <Left>
                  {(p?.event === 'WICKET' || p?.event === 'over-break,WICKET' || p?.event === 'FOUR' || p?.event === 'SIX') &&
                    <Event>
                      {p?.event === 'WICKET' ? (
                        <Wicket>W</Wicket>
                      ) : p?.event === 'FOUR' ? (
                        <Four>4</Four>
                      ) : p?.event === 'SIX' ? (
                        <Four>6</Four>
                      ) : null}
                    </Event>}
                  <span style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{p?.overNumber}</span>
                </Left>
                <Des>{p?.commText?.replace('$', '').replace('B0', '')}</Des>
              </CommentCard>
              {p.videoLink && (
                <VideoThumb controls muted>
                  <source src={`${VIDEO_URL}/mockvideos/${p.videoLink}`} type="video/mp4" />
                </VideoThumb>
              )}
            </>
          )}
        </div>
      ))}
      <Animate confetti={confetti} setConfetti={setConfetti} />
    </CommentaryContainer>
  );
}

export default Commentary;
