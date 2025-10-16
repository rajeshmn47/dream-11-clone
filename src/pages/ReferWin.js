import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";

export default function ReferWin() {
  return (
    <>
      <Sidebar />
      <div>
        <Navbar />
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2>Refer & Win</h2>
          <p>This is the Refer & Win page. Coming soon!</p>
        </div>
      </div>
    </>
  );
}