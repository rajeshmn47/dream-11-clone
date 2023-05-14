import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import { showBalls } from "../utils/lastballs";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .MuiCircularProgress-root {
    color: #4b4b4b;
  }
`;

const Special = styled.div`
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: #ffffff;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Empty = styled.div`
  background-color: #675e5e;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border-style: dotted;
  border: 1px solid #fff;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Normal = styled.div`
  background-color: #675e5e;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function check(a) {
  if (a == "6" || a == "4" || a == "W") {
    return true;
  }
}
export default function ShowOver(arr) {
  return (
    <Container>
      {arr.arr &&
        showBalls(arr).map((a) =>
          check(a) ? (
            <Special>{a}</Special>
          ) : a == "E" ? (
            <Empty />
          ) : (
            <Normal>{a}</Normal>
          )
        )}
    </Container>
  );
}
