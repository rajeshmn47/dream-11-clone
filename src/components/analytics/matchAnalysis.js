import './../home.css';
import './../create.css';

import styled from '@emotion/styled';
import { Line, Bar } from "react-chartjs-2";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { URL } from '../../constants/userConstants';
import { useEffect, useState } from 'react';
import { API } from '../../actions/userAction';
import ScoreTable from '../scorecard/scoretable'; // Import the ScoreTable component
import ScoreCard from '../scorecard/scorecard';
import { getmatch } from '../../actions/matchAction';

const Container = styled.div`
padding:20px 40px;
`;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function MatchAnalysis() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { match_details, matchlive } = useSelector((state) => state.match); ``
    const [labels, setFLabels] = useState([]);
    const [sLabels, setSLabels] = useState([]);
    const [fovers, setFOvers] = useState([]);
    const [sovers, setSOvers] = useState([]);
    const [bfovers, setBFOvers] = useState([]);
    const [bsovers, setBSOvers] = useState([]);
    const [fwickets, setFWickets] = useState([]);
    const [swickets, setSWickets] = useState([]);
    const [firstTeam, setFirstTeam] = useState([]);
    const [secondTeam, setSecondTeam] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamData, setTeamData] = useState([]); // State to store team data for the ScoreTable

    function customRadius(context) {
        let index = context.dataIndex;
        if (context.dataset.label == firstTeam) {
            return fwickets[index] == "w" ? 10 : 2;
        } else {
            return swickets[index] == "w" ? 10 : 2;
        }
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: customRadius,
                display: true,
            }
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            }
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: firstTeam,
                data: sovers.map((f) => f.totalRuns),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: secondTeam,
                data: fovers.map((f) => f.totalRuns),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataBar = {
        labels: labels,
        datasets: [
            {
                label: firstTeam,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
                hoverBorderColor: "rgba(255, 99, 132, 1)",
                data: bfovers.map((f) => f.runs),
            },
            {
                label: secondTeam,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderColor: "rgba(53, 162, 235, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(53, 162, 235, 0.4)",
                hoverBorderColor: "rgba(53, 162, 235, 1)",
                data: bsovers.map((f) => f.runs),
            }
        ]
    };

    useEffect(() => {
        async function getplayers() {
            if (id) {
                let da = await API.get(`${URL}/match-details/${id}`);
                console.log(da, 'da');
                let firstTeamPlayers = da.data.match.firstInningsPlayers || [];
                let secondTeamPlayers = da.data.match.secondInningsPlayers || [];
                setTeamData([...firstTeamPlayers, ...secondTeamPlayers]);

                let k = [];
                let l = [];
                let fov = [];
                let sov = [];
                let bfov = [];
                let bsov = [];
                let fw = [];
                let sw = [];
                for (let i = 0; i < da.data.match?.secondInningsBalls?.length; i++) {
                    if (((i + 1) % 6 == 0) && i > 0) {
                        k.push(((i + 1) / 6).toString());
                        let ru = [...da.data.match.secondInningsBalls.sort((a, b) => a.ballNbr - b.ballNbr)];
                        let totalRuns = ru.slice(0, i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        let runs = ru.slice((i - 6), i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        sov.push({ overNumber: ((i + 1) / 6), totalRuns: totalRuns });
                        bsov.push({ overNumber: ((i + 1) / 6), runs: runs });
                        let w = ru.slice(i - 5, i + 1).find((r) => r.event == "w");
                        if (w) {
                            sw.push('w');
                        } else {
                            sw.push(0);
                        }
                    }
                }
                setSWickets([...sw]);
                for (let i = 0; i < da.data.match.firstInningsBalls.length; i++) {
                    if (((i + 1) % 6 == 0) && i > 0) {
                        l.push(((i + 1) / 6).toString());
                        let ru = [...da.data.match.firstInningsBalls.sort((a, b) => a.ballNbr - b.ballNbr)];
                        let totalRuns = ru.slice(0, i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        let runs = ru.slice((i - 6), i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        fov.push({ overNumber: ((i + 1) / 6), totalRuns: totalRuns });
                        bfov.push({ overNumber: ((i + 1) / 6), runs: runs });
                        let w = ru.slice(i - 5, i + 1).find((r) => r.event == "w");
                        if (w) {
                            fw.push('w');
                        } else {
                            fw.push(0);
                        }
                    }
                }
                setFWickets([...fw]);
                if (l > k) {
                    setFLabels([...l]);
                } else {
                    setFLabels([...k]);
                }
                setSOvers([...sov]);
                setFOvers([...fov]);
                setBSOvers([...bsov]);
                setBFOvers([...bfov]);

                let first_team = da.data.match.firstTeam ? da.data.match.firstTeam : 'first team';
                let second_team = da.data.match.secondTeam ? da.data.match.secondTeam : 'second team';
                setFirstTeam(first_team);
                setSecondTeam(second_team);
            }
        }
        getplayers();
    }, [user, id]);

    useEffect(() => {
        if (firstTeam) {
            setSelectedTeam(firstTeam);
        }
    }, [firstTeam]);

    useEffect(() => {
        async function getupcoming() {
            if (id?.length > 3) {
                dispatch(getmatch(id));
            }
        }
        getupcoming();
    }, [id]);

    console.log(firstTeam, secondTeam, 'wickets');

    return (
        <Container>
            <div>
                <h2>Scores Table</h2>
                <ScoreCard data={matchlive} />
            </div>
            <h1>Match Analysis</h1>
            {labels.length > 0 && firstTeam && secondTeam && <Line options={options} data={data} />}
            <div>
                {firstTeam && secondTeam && <Bar data={dataBar} options={options} width={100} height={50} />}
            </div>
        </Container>
    );
}

export default MatchAnalysis;
