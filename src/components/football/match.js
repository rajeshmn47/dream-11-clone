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
export function Match({ u, live }) {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const i = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(i);
    };
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
            whiteSpace: 'nowrap',
            width: '60%',
            textOverflow: 'ellipsis',
          }}
        >
          <span
            style={{
              marginRight: '5px',
              whiteSpace: 'nowrap',
              width: '60%',
              textOverflow: 'ellipsis',
            }}
          >
            {u.match_title}
          </span>
        </h5>
        <h5
          style={{
            marginLeft: '90px',
            color: 'rgb(31, 169, 81)',
            fontFamily: 'Montserrat',
          }}
        >
          {live || u.lineups}
        </h5>
        <NotificationAddOutlinedIcon style={{ fontSize: '18px' }} />
      </Top>
      <div className="match">
        <div className="matchcenter">
          <div className="matchflefts">
            <img src={u.teamAwayFlagUrl} alt="" width="40" />
          </div>
          {live ? (
            <div
              style={{
                width: '40px',
                textAlign: 'center',
              }}
            >
              <h5 style={{ color: 'var(--green)', marginBottom: '3px' }}>
                live
              </h5>
              <LinearProgress color="success" />
            </div>
          ) : (
            <h5 className={u.result == 'Yes' ? 'completed' : 'time'}>
              {!(u.result == 'Yes') ? (
                sameDayorNot(new Date(), new Date(u.date))
                || isTommorrow(new Date(), new Date(u.date)) ? (
                  <div>
                    <p>{hoursRemaining(u.date, 'k', date)}</p>
                    <p
                      style={{
                        color: '#5e5b5b',
                        textTransform: 'auto',
                        fontSize: '10px',
                        marginTop: '2px',
                      }}
                    >
                      {getDisplayDate(u.date, 'i', date)
                        && getDisplayDate(u.date, 'i', date)}
                    </p>
                  </div>
                  ) : (
                    <p
                      style={{
                        color: '#e10000',
                        textTransform: 'auto',
                      }}
                    >
                      {getDisplayDate(u.date, 'i') && getDisplayDate(u.date, 'i')}
                    </p>
                  )
              ) : (
                'Completed'
              )}
            </h5>
          )}
          <div className="matchfrights">
            <img src={u.teamHomeFlagUrl} alt="" width="40" />
          </div>
        </div>
        <div className="teams">
          <div className="teamLeft">
            <h5
              style={{
                color: '#595959',
                fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              {u.away.code}
            </h5>
          </div>
          <div className="teamRight">
            <h5
              style={{
                color: '#595959',
                fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              {' '}
              {u.home.code}
            </h5>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="meta">
          <div className="mega">Mega</div>
          <div className="meg">
            <h5 style={{ fontSize: '10px', textTransform: 'uppercase' }}>
              ₹59 crores
            </h5>
          </div>
        </div>
        <div className="icon">
          <GrMultimedia className="reacticon" />
          <SportsCricketOutlinedIcon
            style={{ color: '#595959', fontSize: '18px', marginLeft: '5px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Match;
