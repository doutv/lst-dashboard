/* global BigInt */

import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import TokenLineGraph from './TokenLineGraph';

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
    timestamp: node.timestamp,
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

  if (loading) return <p>Loading...</p>;
  if (error) { console.error(error); return <p>Error :{error.message}</p>; }

  if (!loading && !error && data) {
    return (
      <div>
        <h1>Token Dashboard</h1>
        <TokenLineGraph data={data.dailySummaries.nodes} />
        {/* Render your data here */}
        {transformNodes(data.dailySummaries.nodes).map((node, index) => (
          <div key={index}>
            <p>Timestamp: {node.timestamp}</p>
            <p>Exchange Rate: {node.exchangeRate}</p>
            <p>Total LDOT: {node.totalLDOT}</p>
            <p>Total DOT: {node.totalDOT}</p>
          </div>
        ))
        }
      </div>
    );
  }
}

export default TokenDashboard;
