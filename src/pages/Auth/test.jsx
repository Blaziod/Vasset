import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const CryptoChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365`
      );

      const chartData = {
        x: result.data.prices.map((price) => new Date(price[0])),
        close: result.data.prices.map((price) => price[1]),
        decreasing: { line: { color: "red" } },
        increasing: { line: { color: "green" } },
        type: "candlestick",
        xaxis: "x",
        yaxis: "y",
      };

      setData([chartData]);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60 * 1000); // update every minute

    return () => clearInterval(intervalId); // clean up on component unmount
  }, []);

  const layout = {
    dragmode: "zoom",
    showlegend: false,
    xaxis: {
      rangeslider: {
        visible: false,
      },
    },
  };

  return <Plot data={data} layout={layout} />;
};

export default CryptoChart;
