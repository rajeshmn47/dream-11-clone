import '../home.css';
import '../create.css';

import styled from '@emotion/styled';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Button, Grid, Slider } from '@mui/material';

const Top = styled.div`
  background-color: var(--black);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  position: fixed;
  height: 50px;
  top: 0;
  left: 0;
`;

const Bottom = styled.div``;
const LeftSide = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  .MuiTabs-indicator {
    background-color: var(--red) !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: var(--black) !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
`;
const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0 0;
  margin-top: 70px !important;
  cursor: pointer;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: var(--lightgreen);
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: var(--green);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const JoinButton = styled.button`
  background-color: var(--green);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
  width: 100%;
  margin-top:10px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;

const tabs = [{ label: 'winnings' }, { label: 'leaderboard' }];

export function ContestDetail({ contest, handleClick }) {
  console.log(contest,'contest')
  return (
    <ContestsContainer container>
      {contest && (
        <ContestContainer>
          <Contest>
            <First>
              <p>Prize Pool</p>
              <p>Entry</p>
            </First>
            <First>
              <h1>{contest.price}</h1>
              <First>
                <del>₹ 19</del>
                <FreeButton>
                  ₹
                  {' '}
                  {Math.floor(contest.price / contest.totalSpots)}
                </FreeButton>
              </First>
            </First>
            <SliderContainer>
              <Slider
                defaultValue={contest.totalSpots - contest.spotsLeft}
                min={0}
                max={contest.totalSpots}
              />
            </SliderContainer>
            <First>
              <SpotsLeft>
                {contest.spotsLeft}
                {' '}
                spots left
              </SpotsLeft>
              <SpotsRight>
                {contest.totalSpots}
                {' '}
                spots
              </SpotsRight>
            </First>
            <First>
              <JoinButton onClick={() => handleClick()}>
                <del>₹ 190</del>
                join
                ₹
                {' '}
                {Math.floor(contest.price / contest.totalSpots)}
              </JoinButton>
            </First>
          </Contest>
          <Last>
            ₹
            {Math.floor(contest.price / contest.totalSpots)}
            <EmojiEventsOutlinedIcon
              style={{ margin: '0 15px', marginBottom: '3px' }}
            />
            {Math.floor((contest.numWinners / contest.totalSpots) * 100)}
            %
            Single
          </Last>
        </ContestContainer>
      )}
    </ContestsContainer>
  );
}

export default ContestDetail;
