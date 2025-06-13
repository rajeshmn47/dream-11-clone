import './home.css';
import './create.css';

import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkar, checkwk, getImgurl } from '../utils/img_url';
import { showName } from '../utils/name';
import { URL } from '../constants/userConstants';

const CaptainSelector = styled.div``;
const Player = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    width: 100px;
    text-transform: capitalize;
  }
`;

const CaptainC = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  font-weight: 700;
  color: #cccccc;
  width: 30px;
  font-size: 16px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ViceCaptain = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  color: #cccccc;
  font-weight: 700;
  font-size: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Name = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  img {
    width: 50px !important;
    height: 50px !important;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
  h1 {
    white-space: nowrap;
  }
`;

const NextButtonContainer = styled.div`
  position: fixed;
  bottom: 8%;
  left: 0%;
  z-index: 1000000000000000000000000;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const NextButton = styled.button`
  background-color: var(--green);
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 20px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
`;

const PrevButton = styled.button`
  background-color: var(--black);
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 10px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  display: flex;
  align-items: center;
  width: 230px;
  justify-content: space-evenly;
  white-space: nowrap;
`;

const EachTeam = styled.div`
  box-shadow: 0 4px 16px rgba(44,62,80,0.12);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  background: linear-gradient(120deg, var(--lightgreen) 0%, #fff 100%);
  border: 1px solid #e0e0e0;
  position: relative;
  max-width: 99vw;
`;

const Top = styled.div`
  background-image: linear-gradient(rgba(26,61,50,0.82),rgba(26,61,50,0.82)), url("/pitch.png");
  width: 100%;
  min-height: 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-repeat: no-repeat;
  background-color: var(--green);
  background-size: cover;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  padding: 0 4px;
  gap: 0;
  @media (max-width: 600px) {
    min-height: 148px;
    padding: 0 2px;
  }
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      margin: 0;
      padding: 0;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #fff;
      text-shadow: 0 1px 4px rgba(26,61,50,0.18);
      @media (max-width: 600px) {
        font-size: 11px;
      }
    }
    p {
      margin: 0;
      font-size: 11px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(26,61,50,0.13);
      @media (max-width: 600px) {
        font-size: 9px;
      }
    }
  }
  img {
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(44,62,80,0.13);
    background: #fff;
    margin-bottom: 2px;
    margin-top: 2px;
    transition: border 0.18s;
  }
`;

const CaptainsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 38px;
`;

const CaptainI = styled.div`
  position: absolute;
  left: -8px;
  top: -8px;
  width: 13px;
  height: 13px;
  border: 1.5px solid var(--green);
  border-radius: 50%;
  background-color: #fff;
  color: var(--green);
  font-size: 7px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(26,61,50,0.10);
  aspect-ratio: 1/1;
  padding: 0;
`;

const VcaptainI = styled.div`
  position: absolute;
  left: -8px;
  top: -6px;
  width: 13px;
  height: 13px;
  border: 1.5px solid var(--red);
  border-radius: 50%;
  background-color: #fff;
  color: var(--red);
  font-size: 7px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(255,75,0,0.10);
  aspect-ratio: 1/1;
  padding: 0;
`;

const Captain = styled.div`
  font-size: 9px;
  text-transform: uppercase;
  background-color: var(--lightgreen);
  color: var(--green);
  border-radius: 4px;
  padding: 1px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-top: 1px;
  font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
  letter-spacing: 0.5px;
`;

const VCaptain = styled.div`
  font-size: 9px;
  text-transform: uppercase;
  background-color: var(--lightred);
  color: var(--red);
  border-radius: 4px;
  padding: 1px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-top: 1px;
  font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
  letter-spacing: 0.5px;
`;

const Bottom = styled(Grid)`
  background-color: #f8fafc;
  padding: 8px 2px 6px 2px;
  border-top: 1px solid #f2f2f2;
`;

const Each = styled(Grid)`
  font-size: 10px;
  color: var(--paragraph-color);
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;
  font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
  text-transform: uppercase;
  span {
    font-size: 12px !important;
    font-weight: 900 !important;
    color: var(--green);
    letter-spacing: 0.5px;
  }
`;
const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;
export function Team({
  matchinfo,
  captains,
  selectedPlayers,
  teamId,
  matchId,
}) {
  const navigate = useNavigate();
  const { match_details, matchlive } = useSelector((state) => state.match);
  return (
    <EachTeam>
      {matchinfo.length > 0 && captains.length > 0 && (
        <>
          {!(
            matchlive?.result == 'In Progress'
            || matchlive?.result == 'Complete'
          ) && (
            <EditIconContainer
              onClick={() => navigate(`/createTeam/${matchId}`, {
                state: {
                  selectedPlayers,
                  editMode: true,
                  teamId,
                },
              })}
            />
          )}
          <Top onClick={() => navigate(`/savedteam/${teamId}`)}>
            <div>
              <h3>{matchinfo[0]?.awayCode}</h3>
              <p>{matchinfo[0]?.number}</p>
            </div>
            <div>
              <h3>{matchinfo[1]?.homeCode}</h3>
              <p>{matchinfo[1]?.number}</p>
            </div>
            <CaptainsContainer>
              <AvatarWrapper>
                <CaptainI>c</CaptainI>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${captains[0]?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                  alt=""
                />
              </AvatarWrapper>
              <Captain>
                <p>{showName(captains[0].playerName)}</p>
              </Captain>
            </CaptainsContainer>
            <CaptainsContainer>
              <AvatarWrapper>
                <VcaptainI>vc</VcaptainI>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${captains[1]?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`}
                  alt=""
                />
              </AvatarWrapper>
              <VCaptain>
                <p>
                  {captains[1]?.playerName && showName(captains[1]?.playerName)||"vice captain"}
                </p>
              </VCaptain>
            </CaptainsContainer>
          </Top>
        </>
      )}
      <Bottom container spacing={1}>
        <Each item xs={3} sm={3}>
          WK
          {' '}
          <span>
            {selectedPlayers.filter((f) => checkwk(f.position)).length}
          </span>
        </Each>
        <Each item xs={3} sm={3}>
          BAT
          {' '}
          <span>
            {
              selectedPlayers.filter(
                (f) => f.position == 'batsmen' || f.position == 'batsman',
              ).length
            }
            {' '}
          </span>
        </Each>
        <Each item xs={3} sm={3}>
          AR
          {' '}
          <span>
            {selectedPlayers.filter((f) => checkar(f.position)).length}
            {' '}
          </span>
        </Each>
        <Each item xs={3} sm={3}>
          BOWL
          {' '}
          <span>
            {selectedPlayers.filter((f) => f.position === 'bowler').length}
          </span>
        </Each>
      </Bottom>
    </EachTeam>
  );
}

export default Team;
