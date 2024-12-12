import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import { coinContext } from "../../context/coinCointext";
import Loader from "../../component/loader";
import Chart from "react-google-charts";
import Chartactive from "../../component/Chartactive";
function Coin() {
  const { coinid } = useParams();
  const { allCoin, currency } = useContext(coinContext);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([["Date", "prices"]]);
  useEffect(() => {
    // Find the coin data whenever coinid or allCoin changes
    const coinData = allCoin.find(
      (item) => item.id.toLowerCase() === coinid.toLowerCase()
    );
    setData(coinData || {}); // Set data or an empty object if not found
  }, [coinid, currency]); // Dependencies: only re-run when coinid or allCoin change
  const fetchfuntion = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": " 	CG-pxpKNRxvvSxt1PaF3WsEZ5Yz ",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setChartData(response))
      .catch((err) => console.error(err));
  };
  console.log(chartData);
  useEffect(() => {
    fetchfuntion();
  }, [currency, allCoin]);
  if (data) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={data.image} alt="" />
          <p>
            <b>
              {data.name}

            ({data.symbol})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <Chartactive chartData={chartData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{data.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {data.current_price}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {[data.market_cap].toLocaleString()}
              {[currency.name.toUpperCase()]}
            </li>
          </ul>
          <ul>
            <li>24 HOUR high</li>
            <li>
              {currency.symbol}
              {data.high_24h}
              {[currency.name.toUpperCase()]}
            </li>
          </ul>
          <ul>
            <li>24 HOUR LOW</li>
            <li>
              {currency.symbol}
              {data.low_24h}
              {[currency.name.toUpperCase()]}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default Coin;
