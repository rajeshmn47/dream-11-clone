import './../home.css';
import './../create.css';

import styled from '@emotion/styled';
import { Line } from "react-chartjs-2";
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
import { faker } from '@faker-js/faker';

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

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
const wickets = [0, 0, 0, 0, 'w', 'w', 0, 'w', 0, 0, 0, 0, 'w', 'w', 0, 0, 0, 0, 0, 'w']

function customRadius(context) {
    console.log(context, 'context');
    let index = context.dataIndex;
    return wickets[index] == "w" ?
        10 :
        2;
}

export const options = {
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
            display: true
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

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            borderColor: 'lightgrey',
            backgroundColor: 'lightgrey',
            yAxisID: 'y'
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            borderColor: 'lightblue',
            backgroundColor: 'lightblue',
            yAxisID: 'y',
        },
    ],
};

export function MatchAnalysis() {
    return <Line options={options} data={data} />;
}


export default MatchAnalysis;
