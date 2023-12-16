import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const CompareStatistic = ({ title, previous, latest, precision }) => {
  let col;
  let prefix;
  if (previous === latest) {
    col = "black";
    prefix = <></>;
  } else if (previous < latest) {
    col = "#3f8600";
    prefix = <ArrowUpOutlined />;
  } else {
    col = "#cf1322";
    prefix = <ArrowDownOutlined />;
  }

  return (
    <Statistic
      title={title}
      value={latest}
      precision={precision}
      valueStyle={{ color: col }}
      prefix={prefix}
    />
  )
}

const TokenStatistic = ({ transformedData }) => {
  const [DOTPrice, setDOTPrice] = useState();
  useEffect(() => {
    async function getDOTPrice() {
      const response = await fetch(`https://api.coincap.io/v2/assets/polkadot`);
      const data = await response.json();
      return data["data"]["priceUsd"];
    }
    getDOTPrice().then(price => setDOTPrice(price));
  }, []);

  const preData = transformedData[transformedData.length - 2];
  const latestData = transformedData[transformedData.length - 1];
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
      <Card bordered={false}>
        <CompareStatistic
          title="LDOT/DOT"
          previous={preData["exchangeRate"]}
          latest={latestData["exchangeRate"]}
          precision={3}
        />
      </Card>
      <Card bordered={false}>
        <Statistic
          title="DOT Price"
          value={DOTPrice}
          prefix="$"
          precision={2}
        />
      </Card>
      <Card bordered={false}>
        <Statistic
          title="LDOT Price"
          value={DOTPrice * latestData["exchangeRate"]}
          prefix="$"
          precision={2}
        />
      </Card>
      <Card bordered={false}>
        <CompareStatistic
          title="Total Locked DOT"
          previous={preData["totalDOT"]}
          latest={latestData["totalDOT"]}
          precision={0}
        />
      </Card>
      <Card bordered={false}>
        <CompareStatistic
          title="Total Locked LDOT"
          previous={preData["totalLDOT"]}
          latest={latestData["totalLDOT"]}
          precision={0}
        />
      </Card>
    </div>
  )
}

export default TokenStatistic;