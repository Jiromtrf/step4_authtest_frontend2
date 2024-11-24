import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Skills {
  biz: number;
  design: number;
  tech: number;
}

interface RadarChartProps {
  skills: Skills;
}

export default function RadarChart({ skills }: RadarChartProps) {
  const data = {
    labels: ["Biz", "Design", "Tech"],
    datasets: [
      {
        label: "Your Skills",
        data: [skills.biz, skills.design, skills.tech],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // サイズ調整を有効にする
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 100, // スケールの上限を調整
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        angleLines: {
          color: "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <Radar data={data} options={options} />
    </div>
  );
}
