import React from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SouthIcon from '@mui/icons-material/South';
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
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
import styled from "@emotion/styled";

const Card = styled(Grid)`
margin-left:-16px !important;
`

export default function MyContestsTab({ contest, matchlive, navigate, setValue }) {
  return (
    <ContestsContainer container spacing={2} justifyContent="center">
      {contest.length > 0 ? (
        contest.map((tab) => {
          const spotsFilled = tab?.contest?.totalSpots - tab?.contest?.spotsLeft;
          const spotsPercent = Math.round((spotsFilled / tab?.contest?.totalSpots) * 100);
          const isAlmostFull = tab?.contest?.spotsLeft <= 5;
          return (
            <Card item md={12} lg={12} sm={12} xs={12}
              key={tab.contest._id}
              onClick={() => navigate(`/contestdetail/${tab.contest._id}`, {
                state: { match_details: matchlive },
              })}
            >
              <div
                style={{
                  border: isAlmostFull ? "2px solid var(--red)" : "1px solid #eee",
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 4px 16px rgba(44,62,80,0.08)",
                  transition: "box-shadow 0.2s, border 0.2s",
                  position: "relative",
                  overflow: "hidden",
                  padding: 20,
                  marginBottom: 16,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", fontWeight: 600, fontSize: 18 }}>
                    <MonetizationOnOutlinedIcon style={{ color: "var(--red)", marginRight: 4 }} />
                    ₹{tab?.contest?.price}
                  </span>
                  <span style={{ fontWeight: 500, fontSize: 15 }}>
                    Entry&nbsp;<b>₹{Math.floor(tab?.contest?.price / tab?.contest?.totalSpots)}</b>
                  </span>
                </div>
                <div style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
                  <PeopleAltOutlinedIcon fontSize="small" />
                  <span style={{ fontWeight: 500 }}>{tab?.contest?.totalSpots} spots</span>
                  <span style={{
                    color: isAlmostFull ? "var(--red)" : "#888",
                    fontWeight: 600,
                    marginLeft: "auto"
                  }}>
                    {tab?.contest?.spotsLeft} left
                  </span>
                </div>
                <Slider
                  value={spotsFilled}
                  min={0}
                  max={tab?.contest?.totalSpots}
                  disabled
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    '.MuiSlider-thumb': { display: 'none' },
                    '.MuiSlider-track': { background: 'var(--green)' },
                    '.MuiSlider-rail': { background: '#eee' }
                  }}
                />
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12
                }}>
                  <span style={{ fontSize: 13, color: "#888" }}>
                    {spotsPercent}% filled
                  </span>
                  <span style={{
                    background: "#f7f7f7",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 13,
                    color: "#444",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <EmojiEventsOutlinedIcon fontSize="small" style={{ marginRight: 4 }} />
                    {tab.contest.prizeDetails.length} Winners
                  </span>
                </div>
                {/* Teams and status */}
                <div style={{ marginTop: 16 }}>
                  {tab.teams.map((t) => (
                    <div key={t.teamId} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #f0f0f0"
                    }}>
                      <div style={{ flex: 2 }}>
                        <div style={{ fontWeight: 600 }}>{t?.username}</div>
                        {matchlive?.result === 'Complete' ? (
                          <div style={{ color: 'var(--green)', fontSize: 12 }}>
                            you won ₹{t.won}
                          </div>
                        ) : (
                          <div style={{ color: 'var(--green)', fontSize: 12 }}>
                            IN WINNING ZONE
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, textAlign: "center" }}>T{t?.teamId}</div>
                      <div style={{ flex: 1, textAlign: "center" }}>{t?.points}</div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>
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
                              color: 'var(--red)',
                              fontSize: '18px',
                              marginLeft: '5px',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Almost Full Badge */}
                {isAlmostFull && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "var(--red)",
                    color: "#fff",
                    padding: "4px 12px",
                    borderBottomLeftRadius: 12,
                    fontWeight: 700,
                    fontSize: 13
                  }}>
                    Almost Full!
                  </div>
                )}
              </div>
            </Card>
          );
        })
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