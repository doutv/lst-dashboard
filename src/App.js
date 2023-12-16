/* global BigInt */

import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import TokenLineChart from './TokenLineGraph';
import TokenStatistic from './TokenStatistic';
import "./App.css";

const TOKEN_QUERY = gql`
query{
  dailySummaries(orderBy: TIMESTAMP_DESC, first: 360) {
    nodes{
      timestamp
      totalVoidLiquid
      exchangeRate
      liquidIssuance
      bonded
      toBondPool
    }
  }
}
`;

const TOKEN_DECIMALS = 10;

const client = new ApolloClient({
  uri: 'https://api.polkawallet.io/acala-liquid-staking-subql',
  cache: new InMemoryCache(),
});

export const transformNodes = (nodes) => {
  return nodes.map(node => ({
    timestamp: node.timestamp.split("T")[0], // 2023-10-04T00:00:00 -> 2023-10-04
    exchangeRate: (parseInt(node.exchangeRate) / (10 ** TOKEN_DECIMALS)).toFixed(3),
    totalLDOT: ((parseInt(node.totalVoidLiquid) + parseInt(node.liquidIssuance)) / (10 ** TOKEN_DECIMALS)).toFixed(0),
    totalDOT: ((parseInt(node.bonded) + parseInt(node.toBondPool)) / (10 ** TOKEN_DECIMALS)).toFixed(0)
  })).reverse();
};

function TokenDashboard() {
  const { loading, error, data } = useQuery(TOKEN_QUERY, { client });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  if (error) { console.error(error); alert(error.message); }

  if (!loading && !error && data) {
    const transformedData = transformNodes(data.dailySummaries.nodes);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1>Acala LDOT Dashboard</h1>
        <TokenStatistic transformedData={transformedData} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TokenLineChart title="Exchange Rate" yDataKey="exchangeRate" transformedData={transformedData} color="#8884d8" />
          <TokenLineChart title="Total Locked DOT" yDataKey="totalDOT" transformedData={transformedData} color="#82ca9d" />
          <TokenLineChart title="Total Locked LDOT" yDataKey="totalLDOT" transformedData={transformedData} color="#ffc658" />
        </div>
      </div>
    );
  }
}

export default TokenDashboard;
