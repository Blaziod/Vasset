import Plot from "react-plotly.js";

const PieChart = () => {
  const data = [
    {
      values: [24543, 32098, 74345],
      labels: ["Available Balance", "Locked Asset", "In Total Trust Fund"],
      type: "pie",
    },
  ];

  const layout = {
    height: 400,
    width: 500,
  };

  return <Plot data={data} layout={layout} />;
};

export default PieChart;
