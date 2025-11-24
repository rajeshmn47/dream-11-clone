import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";

export default function GamizoCoins() {
  return (
    <>
      <Sidebar />
      <div>
        <Navbar />
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2>Dreamcricket11 Coins</h2>
          <p>This is the Dreamcricket11 Coins page. Coming soon!</p>
        </div>
      </div>
    </>
  );
}