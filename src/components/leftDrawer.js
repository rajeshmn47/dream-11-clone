import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "@emotion/styled";
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";

const Container = styled.div`
  .MuiTypography-body1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
`;

export const MenuContainer = styled.div`
  background: #000000;
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const FeedContainer = styled.div`
  background: #3549ff;
  border-radius: 3.75px;
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Border = styled.div`
  margin-top: 20px;
  border-bottom: 0.5625px solid #c6c6c6;
  height: 0;
`;

export const IconsContainer = styled.div`
  background: #ffffff;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 3px -22.5px 36px rgba(51, 51, 51, 0.1);
`;

export const IconContainer = styled.div`
  background: #f4f8f9;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40px;
  height: 40px;
  margin: 5px 0;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const NewsOrg = styled.img`
  width: 100px;
  margin: 20px 0;
`;

const Category = styled.h3`
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 15px;

  /* identical to box height, or 83% */

  color: #000000;
  padding-left: 20px;
`;

export default function LeftDrawer({ state, setState }) {
  const dispatch = useDispatch();
  const toggleDrawer = () => (event) => {
    setState(!state);
  };

  const ListA = (anchor) => (
    <Container>
      <Box
        sx={{ width: 150 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Button onClick={dispatch(logout())}>logout</Button>
      </Box>
    </Container>
  );

  return (
    <Container>
      <React.Fragment>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <ListA />
        </Drawer>
      </React.Fragment>
    </Container>
  );
}
