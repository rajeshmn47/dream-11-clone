import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import styled from "@emotion/styled";
import Navbar from "./navbar";
import { URL } from "../constants/userConstants";
import { useSelector } from "react-redux";
import extractColors from "extract-colors";
import Loader from "./loader";

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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 5px 20px;
`;

export const Home = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(URL, "url");
  const navigate = useNavigate();
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`${URL}/home`);
      const userdata = await axios.get(`${URL}/userdata`);
      console.log(userdata.data);
      setUpcoming(data.data.upcoming.results);
      setLive(data.data.live.results);
      setPast(data.data.past.results);
    }
    getupcoming();
  }, []);
  useEffect(() => {
    const servertoken =
      localStorage.getItem("token") && localStorage.getItem("token");
    if (!servertoken) {
      navigate("/login");
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Navbar />
      <div className="matches">
        {live?.length > 0 ? (
          live.map((u) => (
            <div
              className="matchcontainer"
              onClick={() => navigate(`/contests/${u.id}`)}
            >
              <Top>
                <h5
                  style={{
                    color: "#595959",
                    height: "3vh",
                    fontSize: "12px",
                    fontWeight: "800",
                  }}
                >
                  {u.away.code} vs {u.home.code}
                </h5>
                <NotificationAddOutlinedIcon style={{ fontSize: "18px" }} />
              </Top>
              <div className="match">
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
              </div>
              <div className="bottom">
                <div>
                  <div className="mega">Mega</div>
                  <div className="meg">
                    <h5>59 crores</h5>
                  </div>
                </div>
                <div className="icon">
                  <PersonOutlineOutlinedIcon
                    style={{ color: "#595959", fontSize: "18px" }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <Bottomnav />
    </>
  );
};

export default Home;
