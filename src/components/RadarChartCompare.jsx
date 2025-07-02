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

// Chart.js 요소 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChartCompare({ player1, player2, statKeys }) {
  // 항목별 한글 라벨
  const labels = {
    rating: "평점",
    goal: "골",
    assist: "어시스트",
    pass_accuracy: "패스 정확도",
    tackle: "태클",
    clearance: "클리어링",
    block: "슈팅 차단",
    aerial: "공중볼 경합",
    dribble: "드리블 성공",
    shoot: "슈팅 수",
    key_pass: "키 패스",
    save: "선방",
    conceded: "실점",
    clean_sheet: "클린 시트",
  };

  const data = {
    labels: statKeys.map((key) => labels[key] || key),
    datasets: [
      {
        label: player1.name,
        data: statKeys.map((key) => player1[key] ?? 0),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: player2.name,
        data: statKeys.map((key) => player2[key] ?? 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,
          backdropColor: "transparent",
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Radar data={data} options={options} />;
}

export default RadarChartCompare;