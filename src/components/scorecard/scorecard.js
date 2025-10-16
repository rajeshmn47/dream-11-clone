import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useState } from 'react';

import { setshow } from '../../utils/dateformat';
import ScoreTable from './scoretable';

const Container = styled.div`
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(44,62,80,0.08);
  padding: 18px 0 10px 0;
  margin: 0 0 24px 0;
  .MuiPaper-root {
    background: transparent;
    box-shadow: none;
  }
  .MuiAccordion-root {
    margin: 0 0 12px 0;
    border-radius: 12px !important;
    overflow: hidden;
    border: 1.5px solid var(--lightred);
    transition: box-shadow 0.2s, border 0.2s;
    background: var(--lightred);
  }
  .MuiAccordion-root.expanded {
    background: var(--white);
    border: 2px solid var(--green);
    box-shadow: 0 4px 16px rgba(26,61,50,0.09);
  }
  .MuiAccordionSummary-root {
    transition: background 0.2s;
    cursor: pointer;
    background: var(--lightred);
    &:hover {
      background: var(--lightred);
    }
  }
  .MuiCollapse-root {
    overflow: auto !important;
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
    font-family: 'Open Sans';
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
  width: 120px !important;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  font-size: 14px;
`;

const MatchData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  gap: 18px;
  min-width: 0;
  overflow: hidden;
`;

const Code = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 15px;
  color: var(--green);
  letter-spacing: 0.5px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;         // Fixed width for alignment
`;

const Overs = styled.span`
  font-size: 13px !important;
  font-weight: 500;
  margin-right: 8px;
  color: var(--paragraph-color);
`;

const Scores = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: var(--heading-color);
  background: var(--lightred);
  border-radius: 8px;
  padding: 4px 12px;
  box-shadow: 0 1px 4px rgba(255,75,0,0.06);
  flex-shrink: 0;
  white-space: nowrap;
  width: 90px;          // Fixed width for alignment
  justify-content: flex-end;
`;

const NotStarted = styled.h3`
  color: var(--red);
  background: #fff3f3;
  padding: 24px 10px;
  text-align: center;
  border-radius: 12px;
  margin: 24px 0 0 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 1.5px solid var(--lightred);
`;

export function ScoreCard({ data, g, livescore }) {
  const [expanded, setExpanded] = React.useState('panel2');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      {data?.titleFI ? (
        <>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            className={expanded === 'panel1' ? 'expanded' : ''}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "var(--green)" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <MatchData>
                <Code>{data?.titleFI}</Code>
                <Scores>
                  <Overs>{`(${data?.oversFI} overs)`}</Overs>
                  {`${data.runFI}/${data.wicketsFI}`}
                </Scores>
              </MatchData>
            </AccordionSummary>
            <AccordionDetails>
              {data.isHomeFirst ? (
                <>
                  <ScoreTable rows={data.teamHomePlayers} batsmen />
                  <ScoreTable rows={data.teamAwayPlayers} bowlers />
                </>
              ) : (
                <>
                  <ScoreTable rows={data.teamAwayPlayers} batsmen />
                  <ScoreTable rows={data.teamHomePlayers} bowlers />
                </>
              )}
              <ScoreTable wicketsData={data.wicketsDataFI} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            className={expanded === 'panel2' ? 'expanded' : ''}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "var(--green)" }} />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <MatchData>
                <Code>{data?.titleSI}</Code>
                <Scores>
                  <Overs>{`(${data?.oversSI} overs)`}</Overs>
                  {`${data.runSI}/${data.wicketsSI}`}
                </Scores>
              </MatchData>
            </AccordionSummary>
            <AccordionDetails>
              {!data.isHomeFirst ? (
                <>
                  <ScoreTable rows={data.teamHomePlayers} batsmen />
                  <ScoreTable wicketsData={data.wicketsDataFI} />
                  <ScoreTable rows={data.teamAwayPlayers} bowlers />
                </>
              ) : (
                <>
                  <ScoreTable rows={data.teamAwayPlayers} batsmen />
                  <ScoreTable wicketsData={data.wicketsDataSI} />
                  <ScoreTable rows={data.teamHomePlayers} bowlers />
                </>
              )}
              
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <NotStarted>Match not started yet</NotStarted>
      )}
    </Container>
  );
}

export default ScoreCard;
