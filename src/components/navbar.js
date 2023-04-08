import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import LeftDrawer from "./leftDrawer";

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 20px;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  background-color: #008a36;
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: #008a36;
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

export const Navbar = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const dispatch = useDispatch;
  const navigate = useNavigate();
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`${URL}/home`);
      console.log(data);
      setUpcoming(data.data.upcoming.results);
      setLive(data.data.live.results);
      setPast(data.data.past.results);
    }
    getupcoming();
  }, []);

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
            style={{ marginRight: "1vw", fontSize: "20px" }}
          />
          Dream11
        </Center>
        <RightSide>
          <NotificationAddOutlinedIcon
            style={{ marginRight: "10px", cursor: "pointer", fontSize: "20px" }}
          />
          <AccountBalanceWalletOutlinedIcon
            onClick={() => handleClick()}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        </RightSide>
      </div>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <DeatilTop>
          <p>total balance</p>
          <h5>₹ {user && user.wallet}</h5>
        </DeatilTop>
        <AddButton>add cash</AddButton>
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
};

export default Navbar;
