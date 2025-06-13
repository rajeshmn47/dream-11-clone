import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const ContestsContainer = styled(Grid)`
  margin: 0;
  width: 100%;
`;

export const ContestContainerJ = styled(Grid)`
  background: var(--white);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.10);
  margin: 22px 0;
  padding: 0;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1.5px solid #f5f5f5;
  &:hover {
    box-shadow: 0 8px 32px rgba(44,62,80,0.16);
    transform: translateY(-2px) scale(1.01);
    border: 1.5px solid var(--lightgreen);
  }
`;

export const ContestJ = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
`;

export const First = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background: var(--lightgreen);
  border-radius: 18px 18px 0 0;
  padding: 18px 22px 10px 22px;
  font-size: 15px;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 0.2px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 80px;
    p {
      margin: 0 0 2px 0;
      font-size: 12px;
      color: var(--paragraph-color);
      font-weight: 500;
    }
    &:first-of-type p {
      color: var(--red);
      font-weight: 700;
    }
  }
  h5 {
    margin: 0;
    font-size: 15px;
    color: var(--green);
    font-weight: 700;
    font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1.5px;
  background: #f2f2f2;
  margin: 0;
`;

export const LastJ = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 12px 22px 0 22px;
  background: #f9f9f9;
  border-radius: 0 0 0 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--heading-color);
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const F = styled.span`
  background: var(--lightred);
  color: var(--red);
  font-weight: 700;
  border-radius: 6px;
  padding: 2px 8px;
  margin-right: 6px;
  font-size: 13px;
`;

export const M = styled.span`
  background: var(--lightgreen);
  color: var(--green);
  font-weight: 700;
  border-radius: 6px;
  padding: 2px 8px;
  margin-right: 6px;
  font-size: 13px;
`;

export const C = styled.span`
  background: #eee;
  color: #222;
  font-weight: 700;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 13px;
`;

export const StatusC = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  border-top: 1px solid #f2f2f2;
  background: #fafafa;
  font-size: 13px;
  font-weight: 500;
  color: var(--paragraph-color);
`;

export const SpotsLeft = styled.div`
  flex: 1;
  font-size: 13px;
  color: #222;
  font-weight: 600;
  text-align: center;
  padding: 2px 0;
`;

export const SpotsRight = styled.div`
  flex: 1;
  font-size: 13px;
  color: #222;
  font-weight: 600;
  text-align: center;
  padding: 2px 0;
`;

export const NoContests = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0 32px 0;
  color: var(--paragraph-color);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(44,62,80,0.06);
  img {
    width: 120px;
    margin: 18px 0;
  }
`;

export const JoincontestBtn = styled.button`
  background: linear-gradient(90deg, var(--green) 60%, var(--lightgreen) 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 15px;
  font-weight: 700;
  margin-top: 18px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(26,61,50,0.08);
  &:hover {
    background: linear-gradient(90deg, var(--redd) 40%, var(--lightred) 100%);
    color: var(--heading-color);
  }
`;