import './../home.css';
import './../create.css';

import styled from '@emotion/styled';
import { Line } from "react-chartjs-2";
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { URL } from '../../constants/userConstants';
import { useEffect, useState } from 'react';
import { API } from '../../actions/userAction';
import "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

const Container = styled.div`

`;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

//const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

export function MatchAnalysis() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
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
    const [selectedTeam, setSelectedTeam] = useState('')
    function customRadius(context) {
        console.log(context.dataset, Array.prototype, 'context');
        let index = context.dataIndex;
        if (context.dataset.label == firstTeam) {
            return fwickets[index] == "w" ?
                10 :
                2;
        }
        else {
            return swickets[index] == "w" ?
                10 :
                2;
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

    {/*const data = {
        fLabels,
        datasets: [
            {
                label: 'Dataset 2',
                data: [2, 5, 6],
                borderColor: 'lightblue',
                backgroundColor: 'lightblue',
                yAxisID: 'y',
            },
        ],
    };*/}
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
                backgroundColor: "#EC932F",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: (bfovers.map((f) => f.runs)),
            },
            {
                label: secondTeam,
                backgroundColor: "#EC932F",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: (bsovers.map((f) => f.runs)),
            }
        ]
    };

    useEffect(() => {
        async function getplayers() {
            if (id) {
                let da = await API.get(
                    `${URL}/match-details/${id}`,
                );
                console.log(da, 'da')
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
                        k.push(((i + 1) / 6).toString())
                        let ru = [...da.data.match.secondInningsBalls.sort((a, b) => a.ballNbr - b.ballNbr)];
                        let totalRuns = ru.slice(0, i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        let runs = ru.slice((i - 6), i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        //fov.push({ overNumber: ((i + 1) / 6), runs: runs })
                        sov.push({ overNumber: ((i + 1) / 6), totalRuns: totalRuns });
                        bsov.push({ overNumber: ((i + 1) / 6), runs: runs });
                        let w = ru.slice(i - 5, i + 1).find((r) => r.event == "w")
                        if (w) {
                            sw.push('w')
                        }
                        else {
                            sw.push(0)
                        }
                    }
                }
                setSWickets([...sw])
                for (let i = 0; i < da.data.match.firstInningsBalls.length; i++) {
                    if (((i + 1) % 6 == 0) && i > 0) {
                        l.push(((i + 1) / 6).toString())
                        let ru = [...da.data.match.firstInningsBalls.sort((a, b) => a.ballNbr - b.ballNbr)];
                        let totalRuns = ru.slice(0, i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        let runs = ru.slice((i - 6), i).reduce((accumulator, currentValue) => accumulator + currentValue.runs, 0);
                        fov.push({ overNumber: ((i + 1) / 6), totalRuns: totalRuns });
                        bfov.push({ overNumber: ((i + 1) / 6), runs: runs });
                        let w = ru.slice(i - 5, i + 1).find((r) => r.event == "w")
                        if (w) {
                            fw.push('w')
                        }
                        else {
                            fw.push(0)
                        }
                    }
                }
                setFWickets([...fw])
                if (l > k) {
                    setFLabels([...l]);
                }
                else {
                    setFLabels([...k]);
                }
                setSOvers([...sov]);
                setFOvers([...fov]);
                setBSOvers([...bsov]);
                setBFOvers([...bfov]);
                setFirstTeam(da.data.match.firstTeam);
                setSecondTeam(da.data.match.secondTeam);
            }
        }
        getplayers();
    }, [user, id]);
    useEffect(() => {
        if (firstTeam) {
            setSelectedTeam(firstTeam)
        }
    }, [firstTeam])
    console.log(labels, fwickets, 'wickets')
    return <>
        {labels.length > 0 && <Line options={options} data={data} />}
        <div>
            <Bar data={dataBar} options={options} width={100} height={50} />
        </div></>;
}


export default MatchAnalysis;
