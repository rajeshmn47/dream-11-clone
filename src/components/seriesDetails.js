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
import PlayersTable from './playersTable';

const Container = styled.div`
  position: relative;
  .MuiBox-root {
    padding: 0 !important;
  }
`;

const PlayerImage = styled.img`
  width:80px;
`

const Title = styled.div`
border-bottom:1px solid #ccc;
  padding:5px;
  font-weight:200;
  font-size:12px;
`

const Details = styled.div`
padding:15px 30px;
`

const Series = styled.div`
padding:15px 30px;
a{
  text-decoration:none;
}
`;

const KeyStats = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
width:100%;
align-items:center;
`;
const KeyStat = styled.div`
margin:10px 0;
border:1px solid #ccc;
width: 360px;
`
const Player = styled.div`
padding:2px 10px;
display:flex;
align-items:center;
justify-content:space-between;
`;
const Name = styled.h3`
width:100px;
text-transform:capitalize;
`;
const NameContainer = styled.div`
width:100px;
text-transform:capitalize;
`;
const TeamName = styled.h3`
width:100px;
text-transform:capitalize;
font-size:14px;
font-weight:200;
`;
const Stat = styled.h3`

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
    const [seriesNames, setSeriesNames] = useState();

    useEffect(() => {
        async function getplayers() {
            if (user?._id) {
                const data = await API.get(
                    `${URL}/seriesDetails/${name}`,
                );
                console.log(data.data.series, 'series');
                setSeriesDetails(data.data.series);
                setPlayers([...data.data.sortedplayers])
            }
        }
        getplayers();
    }, [user, name]);

    useEffect(() => {
        let AllSeriesNames = matches.map((match) => match.matchdetails[0].matchTitle);
        let unique = AllSeriesNames.filter((item, i, ar) => ar.indexOf(item) === i);
        setSeriesNames([...unique])
    }, [matches])

    return (
        <Container>
            <KeyStats>
                <KeyStat>
                    <Title>
                        Most Runs
                    </Title>
                    <Player>
                        <PlayerImage src={getImgurl(players.sort((a, b) => b.totalScore - a.totalScore)[0]?.image, players.sort((a, b) => b.totalScore - a.totalScore)[0]?.playerName)} alt="" />
                        <NameContainer>
                            <Name> {players.sort((a, b) => b.totalScore - a.totalScore)[0]?.playerName}</Name>
                            <TeamName>{players.sort((a, b) => b.totalScore - a.totalScore)[0]?.teamName}</TeamName>
                        </NameContainer>
                        <Stat>{players.sort((a, b) => b.totalScore - a.totalScore)[0]?.totalScore}</Stat>
                    </Player>
                </KeyStat>
                <KeyStat>
                    <Title>
                        Most Wickets
                    </Title>
                    <Player>
                        <PlayerImage src={getImgurl(players.sort((a, b) => b.totalWickets - a.totalWickets)[0]?.image, players.sort((a, b) => b.totalWickets - a.totalWickets)[0]?.playerName)} alt="" />
                        <NameContainer>
                            <Name>{players.sort((a, b) => b.totalWickets - a.totalWickets)[0]?.playerName}</Name>
                            <TeamName>{players.sort((a, b) => b.totalWickets - a.totalWickets)[0]?.teamName}</TeamName>
                        </NameContainer>
                        <Stat>{players.sort((a, b) => b.totalWickets - a.totalWickets)[0]?.totalWickets}</Stat>
                    </Player>
                </KeyStat>
                <KeyStat>
                    <Title>
                        Most Sixes
                    </Title>
                    <Player>
                        <PlayerImage src={getImgurl(players.sort((a, b) => b.totalSixes - a.totalSixes)[0]?.image, players.sort((a, b) => b.totalSixes - a.totalSixes)[0]?.playerName)} alt="" />
                        <NameContainer>
                            <Name> {players.sort((a, b) => b.totalSixes - a.totalSixes)[0]?.playerName}</Name >
                            <TeamName>{players.sort((a, b) => b.totalSixes - a.totalSixes)[0]?.teamName}</TeamName>
                        </NameContainer>
                        <Stat>{players.sort((a, b) => b.totalSixes - a.totalSixes)[0]?.totalSixes}</Stat>
                    </Player >
                </KeyStat >
                <KeyStat>
                    <Title>
                        Most Fours
                    </Title>
                    <Player>
                        <PlayerImage src={getImgurl(players.sort((a, b) => b.totalFours - a.totalFours)[0]?.image, players.sort((a, b) => b.totalFours - a.totalFours)[0]?.playerName)} alt="" />
                        <NameContainer>
                            <Name>{players.sort((a, b) => b.totalFours - a.totalFours)[0]?.playerName}</Name >
                            <TeamName>{players.sort((a, b) => b.totalFours - a.totalFours)[0]?.teamName}</TeamName>
                        </NameContainer>
                        <Stat>{players.sort((a, b) => b.totalFours - a.totalFours)[0]?.totalFours}</Stat>
                    </Player>
                </KeyStat >
            </KeyStats >
            <Table>
                <PlayersTable players={players} />
            </Table>
            <Series>
                {seriesDetails?.map((s) =>
                    <div>
                        <Link to={`../series/${s.Title}`}>{s?.teamHomeName}</Link>
                    </div>)}
            </Series>
        </Container >
    );
}

export default SeriesDetails;
