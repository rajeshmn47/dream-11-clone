import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import "./scorecard.css"

const Container = styled.div`
  .MuiPaper-root {
    height: auto !important;
  }
  .MuiPaper-root ::after {
    height: auto !important;
  }
  .MuiBox-root {
    padding: 0 0 !important;
  }
  .expanded {
    background-color: #ffffff;
  }
  .not {
    background-color: #ceffce !important;
  }
  .MuiAccordion-root {
    margin: 0 0 !important;
  }
`;

const Table = styled.table`
  text-align: center;
  margin-bottom: 20px;
  border-collapse: collapse;
  th,
  td {
    text-align: center;
    width: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-collapse: collapse;
    border-spacing: 0;
    font-family: "Open Sans";
    font-size: 14px;
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    padding-bottom: 8px;
  }
  td {
    padding: 5px 0;
    width: 25px;
    overflow: hidden;
  }
  width: 100%;
`;

const Th = styled.th`
  text-align: left !important;
  text-overflow: ellipsis;
  width: 120px;
`;

const Td = styled.td`
  text-align: left !important;
  width: 120px;
`;

const Name = styled(Link)`
  text-align: left !important;
  text-overflow: ellipsis;
  text-align: left !important;
  width: 120px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 14px;
`;

const HowOut = styled.div`
  display: none;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    display: block;
  }
`;

const MatchData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Code = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
`;

const Overs = styled.span`
  font-size: 12px !important;
  font-weight: 400;
  margin-right: 5px;
  line-height: 1;
`;

const Scores = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const S = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  text-align:center;
`;

export function ScoreTable({ rows, batsmen, bowlers, wicketsData }) {
  return (
    <>
      {bowlers ? (
        <Table>
          <thead>
            <tr>
              <Th>Bowler</Th>
              <th>O</th>
              <th>M</th>
              <th>R</th>
              <th>W</th>
              <th>Eco</th>
            </tr>
          </thead>
          {rows?.length > 0 &&
            rows
              .filter((k) => k.overs > 0)
              .map((t) => (
                <tr key={t.playerId}>
                  <Td style={{ textTransform: 'capitalize' }}>
                    <Name to={`../player/${t.playerId}`}>{t.playerName}</Name>
                  </Td>
                  <td>{t.overs}</td>
                  <td>{t.maidens}</td>
                  <td>{t.runsConceded}</td>
                  <td>{t.wickets}</td>
                  <td>
                    <S>{Math.floor(t.economy * 10) / 10}</S>
                  </td>
                </tr>
              ))}
        </Table>
      ) : null}
      {batsmen ? (
        <Table>
          <thead>
            <tr>
              <Th>Batter</Th>
              <th className="desktop-only">How Out</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>S/R</th>
            </tr>
          </thead>
          {rows?.length > 0 &&
            rows
              .filter((k) => k.balls > 0)
              .map((t) => (
                <tr key={t.playerId}>
                  <Td style={{ textTransform: 'capitalize' }}>
                    <Name to={`../player/${t.playerId}`}>{t.playerName}</Name>
                    <HowOut className="mobile-only">{t.howOut}</HowOut>
                  </Td>
                  <td className="desktop-only">{t.howOut}</td>
                  <td>{t.runs}</td>
                  <td>{t.balls}</td>
                  <td>{t.fours}</td>
                  <td>{t.sixes}</td>
                  <td>
                    <S>{t.strikeRate}</S>
                  </td>
                </tr>
              ))}
        </Table>
      ) : null}
      {wicketsData ? (
        <Table>
          <thead>
            <tr>
              <Th>Fall of Wickets</Th>
              <th>Score</th>
              <th>Over</th>
            </tr>
          </thead>
          <tbody>
            {wicketsData?.map((wicket, index) => (
              <tr key={index}>
                <Td>{wicket.batName}</Td>
                <td>{wicket.wktRuns}</td>
                <td>{wicket.wktOver}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
}

export default ScoreTable;
