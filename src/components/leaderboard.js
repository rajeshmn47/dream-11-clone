import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const ContestsContainer = styled(Grid)``;
const Tabel = styled.div`
  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  td,
  th {
    padding: 10px 10px;
    text-align: center;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    text-align: center;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 10px;
    font-family: "Open Sans";
    text-align: center;
  }
  #morewidth {
    width: 200px;
  }
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
  table,
  tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  img {
    width: 25px;
    margin-right: 5px;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 9px;
`;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0;
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
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px !important;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px !important;
  }
  width: 100%;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
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
const Paragraph = styled.p`
  padding: 15px 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const Left = styled.div``;

const Right = styled.div``;

const LastPanel = styled.div``;
const Won = styled.div`
  color: var(--green);
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export function LeaderBoard({ leaderboard, contest }) {
  return (
    <Tabel>
      <table>
        <tr>
          <th id="morewidth">
            All Teams (
            {leaderboard.length}
            )
          </th>
          <th>Points</th>
          <th>Rank</th>
        </tr>

        {leaderboard.length > 0
          && leaderboard
            .sort((a, b) => b._doc.points - a._doc.points)
            .map((f, index) => (
              <tr
                className={f._doc.userId === user._id ? 'selected' : ''}
                onClick={() => navigate(`/savedteam/${f._doc._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ width: '200px !important' }} id="morewidth">
                  <Profile>
                    <img src={`${FURL}/profilepic.png`} alt="" />
                    <Name>
                      {f.user.username}
                      <Won>
                        <EmojiEventsOutlinedIcon
                          style={{
                            color: 'var(--green) !important',
                            fontSize: '16px',
                            marginTop: '3px',
                            marginRight: '5px',
                          }}
                        />
                        <p>you won ₹500</p>
                      </Won>
                    </Name>
                  </Profile>
                </td>
                <td>{f._doc.points}</td>
                <td>
                  #
                  {index + 1}
                </td>
              </tr>
            ))}
      </table>
    </Tabel>
  );
}
