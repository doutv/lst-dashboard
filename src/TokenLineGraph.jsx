import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { transformNodes } from './App';

const TokenLineGraph = ({ data }) => {
  // Transform the data into a suitable format
  const transformedData = transformNodes(data);

  return (
    <>
      <LineChart
        width={600}
        height={300}
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="exchangeRate" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      <LineChart
        width={600}
        height={300}
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalDOT" stroke="#82ca9d" />
      </LineChart>
      <LineChart
        width={600}
        height={300}
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalLDOT" stroke="#ffc658" />
      </LineChart>
    </>
  );
};

export default TokenLineGraph;

