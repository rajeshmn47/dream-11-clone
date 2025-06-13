import './home.css';

import styled from '@emotion/styled';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import SportsCricketOutlinedIcon from '@mui/icons-material/SportsCricketOutlined';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { GrMultimedia } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getDisplayDate,
  getJustDate,
  getJustHours,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from '../../utils/dateformat';

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
  padding: 5px 5px;
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
export function Match({ u, live }) {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //const i = setInterval(() => {
    //  setDate(new Date());
    //}, 1000);
    //return () => {
    //  clearInterval(i);
    //};
  }, []);
  useEffect(() => {
    const servertoken = localStorage.getItem('token') && localStorage.getItem('token');
    if (!servertoken) {
      navigate('/login');
    }
  }, []);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div
      className="matchcontainer"
      onClick={() => navigate(`/contests/${u.id}`)}
    >
      <Top>
        <h5
          style={{
            color: '#595959',
            fontSize: '12px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              marginRight: '5px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
              fontWeight: '200',
            }}
          >
            {u.match_title}
          </span>
        </h5>
        <h5
          style={{
            color: 'rgb(31, 169, 81)',
            fontFamily: 'Montserrat',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100px',
          }}
        >
          {live || u.lineups}
        </h5>
      </Top>
      <div className="match">
        <div className="matchcenter">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "8px 0"
            }}
          >
            {/* Left: Teams stacked, with maxWidth */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: 220, // adjust as needed
                flex: "1 1 220px",
                minWidth: 0
              }}
            >
              <div className="matchlefts" style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <img
                  src={u.teamAwayFlagUrl}
                  alt={u.away.name}
                  width="30"
                  height="30"
                  style={{
                    borderRadius: "50%",
                    border: "1.5px solid #e0e0e0",
                    background: "#fafafa",
                    objectFit: "cover"
                  }}
                />
                <h5
                  style={{
                    color: "#212121",
                    marginLeft: "12px",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {u.away.name}
                </h5>
              </div>
              <div className="matchrights" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={u.teamHomeFlagUrl}
                  alt={u.home.name}
                  width="30"
                  height="30"
                  style={{
                    borderRadius: "50%",
                    border: "1.5px solid #e0e0e0",
                    background: "#fafafa",
                    objectFit: "cover"
                  }}
                />
                <h5
                  style={{
                    color: "#212121",
                    marginLeft: "12px",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {u.home.name}
                </h5>
              </div>
            </div>
            {/* Right: Time/Status */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 90,
                background: "#f8fafc",
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
                padding: "8px 14px",
                marginLeft: 12
              }}
            >
              {/* Hours (always on top) */}
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#1976d2",
                  letterSpacing: 0.5,
                  marginBottom: 4,
                  fontFamily: "Montserrat, Arial, sans-serif"
                }}
              >
                {getJustHours(u.date, 'i')}
              </span>
              {/* Status/Date (below) */}
              {live ? (
                <span
                  style={{
                    background: "var(--green)",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "3px 14px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1,
                    marginBottom: 0,
                    boxShadow: "0 1px 4px rgba(31,169,81,0.08)"
                  }}
                >
                  LIVE
                </span>
              ) : u.result === 'Yes' ? (
                <span
                  style={{
                    background: "#e0e0e0",
                    color: "#888",
                    borderRadius: 6,
                    padding: "3px 14px",
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 0
                  }}
                >
                  COMPLETED
                </span>
              ) : (
                <span
                  style={{
                    background: "#e3f2fd",
                    color: "#1976d2",
                    borderRadius: 6,
                    padding: "3px 14px",
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 0
                  }}
                >
                  {sameDayorNot(new Date(), new Date(u.date))
                    ? hoursRemaining(u.date, 'k', date)
                    : isTommorrow(new Date(), new Date(u.date))
                      ? "Tomorrow"
                      : getJustDate(u.date, 'i')}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bottom" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 10px 4px 10px",
          borderTop: "1px solid #f2f2f2"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src='./m.png' alt="" width="22" style={{ marginRight: 6 }} />
            <span style={{ fontWeight: 700, color: "#222", fontSize: 13 }}>₹58 crores</span>
            <span style={{
              marginLeft: 8,
              background: "#eaffea",
              color: "var(--green)",
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 12,
              fontWeight: 600
            }}>
              Mega
            </span>
          </div>
          <div className="icon" style={{
            background: "#f6f6f6",
            borderRadius: "50%",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <NotificationAddOutlinedIcon style={{ fontSize: '22px', color: "#888" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
