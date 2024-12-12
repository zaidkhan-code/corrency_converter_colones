import "./chart.css";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
function Chartactive({ chartData }) {
  const [data, setData] = useState([["data", "prices"]]);
  useEffect(() => {
    let dataCopy = [["date", "prices"]];
    if (chartData.prices) {
      chartData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [chartData]);

  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
}

export default Chartactive;
