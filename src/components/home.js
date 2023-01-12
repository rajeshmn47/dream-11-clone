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

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Account = styled.h3`
  font-size: 12px;
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
  padding: 10px 0;
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

export const Home = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get("http://localhost:8000/home");
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
  return (
    <>
      <div className="logintopbar">
        <Account>account</Account>
        <Center>
          <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
          Dream11
        </Center>
        <RightSide>
          <NotificationAddOutlinedIcon style={{ marginRight: "10px" }} />
          <AccountBalanceWalletOutlinedIcon onClick={() => handleClick()} />
        </RightSide>
      </div>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <DeatilTop>
          <p>total balance</p>
          <h5>₹ 0</h5>
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
          <SportsCricketIcon style={{ color: "#C41E22" }} />
          <h5>Cricket</h5>
        </div>
        <div className="hometopicon">
          <SportsSoccerIcon />
          <h5>Football</h5>
        </div>
        <div className="hometopicon">
          <SportsBasketballIcon />
          <h5>Basketball</h5>
        </div>
        <div className="hometopicon">
          <SportsHockeyIcon />
          <h5>Hockey</h5>
        </div>
      </div>
      <div className="matches">
        {live
          ? live.map((u) => (
              <div
                className="match"
                onClick={() => navigate(`/contests/${u.id}`)}
              >
                <h5
                  style={{
                    color: "rgb(233,233,233)",
                    height: "3vh",
                    fontSize: "12px",
                  }}
                >
                  {u.away.code} vs {u.home.code}
                </h5>
                <div className="matchcenter">
                  <div className="matchlefts">
                    <img src={u.teamAwayFlagUrl} alt="" width="40" />
                    <h5>{u.away.code}</h5>
                  </div>
                  <h5 className="time">{u.livestatus}</h5>
                  <div className="matchrights">
                    <h5> {u.home.code}</h5>
                    <img src={u.teamHomeFlagUrl} alt="" width="40" />
                  </div>
                </div>
                <div className="mega">Mega</div>
                <div className="meg">
                  <h5>59 crores</h5>
                </div>
              </div>
            ))
          : null}
      </div>
      <Bottomnav />
    </>
  );
};

export default Home;
