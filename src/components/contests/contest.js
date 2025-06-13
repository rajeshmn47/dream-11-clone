import '../home.css';
import '../create.css';

import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Button, Grid, Slider, LinearProgress } from '@mui/material';

const ContestsContainer = styled(Grid)`
  justify-content: center;
`;

const ContestCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.10);
  margin: 80px auto 24px auto;
  padding: 32px 24px 24px 24px;
  max-width: 420px;
  width: 100%;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.18);
  }
`;

const Section = styled.div`
  margin-bottom: 18px;
`;

const Prize = styled.h1`
  font-size: 2.2rem;
  color: var(--red);
  margin: 0;
  font-weight: 700;
`;

const Entry = styled.span`
  font-size: 1.1rem;
  color: #444;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 4px 12px;
  margin-left: 8px;
  font-weight: 600;
`;

const SpotsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 0 0;
`;

const SpotsLeft = styled.span`
  color: ${props => props.low ? 'var(--red)' : '#444'};
  font-weight: 600;
`;

const JoinButton = styled(Button)`
  && {
    background-color: var(--red);
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;
    margin-top: 18px;
    padding: 12px 0;
    border-radius: 8px;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(255,0,0,0.08);
    transition: background 0.2s;
    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const Last = styled.div`
  background-color: var(--lightred);
  padding: 12px 10px;
  display: flex;
  align-items: center;
  color: #888;
  border-radius: 0 0 12px 12px;
  margin-top: 18px;
  font-size: 1rem;
`;

export function ContestDetail({ contest, handleClick }) {
  if (!contest) return null;
  const entryFee = Math.floor(contest.price / contest.totalSpots);
  const spotsFilled = contest.totalSpots - contest.spotsLeft;
  const spotsPercent = Math.floor((spotsFilled / contest.totalSpots) * 100);
  const lowSpots = contest.spotsLeft <= Math.ceil(contest.totalSpots * 0.2);

  return (
    <ContestsContainer container>
      <ContestCard>
        <Section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.1rem', color: '#888', fontWeight: 500 }}>Prize Pool</div>
            <Prize>₹{contest.price}</Prize>
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', color: '#888', fontWeight: 500 }}>Entry</div>
            <Entry>₹{entryFee}</Entry>
          </div>
        </Section>
        <Section>
          <LinearProgress
            variant="determinate"
            value={spotsPercent}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#f2f2f2',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--red)',
              },
            }}
          />
          <SpotsInfo>
            <SpotsLeft low={lowSpots}>{contest.spotsLeft} spots left</SpotsLeft>
            <span style={{ color: '#888' }}>{contest.totalSpots} total</span>
          </SpotsInfo>
        </Section>
        <Section>
          <JoinButton onClick={handleClick} variant="contained">
            Join for ₹{entryFee}
          </JoinButton>
        </Section>
        <Last>
          <EmojiEventsOutlinedIcon style={{ margin: '0 10px 0 0', color: 'var(--red)' }} />
          {Math.floor((contest.numWinners / contest.totalSpots) * 100)}% win | Single
        </Last>
      </ContestCard>
    </ContestsContainer>
  );
}

export default ContestDetail;
