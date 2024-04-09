import './create.css';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';
import { getImgurl } from '../utils/img_url';
import Loader from './loader';
import PlayerStatsTable from './analytics/playerStatsTable';

const Container = styled.div`
  position: relative;
  max-width:100%;
  overflow:hidden;
  .MuiBox-root {
    padding: 0 !important;
  }
  ::-webkit-scrollbar{
      width:5px;
      background-color:#000;
      }
      .statSelected{
  background: rgba(67, 108, 171, 0.1);
    border: 1px solid rgba(67, 108, 171, 0.2);
    padding:15px 15px;
    color:#1860a6;
}
.statNotSelected{
  background: #FFF;
  padding:15px 15px;
  color:#1860a6;
}
`;

const Flags = styled.div`
display:flex;
align-items:center;
`

const Flag = styled.img`
width:80px;
margin-right:10px;
@media only screen and (max-width: 576px) {
    width:40px;
  }
`

const Name = styled.h1`
font-size:50px;
color: #fff;;
font-weight:600;
text-transform:capitalize;
@media only screen and (max-width: 576px) {
    font-size:16px;
  }
`

const Player = styled.div`
background:  rgb(67, 108, 171);
height: 200px;
display:flex;
justify-content:center;
align-items:flex-end;
padding:15px 30px;
@media only screen and (max-width: 576px) {
   height:150px;
   justify-content:space-between;
   padding:15px 15px;
  }
`
const Details = styled.div`
padding:15px 30px;
@media only screen and (max-width: 576px) {
   padding:15px 15px;
  }
`

const Series = styled.div`
margin-top:10px;
a{
  text-decoration:none;
}
@media only screen and (max-width: 576px) {
  }
`

const ImageContainer = styled.div`
display:flex;
justify-content:center;
align-items:flex-end;
img{
  max-width:100%;
  @media only screen and (max-width: 576px) {
   width:100%;
  }
}
`;

const Match = styled.div`
border: 1px solid rgba(224, 224, 224, 1);
padding: 15px 5px;
justify-content:center;
display:flex;
align-items:center;
flex-direction:column;
width: 120px;
border-collapse:collapse;
p{overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
}
`;

const Heading = styled.h3`
margin: 0 auto;
margin-bottom: 10px;
margin-top:15px;
`;

const SeriesHeading = styled.h3`
margin: 0 auto;
margin-bottom: 10px;
margin-top:0px;
`;

const PlayerStats = styled.div`
margin-top:25px;
.selected{
  background: rgba(67, 108, 171, 0.1);
    border: 1px solid rgba(67, 108, 171, 0.2);
    padding:15px 0px;
}
.notSelected{
  background: #FFF;
  padding:15px 0px;
}
`;

const AllStats = styled.div`
margin: 0 auto;
margin-bottom: 10px;
margin-top:15px;
background: rgba(67, 108, 171, 0.1);
    border: 1px solid rgba(67, 108, 171, 0.2);
    padding: 15px 15px;
    display:flex;
    align-items:center;
`;

const Stat = styled.div`
margin: 0 auto;
margin-bottom: 10px;
margin-top:15px;
`;

const Table = styled.div`
padding:15px 0px;
a{
  text-decoration:none;
}
@media only screen and (max-width: 576px) {
   padding:15px 0px;
  }
`;

