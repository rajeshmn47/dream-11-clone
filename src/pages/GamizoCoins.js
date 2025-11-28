import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  @media screen and (min-width: 600px) {
    margin-left: 220px;
  }
`;

export default function GamizoCoins() {
  return (
    <>
      <Sidebar />
        <Navbar />
        <Container>
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2>Dreamcricket11 Coins</h2>
          <p>This is the Dreamcricket11 Coins page. Coming soon!</p>
        </div>
      </Container>
    </>
  );
}