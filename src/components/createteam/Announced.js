import '../../App.css';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f3fef3;
`;

const ContainerU = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff0f0;
`;

const TopLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--green);
`;

const TopLineU = styled.div`
  height: 1px;
  width: 100%;
  background-color: red;
`;

const Bottom = styled.div`
  width: 130px;
  height: 15px;
  background-color: var(--green);
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #ffffff;
  justify-content: center;
  padding: 2px 2px;
  flex-direction: column;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  p {
    font-size: 10px;
    margin: 0 !important;
  }
`;
const BottomContainer = styled.div``;

const BottomU = styled.div`
  width: 150px;
  height: 15px;
  background-color: red;
  padding: 2px 2px;
  font-size: 10px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: center;
  flex-direction: column;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  p {
    font-size: 10px;
    margin: 0 !important;
  }
`;

function Announced({ title }) {
  return (
    <>
      {title == 'Announced' ? (
        <Container>
          <TopLine />
          <Bottom>{title}</Bottom>
        </Container>
      ) : (
        <ContainerU>
          <TopLineU />
          <BottomU>{title}</BottomU>
        </ContainerU>
      )}
    </>
  );
}

export default Announced;
