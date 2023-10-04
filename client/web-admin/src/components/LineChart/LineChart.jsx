import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { options } from "../../service/options";

const LineChart = ({ labels, data, label }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const dataValues = {
    labels: labels,
    datasets: [
      {
        label: label,
        fill: true,
        data: data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
      },
    ],
  };
  return <Line options={options} data={dataValues} />;
};

export default LineChart;
