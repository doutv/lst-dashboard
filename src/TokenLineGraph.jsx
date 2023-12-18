import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const TokenLineChart = ({ title, yDataKey, transformedData, color }) => {
  const maxY = Math.max(...transformedData.map(item => item[yDataKey]));
  return <>
    {title ? <h2>{title}</h2> : <></>}
    <LineChart
      width={600}
      height={300}
      data={transformedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis type="number" domain={[0, maxY]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={yDataKey} stroke={color} dot={{ r: 1 }} />
    </LineChart>
  </>
}

export default TokenLineChart;