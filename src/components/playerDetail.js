import './create.css';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import { getImgurl } from '../utils/img_url';
import Loader from './loader';
import PlayerStatsTable from './analytics/playerStatsTable';
import PlayerCharts from './playerdetails/PlayerCharts';
import PlayerStatsSection from './playerdetails/PlayerStatsSection';

const Container = styled.div`
  position: relative;
  max-width: 100%;
  overflow: hidden;
  padding: 20px;
  background-color: #f5f5f5;

  .MuiBox-root {
    padding: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: #000;
  }

  @media only screen and (max-width: 600px) {
    padding: 10px;
  }

  @media only screen and (min-width: 601px) and (max-width: 1024px) {
    padding: 15px;
  }
`;

const Flags = styled.div`
  display: flex;
  align-items: center;
`;

const Flag = styled.img`
  width: 80px;
  margin-right: 10px;
  @media only screen and (max-width: 576px) {
    width: 40px;
  }
`;

const Name = styled.h1`
  font-size: 50px;
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
  @media only screen and (max-width: 576px) {
    font-size: 24px;
  }
`;

const Player = styled.div`
  background: rgb(67, 108, 171);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 15px 30px;
  @media only screen and (max-width: 576px) {
    height: 150px;
    justify-content: space-between;
    padding: 15px 15px;
  }
`;

const Details = styled.div`
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  @media only screen and (max-width: 576px) {
    padding: 15px 15px;
  }
`;

const Series = styled.div`
  margin-top: 10px;
  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 576px) {
    margin-top: 5px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  img {
    max-width: 100%;
    border-radius: 8px;
    @media only screen and (max-width: 576px) {
      width: 100%;
    }
  }
`;

const Heading = styled.h3`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 15px;
  font-size: 24px;
  color: #333;
`;

const SeriesHeading = styled.h3`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 0px;
  font-size: 20px;
  color: #555;
`;

const PlayerStats = styled.div`
  margin-top: 25px;
  .selected {
    background: rgba(67, 108, 171, 0.1);
    border: 1px solid rgba(67, 108, 171, 0.2);
    padding: 15px 0px;
    cursor: pointer;
  }
  .notSelected {
    background: #fff;
    padding: 15px 0px;
    cursor: pointer;
  }
`;

const AllStats = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 15px;
  background: rgba(67, 108, 171, 0.1);
  border: 1px solid rgba(67, 108, 171, 0.2);
  padding: 15px 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(67, 108, 171, 0.2);
  }
`;

const Stat = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background 0.3s ease;
  background-color: ${(props) => (props.highlight ? '#436cab' : '#fff')};
  color: ${(props) => (props.highlight ? '#fff' : '#333')};

  &:hover {
    background: rgba(67, 108, 171, 0.2);
  }
`;

const Table = styled.div`
  padding: 15px 0px;
  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 576px) {
    padding: 15px 0px;
  }
`;

