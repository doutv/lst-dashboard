import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { transformNodes } from './App';


const TokenLineChart = ({ title, yDataKey, transformedData, color }) => {
  return <>
    <h2>{title}</h2>
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
      <Line type="monotone" dataKey={yDataKey} stroke={color} dot={{ r: 1 }} />
    </LineChart>
  </>
}

const TokenLineGraph = ({ data }) => {
  // Transform the data into a suitable format
  const transformedData = transformNodes(data);

  return (
    <>
      <TokenLineChart title="Exchange Rate" yDataKey="exchangeRate" transformedData={transformedData} color="#8884d8" />
      <TokenLineChart title="Total DOT" yDataKey="totalDOT" transformedData={transformedData} color="#82ca9d" />
      <TokenLineChart title="Total LDOT" yDataKey="totalLDOT" transformedData={transformedData} color="#ffc658" />
    </>
  );
};

export default TokenLineGraph;