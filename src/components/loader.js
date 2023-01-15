import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  position: absolute;
  left: 47%;
  top: 47%;
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiCircularProgress-root {
    color: #4b4b4b;
  }
`;

export default function Loader() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
