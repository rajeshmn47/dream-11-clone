import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Container = styled.div`
  display: flex;
  align-items: center;
  .dreamicon {
    display: none;
    height: 15px;
    width: 15px;
    margin-left: 5px;
  }
  .dream {
    display: flex;
    align-items: center;
  }
`;
export const StatsName = (props) => {
  const { hasFocus, value, playerName } = props;

  return (
    <Container className="dream">
      <p>{value}</p>
      <img
        className="dreamicon"
        src="https://console.cron-job.org/static/media/logo-darkbg.7c9e65a9b10032c2a262.png"
      />
    </Container>
  );
};

export default StatsName;