export function PlayerDetail() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [playerDetail, setPlayerDetail] = useState();
  const [matches, setMatches] = useState([]);
  const [seriesNames, setSeriesNames] = useState();
  const [seriesSelected, setSeriesSelected] = useState('Indian Premier League 2024');
  const [seriesDetails, setSeriesDetails] = useState([]);
  const [statType, setStatType] = useState('batting');
  const [mainInfo, setMainInfo] = useState('Indian Premier League 2024')

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
      if (user?._id) {
        const data = await API.get(
          `${URL}/playerSeriesDetails/${id}/${seriesSelected}`,
        );
        setSeriesDetails([...data.data.player]);
        setMainInfo(data.data.maininfo);
      }
    }
    getSeriesStats();
  }, [user, seriesSelected]);

  useEffect(() => {
    let AllSeriesNames = matches.map((match) => match.matchdetails[0].matchTitle);
    let unique = AllSeriesNames.filter((item, i, ar) => ar.indexOf(item) === i);
    setSeriesNames([...unique])
    setSeriesSelected(unique[0])
  }, [matches])
  console.log(seriesDetails, 'series details');
  return (
    <Container>
      <Player>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6} sm={4} xs={4}>
            <ImageContainer>
              <img src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${playerDetail?.id}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
            </ImageContainer></Grid>
          <Grid item md={6} lg={6} sm={8} xs={8}>
            <Flags>
              {playerDetail?.flagUrls?.length > 0 &&
                playerDetail?.flagUrls?.map((flag) => <Flag src={flag} alt="" />)}
            </Flags>
            <Name>
              {playerDetail?.name}
            </Name>
          </Grid>
        </Grid>
      </Player>
      <Details>
        <Grid container>
          <Grid item md={6} lg={6} xs={12} sm={12}>
            <Heading>Batting</Heading>
            <Grid container style={{ width: '90%', overflowX: "scroll" }} position="relative" flexWrap="nowrap">
              {matches?.length > 0 ? matches?.map((_doc) =>
                <Grid item>
                  {_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id) ?
                    <Match><p>
                      {_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id)?.runs}
                      ({_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id)?.balls})
                    </p>
                      <p>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    </Match> :
                    <Match>
                      <p>
                        {_doc?.teamAwayPlayers?.find((p) => p?.playerId == playerDetail?.id)?.runs}
                        ({_doc?.teamAwayPlayers?.find((p) => p?.playerId == playerDetail?.id)?.balls})
                      </p><p>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    </Match>}
                </Grid>
              ) : <Loader />}
            </Grid>
          </Grid>
          <Grid item md={6} lg={6} xs={12} sm={12}>
            <Heading>Bowling</Heading>
            <Grid container style={{ width: '90%', overflowX: "scroll" }} position="relative" flexWrap="nowrap" maxWidth="100%">
              {matches?.length > 0 ? matches?.map((_doc) =>
                <Grid item>
                  {_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id) ?
                    <Match><p>
                      {_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id)?.wickets}
                      {"-"}
                      {_doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id)?.runsConceded}
                    </p>
                      <p>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    </Match> :
                    <Match>
                      <p>
                        {_doc?.teamAwayPlayers?.find((p) => p?.playerId == playerDetail?.id)?.wickets}{"-"}
                        {_doc?.teamAwayPlayers?.find((p) => p?.playerId == playerDetail?.id)?.runsConceded}
                      </p><p>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    </Match>}
                </Grid>
              ) : <Loader />}
            </Grid>
          </Grid>
        </Grid>
        <PlayerStats>
          <Grid container spacing={2}>
            <Grid item md={4} lg={4} sm={12} xs={12}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item md={4} lg={4}>
                  Matches
                </Grid>
                <Grid item md={4} lg={4}>
                  <div className={statType == "batting" ? 'statSelected' : 'statNotSelected'} onClick={() => setStatType("batting")}>
                    Batting
                  </div>
                </Grid>
                <Grid item md={4} lg={4}>
                  <div className={statType == "bowling" ? 'statSelected' : 'statNotSelected'} onClick={() => setStatType("bowling")}>
                    Bowling
                  </div>
                </Grid>
              </Grid>
              <Series>
                {seriesNames?.map((s) =>
                  <div className={seriesSelected == s ? "selected" : "notSelected"}
                    onClick={() => setSeriesSelected(s)}>
                    <Link to={`../series/${s}`}>{s}</Link>
                  </div>)}
              </Series>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <SeriesHeading>T20</SeriesHeading>
              {statType == "batting" ? <AllStats>
                <Stat>{mainInfo?.runs} Runs</Stat><Stat>{mainInfo?.innings} Inns</Stat><Stat>{Math.floor(mainInfo?.average)} Average</Stat><Stat>{mainInfo?.strikeRate} Strike rate</Stat>
              </AllStats> : <AllStats>
                <Stat>{mainInfo?.wickets} Wkts</Stat><Stat>{mainInfo?.innings} Inns</Stat><Stat>{Math.floor(mainInfo?.economy)} Economy</Stat><Stat>{mainInfo?.strikeRate} Strike rate</Stat>
              </AllStats>}
              <Table>
                {statType == "batting" ? <PlayerStatsTable matches={seriesDetails} batting /> : <PlayerStatsTable matches={seriesDetails} bowling />}
              </Table>
            </Grid>
          </Grid>
        </PlayerStats>
      </Details>
    </Container>
  );
}

export default PlayerDetail;
