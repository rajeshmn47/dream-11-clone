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
import PlayersTable from './analytics/playersTable';
import PointsTable from './analytics/pointsTable';

const Container = styled.div`
  position: relative;
  padding: 0 15px;
  .MuiBox-root {
    padding: 0 !important;
  }
  a{
    text-decoration:none;
  }
  a:hover{
    text-decoration:underline;
}
  @media only screen and (max-width: 576px) {
    padding:0 15px;
  }
  @media only screen and (min-width: 600px) {
    padding:0 40px;
  }
`;

const PlayerImage = styled.img`
  width:60px;
`;

const SeriesName = styled.h3`
  padding:5px;
  font-weight:400;
  font-size:18px;
  text-align:center;
  margin: 20px 0;
`

const MainHeading = styled.h3`
  font-weight:400;
  font-size:18px;
  text-align:left;
  margin-top: 20px;
  margin-bottom:10px;
`

const Title = styled.div`
border-bottom:1px solid #ccc;
  font-weight:200;
  font-size:12px;
  padding:5px 5px;
`

const Details = styled.div`
padding:15px 30px;
`;
const Series = styled.div`
padding:15px 30px;
a{
  text-decoration:none;
}
`;
const KeyStats = styled(Grid)`
justify-content:center;
align-items:center;
`;
const KeyStat = styled(Grid)`
a{
    color:inherit;
}
a:hover{
    text-decoration:underline;
}
`;
const StatContainer = styled.div`
border:1px solid rgba(224, 224, 224, 1);
border-radius:5px;
`
const Player = styled.div`
padding:2px 10px;
display:flex;
align-items:center;
justify-content:space-between;
`;
const Name = styled.h3`
width:140px;
text-transform:capitalize;
white-space:nowrap;
`;
const NameContainer = styled.div`
width:140px;
text-transform:capitalize;
`;
const TeamName = styled.h3`
width:140px;
text-transform:capitalize;
font-size:14px;
font-weight:200;
`;
const Stat = styled.h3`
width: 50px;
text-align: right;
`;

const Table = styled.div`
`;

const ImageContainer = styled.div`
display:flex;
justify-content:center;
align-items:flex-end;
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
`

export function SeriesDetails() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { state } = useLocation();
    const [match, setMatch] = useState(null);
    const { name } = useParams();
    const [seriesDetails, setSeriesDetails] = useState();
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [allteams, setAllteams] = useState([])
    const [seriesNames, setSeriesNames] = useState();

    useEffect(() => {
        async function getplayers() {
            if (name) {
                const data = await API.get(
                    `${URL}/seriesDetails/${name}`,
                );
                console.log(data.data.series, 'series');
                setSeriesDetails(data.data.series);
                setPlayers([...data.data.sortedplayers])
                const teamdata = await API.get(
                    `${URL}/pointsTable/${name}`,
                );
                setAllteams(teamdata.data.allteams);
            }
        }
        getplayers();
    }, [name]);

    useEffect(() => {
        let AllSeriesNames = matches.map((match) => match.matchdetails[0].matchTitle);
        let unique = AllSeriesNames.filter((item, i, ar) => ar.indexOf(item) === i);
        setSeriesNames([...unique])
    }, [matches])
    function getPlayer(type) {
        if (players?.length > 0) {
            if (type == "runs") {
                // return [];
                let sortArray = [...players];
                let p = [...sortArray.sort((a, b) => b?.totalScore - a?.totalScore)][0]
                return p;
            }
            if (type == "fours") {
                //return [];
                let sortArray = [...players];
                let p = [...sortArray.sort((a, b) => b?.totalFours - a?.totalFours)][0]
                return p;
            }
            if (type == "sixes") {
                //return [];
                let sortArray = [...players];
                let p = [...sortArray.sort((a, b) => b?.totalSixes - a?.totalSixes)][0];
                return p;
            }
            if (type == "wickets") {
                //return [];
                let sortArray = [...players];
                let p = [...sortArray.sort((a, b) => b?.totalWickets - a?.totalWickets)][0]
                return p;
            }
        }
    }
    return (
        <Container>
            <SeriesName>{seriesDetails?.length > 0 && seriesDetails[0]?.matchTitle}</SeriesName>
            <MainHeading>Key Stats</MainHeading>
            <KeyStats container spacing={2}>
                <KeyStat item md={3} lg={3} xs={12} sm={12}>
                    <StatContainer>
                        <Title>
                            Most Runs
                        </Title>
                        <Player>
                            <PlayerImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${getPlayer('runs')?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                            <NameContainer>
                                <Link to={`../player/${getPlayer('runs')?.playerId}`}>
                                    <Name>{getPlayer('runs')?.playerName}</Name>
                                </Link>
                                <TeamName>{getPlayer('runs')?.teamName}</TeamName>
                            </NameContainer>
                            <Stat>{getPlayer('runs')?.totalScore}</Stat>
                        </Player>
                    </StatContainer>
                </KeyStat>
                <KeyStat item md={3} lg={3} xs={12} sm={12} >
                    <StatContainer>
                        <Title>
                            Most Wickets
                        </Title>
                        <Player>
                            <PlayerImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${getPlayer('wickets')?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                            <NameContainer>
                                <Link to={`../player/${getPlayer('wickets')?.playerId}`}>
                                    <Name>{getPlayer('wickets')?.playerName}</Name>
                                </Link>
                                <TeamName>{getPlayer('wickets')?.teamName}</TeamName>
                            </NameContainer>
                            <Stat>{getPlayer('wickets')?.totalWickets}</Stat>
                        </Player>
                    </StatContainer>
                </KeyStat>

                <KeyStat item md={3} lg={3} xs={12} sm={12}>
                    <StatContainer>
                        <Title>
                            Most Sixes
                        </Title>
                        <Player>
                            <PlayerImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${getPlayer('sixes')?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                            <NameContainer>
                                <Link to={`../player/${getPlayer('sixes')?.playerId}`}>
                                    <Name> {getPlayer('sixes')?.playerName}</Name >
                                </Link>
                                <TeamName>{getPlayer('sixes')?.teamName}</TeamName>
                            </NameContainer>
                            <Stat>{getPlayer('sixes')?.totalSixes}</Stat>
                        </Player >
                    </StatContainer>
                </KeyStat >
                <KeyStat item md={3} lg={3} xs={12} sm={12}>
                    <StatContainer>
                        <Title>
                            Most Fours
                        </Title>
                        <Player>
                            <PlayerImage src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${getPlayer('fours')?.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
                            <NameContainer>
                                <Link to={`../player/${getPlayer('fours')?.playerId}`}>
                                    <Name>{getPlayer('fours')?.playerName}</Name>
                                </Link>
                                <TeamName>{getPlayer('fours')?.teamName}</TeamName>
                            </NameContainer>
                            <Stat>{getPlayer('fours')?.totalFours}</Stat>
                        </Player>
                    </StatContainer>
                </KeyStat >
            </KeyStats >
            <MainHeading>Player Stats</MainHeading>
            <Table>
                <PlayersTable players={players} />
            </Table>
            <MainHeading>Points Table</MainHeading>
            <Table>
                <PointsTable allteams={allteams} />
            </Table>
        </Container >
    );
}

export default SeriesDetails;
