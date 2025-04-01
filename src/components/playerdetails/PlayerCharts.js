import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, getWeek, parseISO } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h3`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 15px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
  font-size: 16px;
`;

const PlayerCharts = ({ allMatches, seriesDetails, playerId }) => {
  const [viewType, setViewType] = useState('batting');
  const [timeFrame, setTimeFrame] = useState('yearly');
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    const filterMatchesByTimeFrame = (matches, timeFrame) => {
      if (allMatches?.length) {
        const now = new Date();
        let startDate;

        switch (timeFrame) {
          case 'weekly':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 120);
            break;
          case 'monthly':
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 12);
            break;
          case 'yearly':
          default:
            startDate = new Date(now);
            startDate.setFullYear(now.getFullYear() - 10);
            break;
        }
        return matches.filter(match => new Date(match.date) >= startDate);
      };
    }
    const playerMatches = filterMatchesByTimeFrame(allMatches?.filter(match =>
      match.teamHomePlayers.some(player => player.playerId === playerId) ||
      match.teamAwayPlayers.some(player => player.playerId === playerId)
    ), timeFrame);
    console.log(playerMatches, 'player mtches')
    setFilteredMatches(playerMatches);
  }, [allMatches, timeFrame, playerId]);

  const recentMatches = filteredMatches?.map(match => {
    const isHome = match.teamHomePlayers.some(player => player.playerId === playerId);
    const playerStats = isHome
      ? match.teamHomePlayers.find(player => player.playerId === playerId)
      : match.teamAwayPlayers.find(player => player.playerId === playerId);

    return {
      date: match.date,
      runs: playerStats.runs,
      balls: playerStats.balls,
      wickets: playerStats.wickets,
      economy: playerStats.economy,
    };
  });

  const averageStats = recentMatches?.reduce((acc, match) => {
    acc.runs += match.runs;
    acc.balls += match.balls;
    acc.wickets += match.wickets;
    acc.economy += match.economy;
    return acc;
  }, { runs: 0, balls: 0, wickets: 0, economy: 0 });

  const numMatches = recentMatches?.length;
  const averages = {
    runs: numMatches ? (averageStats?.runs / numMatches).toFixed(2) : 0,
    strikeRate: averageStats?.balls ? ((averageStats.wickets / averageStats.balls) * 100).toFixed(2) : 0,
    economy: numMatches ? (averageStats?.economy / numMatches).toFixed(2) : 0,
  };

  console.log('Filtered Matches:', allMatches);
  console.log('Recent Matches:', recentMatches);
  console.log('Averages:', averages);

  const chartLabels = recentMatches?.map(match => {
    if (timeFrame === 'weekly') {
      return `Week ${getWeek(parseISO(match.date))}`;
    } else if (timeFrame === 'monthly') {
      return format(parseISO(match.date), 'MMM yyyy');
    } else {
      return format(parseISO(match.date), 'yyyy');
    }
  });

  const battingChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Runs',
        data: recentMatches?.map(match => match.runs),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
    ],
  };

  const bowlingChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Wickets',
        data: recentMatches?.map(match => match.wickets),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Economy',
        data: recentMatches?.map(match => match.economy),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <ChartContainer>
      <Heading>Player Performance Averages</Heading>
      <FilterContainer>
        <Label>
          View Type:
          <Select value={viewType} onChange={(e) => setViewType(e.target.value)}>
            <option value="batting">Batting</option>
            <option value="bowling">Bowling</option>
          </Select>
        </Label>
        <Label>
          Time Frame:
          <Select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </Label>
      </FilterContainer>
      <p>Average Runs: {averages.runs}</p>
      <p>Strike Rate: {averages.strikeRate}</p>
      <p>Average Economy: {averages.economy}</p>
      <Heading>{viewType.charAt(0).toUpperCase() + viewType.slice(1)} Performance</Heading>
      <div style={{ height: '300px' }}>
        {viewType === 'batting' && <Bar data={battingChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Batting Performance' } } }} />}
        {viewType === 'bowling' && <Bar data={bowlingChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Bowling Performance' } } }} />}
      </div>
    </ChartContainer>
  );
};

export default PlayerCharts;

Date.prototype.getWeek = function () {
  const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
  const pastDaysOfYear = (this - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

