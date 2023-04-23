import styled from "@emotion/styled";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { setshow } from "../utils/dateformat";

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
    background-color: #fef4de !important;
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
  }
  width: 100%;
`;

const Th = styled.th`
  text-align: left !important;
  width: 100px;
  text-overflow: ellipsis;
`;

const Td = styled.td`
  text-align: left !important;
`;
const Name = styled.h6`
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
export const ScoreCard = ({ data, g }) => {
  const [expanded, setExpanded] = React.useState("panel2");
  const [fow, setFow] = useState([]);
  const [fowsSi, setFowsSI] = useState([]);
  useEffect(() => {
    console.log(data?.fowFI?.split(","), "scorecard");
    let a = [...data?.fowFI?.split(",")];
    let lmn = [...data?.fowSI?.split(",")];
    setFow([...setshow(a)]);
    setFowsSI([...setshow(lmn)]);
  }, [data]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Container>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={expanded == "panel1" ? "expanded" : "not"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <MatchData>
              <Code>{g?.teamHomeCode}</Code>

              <Scores>
                <Overs>{`(${data?.oversFI} overs)`}</Overs>{" "}
                {`${data.runFI}/${data.wicketsFI}`}
              </Scores>
            </MatchData>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <tr>
                <Th>Batter</Th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>S/R</th>
              </tr>
              {data?.teamHomePlayers?.length > 0 &&
                data.teamHomePlayers.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.playerName}</Name>
                    </Td>
                    <td>{t.runs}</td>
                    <td>{t.balls}</td>
                    <td>{t.fours}</td>
                    <td>{t.sixes}</td>
                    <td>{t.strikeRate}</td>
                  </tr>
                ))}
            </Table>
            <Table>
              <tr>
                <Th>Bowler</Th>
                <th>O</th>
                <th>M</th>
                <th>R</th>
                <th>W</th>
                <th>Eco</th>
              </tr>
              {data?.teamAwayPlayers?.length > 0 &&
                data.teamAwayPlayers.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.playerName}</Name>
                    </Td>
                    <td>{t.overs}</td>
                    <td>{t.maidens}</td>
                    <td>{t.runsConceded}</td>
                    <td>{t.wickets}</td>
                    <td>{t.economy}</td>
                  </tr>
                ))}
            </Table>
            <Table>
              <tr>
                <Th>Fall Of Wickets</Th>
                <th>Score</th>
                <th>Over</th>
              </tr>
              {fow?.length > 0 &&
                fow.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.score}</Name>
                    </Td>
                    <td>{t.fall}</td>
                    <td>{t.over}</td>
                  </tr>
                ))}
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className={expanded == "panel2" ? "expanded" : "not"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <MatchData>
              <Code>{g?.teamAwayCode}</Code>
              <Scores>
                <Overs>{`(${data?.oversSI} overs)`}</Overs>{" "}
                {`${data.runSI}/${data.wicketsSI}`}{" "}
              </Scores>{" "}
            </MatchData>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <tr>
                <Th>Batter</Th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>S/R</th>
              </tr>
              {data?.teamAwayPlayers?.length > 0 &&
                data.teamAwayPlayers.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.playerName}</Name>
                    </Td>
                    <td>{t.runs}</td>
                    <td>{t.balls}</td>
                    <td>{t.fours}</td>
                    <td>{t.sixes}</td>
                    <td>{t.strikeRate}</td>
                  </tr>
                ))}
            </Table>
            <Table>
              <tr>
                <Th>Bowler</Th>
                <th>O</th>
                <th>M</th>
                <th>R</th>
                <th>W</th>
                <th>Eco</th>
              </tr>
              {data?.teamHomePlayers?.length > 0 &&
                data.teamHomePlayers.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.playerName}</Name>
                    </Td>
                    <td>{t.overs}</td>
                    <td>{t.maidens}</td>
                    <td>{t.runsConceded}</td>
                    <td>{t.wickets}</td>
                    <td>{Math.floor(t.economy * 10) / 10}</td>
                  </tr>
                ))}
            </Table>
            <Table>
              <tr>
                <Th>Fall Of Wickets</Th>
                <th>Score</th>
                <th>Over</th>
              </tr>
              {fowsSi?.length > 0 &&
                fowsSi.map((t) => (
                  <tr>
                    <Td style={{ textTransform: "capitalize" }}>
                      <Name>{t.score}</Name>
                    </Td>
                    <td>{t.fall}</td>
                    <td>{t.over}</td>
                  </tr>
                ))}
            </Table>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};
export default ScoreCard;
