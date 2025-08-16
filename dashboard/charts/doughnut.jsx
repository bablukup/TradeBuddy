import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Chart.js elements register
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Doughnut data={data} />
    </div>
  );
}
