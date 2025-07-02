import { useParams, useNavigate } from "react-router-dom";
import players from "../data/players.json";
import stats from "../data/stat6.json";
import RadarChartCompare from "../components/RadarChartCompare";
import "./ComparePage.scss";

function ComparePage() {
  const { id1, id2 } = useParams();
  const navigate = useNavigate();

  const player1 = players.find((p) => p.id === id1);
  const player2 = players.find((p) => p.id === id2);

  const statKeysByPosition = {
    FW: ["rating", "goal", "assist", "shoot", "dribble", "pass_accuracy"],
    MF: ["rating", "assist", "pass_accuracy", "tackle", "key_pass"],
    DF: ["rating", "tackle", "clearance", "block", "aerial", "pass_accuracy"],
    GK: ["rating", "save", "conceded", "clean_sheet", "pass_accuracy", "aerial"],
  };

 const extractAverageStats = (playerId) => {
  const statEntries = Object.values(stats)
    .map((match) => match[playerId]?.normalized) // ← 여기!
    .filter(Boolean);

  const player = players.find((p) => p.id === playerId);
  const position = player?.position || "FW";

  const result = {
    name: player?.name || playerId,
    position,
  };

  const relevantKeys = statKeysByPosition[position] || [];

  relevantKeys.forEach((key) => {
    const values = statEntries
      .map((s) => s[key])
      .filter((v) => typeof v === "number");

    result[key] =
      values.length > 0
        ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1))
        : 0;
  });

  return result;
};


  const stat1 = extractAverageStats(id1);
  const stat2 = extractAverageStats(id2);

  const combinedStatKeys = Array.from(
    new Set([
      ...(statKeysByPosition[stat1.position] || []),
      ...(statKeysByPosition[stat2.position] || []),
    ])
  );

  return (
    <div className="compare-page">
      <h2>⚔️ 선수 비교</h2>
      <RadarChartCompare player1={stat1} player2={stat2} statKeys={combinedStatKeys} />

      <div className="nav-buttons">
        <button onClick={() => navigate(-1)}>← 이전</button>
        <button onClick={() => navigate("/")}>🏠 홈</button>
      </div>
    </div>
  );
}

export default ComparePage;
