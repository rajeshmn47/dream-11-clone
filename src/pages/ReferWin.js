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

export default function ReferWin() {
  return (
    <>
      <Sidebar />
      <div>
        <Navbar />
        <Container>
          <div style={{ padding: 32, textAlign: "center" }}>
            <h2>Refer & Win</h2>
            <p>This is the Refer & Win page. Coming soon!</p>
          </div>
        </Container >
      </div>
    </>
  );
}