import React from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

export default function ContestContainerN({
  price,
  entryFee,
  totalSpots,
  spotsLeft,
  numWinners,
  onJoin,
  isAlmostFull,
  onClick,
  children,
}) {
  const spotsFilled = totalSpots - spotsLeft;
  const spotsPercent = Math.round((spotsFilled / totalSpots) * 100);

  return (
    <div
      onClick={onClick}
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
          ₹{price}
        </span>
        <span style={{ fontWeight: 500, fontSize: 15 }}>
          Entry&nbsp;<b>₹{entryFee}</b>
        </span>
      </div>
      <div style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <PeopleAltOutlinedIcon fontSize="small" />
        <span style={{ fontWeight: 500 }}>{totalSpots} spots</span>
        <span style={{
          color: isAlmostFull ? "var(--red)" : "#888",
          fontWeight: 600,
          marginLeft: "auto"
        }}>
          {spotsLeft} left
        </span>
      </div>
      <Slider
        value={spotsFilled}
        min={0}
        max={totalSpots}
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
          {numWinners} Winners
        </span>
      </div>
      <Button
        variant="contained"
        color="success"
        onClick={e => {
          e.stopPropagation();
          onJoin && onJoin(e);
        }}
        style={{
          marginTop: 18,
          fontSize: 16,
          borderRadius: 8,
          fontWeight: 700,
          width: "100%",
          background: "var(--red)",
          color: "#fff"
        }}
      >
        Join Now
      </Button>
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
      {children}
    </div>
  );
}