import "./home.css";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Match from "./match";
import { URL } from "../../constants/userConstants";
import {
  getDisplayDate,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from "../../utils/dateformat";
import Bottomnav from "../navbar/bottomnavbar";
import Loader from "../loader";
import Navbar from "../navbar";
import { SportsCricketOutlined } from "@mui/icons-material";
import { GrMultimedia } from "react-icons/gr";

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

const CricketBg = styled.div`
  background-image: url("./cricketbg.jpg");
  box-sizing: border-box;
  padding: 10px 10px;
  height: 150px;
  margin-bottom: 60px;
  position: relative;
  background-size: cover;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(196, 195, 195, 0.15);
  padding: 5px 15px;
  background-color: #ffffff;
`;

const Dot = styled.div`
  background-color: var(--green) !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewAll = styled(Button)`
  color: #ffffff;
  text-transform: capitalize;
  font-weight: 800;
  font-size: 18px;
`;

const Spanner = styled.div`
  width: 20px;
  height: 5px;
`;
export function Home() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastLoading, setPastLoading] = useState(true);
  const [date, setDate] = useState();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function getupcoming() {
      if (user?._id) {
        setLoading(true);
        setPastLoading(true);
        const upcoming = await axios.get(`${URL}/home`);
        const urr = upcoming.data.upcoming.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setUpcoming([...urr]);
        setLoading(false);
        const data = await axios.get(`${URL}/home/${user._id}`);
        const ucm = data.data.upcoming.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setUpcoming([...ucm]);
        const lrr = data.data.live.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setLive([...lrr]);
        setPastLoading(false);
        if (data.data.past.results.length > 0) {
          setPast([
            data.data.past.results
              .sort((b, a) => new Date(a.date) - new Date(b.date))
              .reverse()
              .pop(),
          ]);
        } else {
          //setPast([
          // data.data.past.results
          //    .sort((b, a) => new Date(a.date) - new Date(b.date))
          //   .pop(),
          //]);
        }
      }
    }
    getupcoming();
  }, [user]);
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
      <Navbar home />
      <div className="homecontainer">
        <CricketBg id="section1">
          <TopDiv>
            <h3 style={{ color: "#FFFFFF", position: "relative" }}>
              My Matches
            </h3>
            <ViewAll
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => navigate(`/completed/${user?._id}`)}
            >
              View All
              <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
            </ViewAll>
          </TopDiv>
          {pastLoading ? <div className="loadContainer"> <Loader /> </div> :
            past?.length > 0 ? past.map(
              (u) =>
                u && (
                  <div
                    className="matchcontainere"
                    onClick={() => navigate(`/contests/${u.id}`)}
                    style={{
                      postion: "absolute !important",
                      backgroundColor: "#000",
                    }}
                  >
                    <Top>
                      <h5
                        style={{
                          color: "#595959",
                          fontSize: "12px",
                          fontWeight: "800",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "5px" }}>
                          {u?.away.code}
                        </span>{" "}
                        vs
                        <span style={{ marginLeft: "5px" }}>
                          {u?.home.code}
                        </span>
                      </h5>
                      <NotificationAddOutlinedIcon
                        style={{ fontSize: "18px" }}
                      />
                    </Top>
                    <div className="match">
                      <div className="matchcenter">
                        <div className="matchlefts">
                          <img
                            src={u?.teamAwayFlagUrl}
                            alt=""
                            width="40"
                          />
                          <h5>{u?.away?.code}</h5>
                        </div>
                        <div
                          className={
                            u?.result == "Yes" ? "completed" : "time"
                          }
                        >
                          {u?.result === "Yes" && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  textTransform: "uppercase",
                                }}
                              >
                                <Dot />
                                <h5
                                  style={{ fontWeight: "600 !important" }}
                                >
                                  Completed
                                </h5>
                              </div>
                              <p
                                style={{
                                  color: "#5e5b5b",
                                  textTransform: "auto",
                                  fontSize: "10px",
                                  marginTop: "2px",
                                }}
                              >
                                {getDisplayDate(u.date, "i")}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="matchrights">
                          <h5> {u.home.code}</h5>
                          <img
                            src={u.teamHomeFlagUrl}
                            alt=""
                            width="40"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="bottom"
                      style={{
                        position: "relative",
                        padding: "6px 15px",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "150px",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {u.teams.length > 0 && (
                          <h5
                            className=""
                            style={{
                              textTransform: "lowercase",
                              fontSize: "12px",
                            }}
                          >
                            {u.teams.length} teams
                          </h5>
                        )}
                        <div className="meg">
                          {u.contests.length > 0 && (
                            <h5
                              style={{
                                textTransform: "lowercase",
                                fontSize: "12px",
                              }}
                            >
                              {u.contests.length} contests
                            </h5>
                          )}
                        </div>
                      </div>
                      <div className="icon">
                        <GrMultimedia className="reacticon" style={{ fontSize: "16px" }} />
                        <SportsCricketOutlined
                          style={{ color: "#595959", fontSize: "20px", marginLeft: "5.1px" }}
                        />
                      </div>
                    </div>
                  </div>
                )
            ) : <div className="notfound">no matches found</div>}
        </CricketBg>
        {live?.length > 0 && <div className="matches">
          <>
            <h3>Live Matches</h3>
            {(live.map((u) => (
              <Match u={u} live />
            ))
            )}
          </>
        </div>}
        <div className="matches">
          {!loading ? (upcoming?.length > 0 ? (
            <>
              <h3>Upcoming Matches</h3>
              {upcoming.map((u) => (
                <Match u={u} />
              ))}
            </>
          ) : null) : <Loader />}
        </div>
      </div>
      <Bottomnav />
    </>
  );
}

export default Home;
