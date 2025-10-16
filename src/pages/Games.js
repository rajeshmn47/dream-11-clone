import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";

export default function Games() {
  return (
    <>
      <Sidebar />
      <div>
        <Navbar />
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2>Games</h2>
          <p>This is the Games page. Coming soon!</p>
        </div>
      </div>
    </>
  );
}