export function PlayerDetail() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [playerDetail, setPlayerDetail] = useState();
  const [matches, setMatches] = useState([]);
  const [seriesNames, setSeriesNames] = useState();
  const [seriesSelected, setSeriesSelected] = useState('Indian Premier League 2024');
  const [seriesDetails, setSeriesDetails] = useState([]);
  const [statType, setStatType] = useState('batting');
  const [mainInfo, setMainInfo] = useState('Indian Premier League 2024');

  useEffect(() => {
    async function getplayers() {
      if (user?._id) {
        const data = await API.get(
          `${URL}/playerDetails/${id}`,
        );
        setPlayerDetail(data.data.player);
        setMatches(data?.data?.matches);
      }
    }
    getplayers();
  }, [user, id]);

  useEffect(() => {
    async function getSeriesStats() {
      if (user?._id && seriesSelected) {
        setLoading(true)
        const data = await API.get(
          `${URL}/playerSeriesDetails/${id}/${seriesSelected}`,
        );
        setLoading(false)
        if (data.data.player.length > 0) {
          setSeriesDetails([...data.data.player]);
          setMainInfo(data.data.maininfo);
        }
      }
    }
    getSeriesStats();
  }, [user, seriesSelected]);

  useEffect(() => {
    if (matches?.length > 0) {
      let AllSeriesNames = matches.map((match) => match.matchdetails[0].matchTitle);
      let unique = AllSeriesNames.filter((item, i, ar) => ar.indexOf(item) === i);
      setSeriesNames([...unique])
      setSeriesSelected(unique[0])
    }
  }, [matches])
  console.log(seriesDetails, 'series details');

  return (
    <Container>
      <Player>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6} sm={4} xs={4}>
            <ImageContainer>
              <img src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${playerDetail?.id}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt={playerDetail?.name} />
            </ImageContainer>
          </Grid>
          <Grid item md={6} lg={6} sm={8} xs={8}>
            <Flags>
              {playerDetail?.flagUrls?.length > 0 &&
                playerDetail?.flagUrls?.map((flag, index) => <Flag key={index} src={flag} alt={`Flag ${index + 1}`} />)}
            </Flags>
            <Name>
              {playerDetail?.name}
            </Name>
          </Grid>
        </Grid>
      </Player>
      <Details>
        <Grid container spacing={2} justifyContent="space-between">
          <PlayerStatsSection title="Batting" matches={matches} playerDetail={playerDetail} statType="batting" />
          <PlayerStatsSection title="Bowling" matches={matches} playerDetail={playerDetail} statType="bowling" />
        </Grid>
        <PlayerStats>
          <Grid container spacing={2}>
            <Grid item md={4} lg={4} sm={12} xs={12}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item md={4} lg={4}>
                  Matches
                </Grid>
                <Grid item md={4} lg={4}>
                  <div className={statType === "batting" ? 'statSelected' : 'statNotSelected'} onClick={() => setStatType("batting")}>
                    Batting
                  </div>
                </Grid>
                <Grid item md={4} lg={4}>
                  <div className={statType === "bowling" ? 'statSelected' : 'statNotSelected'} onClick={() => setStatType("bowling")}>
                    Bowling
                  </div>
                </Grid>
              </Grid>
              <Series>
                {seriesNames?.map((s, index) =>
                  <div key={index} className={seriesSelected === s ? "selected" : "notSelected"}
                    onClick={() => setSeriesSelected(s)}>
                    <Link to={`../series/${s}`}>{s}</Link>
                  </div>)}
              </Series>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <SeriesHeading>T20</SeriesHeading>
              {loading ? <div style={{ minHeight: "200px" }}>
                <Loader /> </div> :
                <div style={{ minHeight: "200px !important" }}>
                  {statType === "batting" ? <AllStats>
                    <Stat highlight>{mainInfo?.runs} Runs</Stat><Stat>{mainInfo?.innings} Inns</Stat><Stat>{Math.floor(mainInfo?.average)} Average</Stat><Stat>{mainInfo?.strikeRate} Strike rate</Stat>
                  </AllStats> : <AllStats>
                    <Stat highlight>{mainInfo?.wickets} Wkts</Stat><Stat>{mainInfo?.innings} Inns</Stat><Stat>{Math.floor(mainInfo?.economy)} Economy</Stat><Stat>{mainInfo?.strikeRate} Strike rate</Stat>
                  </AllStats>}
                  <Table>
                    {statType === "batting" ? <PlayerStatsTable matches={seriesDetails} batting /> : <PlayerStatsTable matches={seriesDetails} bowling />}
                  </Table></div>}
              {seriesDetails && <PlayerCharts allMatches={matches} seriesDetails={seriesDetails} playerId={id} />}
            </Grid>
          </Grid>
        </PlayerStats>
      </Details>
    </Container>
  );
}

export default PlayerDetail;
