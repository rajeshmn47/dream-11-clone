import "./home.css";
import styled from "@emotion/styled";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Button, Drawer } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/userAction";
import Bottomnav from "./bottomnavbar";
import LeftDrawer from "./leftDrawer";
import Steppr from "./stepper";

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: auto;
    justify-content: flex-end;
  }
`;

const Account = styled.h3`
  font-size: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  color: red;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: var(--green);
    color: #ffffff;
  }
`;

const Deatil = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  text-align: left;
  padding: 10px 5px;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const DeatilTop = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

export function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const dispatch = useDispatch;
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };
  const handleLeftClick = () => {
    setLeftOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {" "}
      <LeftDrawer state={leftOpen} setState={setLeftOpen} />
      <div className="logintopbar">
        <Account
          onClick={() => handleLeftClick()}
          style={{ cursor: "pointer" }}
        >
          {user?.username && user?.username.charAt(0)}
        </Account>
        <Center>
          <EmojiEventsOutlinedIcon
            style={{
              marginRight: "10px",
              fontSize: "20px",
              stroke: "white",
              strokeWidth: "1.5",
            }}
          />
          Dream11
        </Center>
        <RightSide>
          <NotificationAddOutlinedIcon
            style={{
              marginRight: "10px",
              cursor: "pointer",
              fontSize: "20px",
              stroke: "white",
              strokeWidth: "1.5",
            }}
          />
          <AccountBalanceWalletOutlinedIcon
            onClick={() => handleClick()}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              stroke: "white",
              strokeWidth: "1.5",
            }}
          />
        </RightSide>
      </div>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <DeatilTop>
          <p>total balance</p>
          <h5>₹{user && user.wallet}</h5>
        </DeatilTop>
        <AddButton onClick={() => navigate("/payment")}>add cash</AddButton>
        <Deatil>
          <p>Amount added</p>
          <h5>₹ 0</h5>
        </Deatil>
        <Deatil>
          <p>winnings</p>
          <h5>₹ 0</h5>
        </Deatil>
        <Deatil>
          <p>cash bonus</p>
          <h5>₹ 0</h5>
        </Deatil>
      </Drawer>
      <div className="hometop">
        <div className="hometopicon selectgame">
          <SportsCricketIcon
            style={{ color: "#C41E22", fontSize: "16px", fontWeight: "400" }}
          />
          <h5>Cricket</h5>
        </div>
        <div
          className="hometopicon"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          <SportsSoccerIcon />
          <h5>Football</h5>
        </div>
        <div
          className="hometopicon"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          <SportsBasketballIcon />
          <h5>Basketball</h5>
        </div>
        <div
          className="hometopicon"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          <SportsHockeyIcon />
          <h5>Hockey</h5>
        </div>
      </div>
    </>
  );
}

export default Navbar;
