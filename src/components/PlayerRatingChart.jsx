import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import stats from "../data/stat5.json";
import matches from "../data/matches2024.json";

function PlayerRatingChart({ playerId }) {
  const matchList = matches
    .filter((match) => stats[match.id])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = matchList.map((match) => {
    const rating = stats[match.id]?.[playerId]?.rating;
    return {
      name: match.date.slice(5),
      rating: typeof rating === "number" ? rating : null,
    };
  });

  const hasMissing = chartData.some((d) => d.rating === null);

  return (
    <div style={{ width: "100%", height: 220, marginBottom: "1rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        📈 경기별 평점 추이
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="rating"
            stroke="#2f855a"
            fill="#c6f6d5"
            fillOpacity={0.5}
            dot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {hasMissing && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            textAlign: "center",
            color: "#777",
          }}
        >
          ※ 일부 경기는 평점이 없어 그래프에 표시되지 않았습니다.
        </p>
      )}
    </div>
  );
}

export default PlayerRatingChart;
