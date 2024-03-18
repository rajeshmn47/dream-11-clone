import styled from '@emotion/styled';

import { FURL } from '../constants/userConstants';
import { getDisplayDate } from '../utils/dateformat';

const Container = styled.div`
  display: flex;
  align-items: center;
  .dreamicon {
    display: none;
    height: 20px;
    width: 20px;
    margin-left: 15px;
  }
  .dream {
    display: flex;
    align-items: center;
  }
`;
export function CreatedAt(props) {
  console.log(props);
  const { hasFocus, value } = props;

  return (
    <Container className="dream">
      <p>{getDisplayDate(value, 'sc', new Date())}</p>
      <img className="dreamicon" src={`${FURL}/dreamteam.jpeg`} />
    </Container>
  );
}

export default CreatedAt;
