import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SouthIcon from '@mui/icons-material/South';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Grid } from "@mui/material";
import {
  ContestsContainer,
  ContestContainerJ,
  ContestJ,
  LastJ,
  First,
  StatusC,
  SpotsLeft,
  SpotsRight,
  NoContests,
  JoincontestBtn,
  M,
  C,
  F
} from "./ContestStyles";
import { FURL } from "../constants/userConstants";

export default function MyContestsTab({ contest, matchlive, navigate, setValue }) {
  return (
    <ContestsContainer container spacing={2} justifyContent="center">
      {contest.length > 0 ? (
        contest.map((tab) => (
          <Grid item md={4} lg={4} sm={12} xs={12}
            key={tab.contest._id}
            onClick={() => navigate(`/contestdetail/${tab.contest._id}`, {
              state: {
                match_details: matchlive,
              },
            })}
          >
            <ContestContainerJ item md={6} lg={6} sm={12} xs={12}
              onClick={() => navigate(`/contestdetail/${tab.contest._id}`, {
                state: {
                  match_details: matchlive,
                },
              })}
            >
              <ContestJ>
                <First>
                  <div>
                    <p>Prize Pool</p>
                    ₹{tab?.contest?.price}
                  </div>
                  <div>
                    <p>spots</p>
                    <p>{Math.floor(tab?.contest?.totalSpots)}</p>
                  </div>
                  <div>
                    <p>Entry</p>
                    <p>
                      ₹{Math.floor(tab?.contest?.price / tab?.contest?.totalSpots)}
                    </p>
                  </div>
                  {matchlive?.result === 'Complet' && (
                    <h5
                      style={{
                        color: 'var(--green)',
                        fontFamily: 'OpenSans',
                      }}
                    >
                      u won {tab?.team?.won} rs!
                    </h5>
                  )}
                </First>
              </ContestJ>
              <LastJ>
                <div>
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    <F>1st</F> {tab.contest.prizeDetails[0].prize}
                  </p>
                </div>
                <First>
                  <EmojiEventsOutlinedIcon />
                  {' '}
                  {Math.floor((5 / tab.contest.totalSpots) * 100)}%
                </First>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <M>m</M>
                  <C>c</C>
                </div>
              </LastJ>
              {tab.teams.map((t) => (
                <StatusC key={t.teamId}>
                  <SpotsLeft>
                    {t?.username}
                    {matchlive?.result === 'Complete' ? (
                      <p style={{ color: 'var(--green)', fontSize: '12px' }}>
                        you won ₹{t.won}
                      </p>
                    ) : (
                      <p style={{ color: 'var(--green)', fontSize: '12px' }}>
                        IN WINNING ZONE
                      </p>
                    )}
                  </SpotsLeft>
                  <SpotsLeft>
                    T{t?.teamId}
                  </SpotsLeft>
                  <SpotsLeft>{t?.points}</SpotsLeft>
                  <SpotsRight style={{ display: 'flex', alignItems: 'center' }}>
                    #{t?.rank}
                    {t?.rank < tab?.contest?.prizeDetails?.length ? (
                      <ArrowUpwardIcon
                        style={{
                          color: 'var(--green)',
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      />
                    ) : (
                      <SouthIcon
                        style={{
                          color: 'red',
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      />
                    )}
                  </SpotsRight>
                </StatusC>
              ))}
            </ContestContainerJ>
          </Grid>
        ))
      ) : (
        <NoContests>
          <p> you have not joined a contest yet!</p>
          <img src={`${FURL}/contest.png`} alt="" />
          <p>What are you waiting for?</p>
          <JoincontestBtn onClick={() => setValue(0)}>
            join a contest
          </JoincontestBtn>
        </NoContests>
      )}
    </ContestsContainer>
  );
}