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

const Container = styled.div`
  position: relative;
  .MuiBox-root {
    padding: 0 !important;
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
padding:15px 30px;
a{
  text-decoration:none;
}
@media only screen and (max-width: 576px) {
   padding:15px 15px;
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
border: 1px solid #ccc;
padding: 15px 15px;
justify-content:center;
display:flex;
align-items:center;
flex-direction:column;
width: 100px;
border-collapse:collapse;
`;

const Heading = styled.h3`
margin: 0 auto;
margin-bottom: 10px;
margin-top:15px;
`

export function PlayerDetail() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [playerDetail, setPlayerDetail] = useState();
  const [matches, setMatches] = useState([]);
  const [seriesNames, setSeriesNames] = useState();

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
    let AllSeriesNames = matches.map((match) => match.matchdetails[0].matchTitle);
    let unique = AllSeriesNames.filter((item, i, ar) => ar.indexOf(item) === i);
    setSeriesNames([...unique])
  }, [matches])

  return (
    <Container>
      <Player>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6} sm={4} xs={4}>
            <ImageContainer>
              <img src={getImgurl(playerDetail?.image, playerDetail?.name)} alt="" />
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
          <Grid item md={6} lg={6}>
            <Heading>Batting</Heading>
            <Grid container position="relative" overflow="scroll" flexWrap="nowrap" maxWidth="100%">
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
          <Grid item md={6} lg={6}>
            <Heading>Bowling</Heading>
            <Grid container position="relative">
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
      </Details>
      <Series>
        {seriesNames?.map((s) =>
          <div>
            <Link to={`../series/${s}`}>{s}</Link>
          </div>)}
      </Series>
    </Container>
  );
}

export default PlayerDetail;
