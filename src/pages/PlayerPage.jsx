import { useParams, useNavigate } from "react-router-dom";
import players from "../data/players.json";
import matches from "../data/matches2024.json";
import mergedStats from "../data/stat6.json";
import PlayerRatingChart from "../components/PlayerRatingChart";
import PlayerRadarChart from "../components/PlayerRadarChart";
import "./PlayerPage.scss";

function PlayerPage() {
  const { id: playerId } = useParams();
  const navigate = useNavigate();

  const player = players.find((p) => p.id === playerId);
  if (!player) return <p>선수 정보를 찾을 수 없습니다.</p>;

  const playerStats = Object.entries(mergedStats)
    .filter(([_, matchStats]) => matchStats[playerId])
    .map(([_, matchStats]) => matchStats[playerId]);

  const originalStats = playerStats.map((s) => s.original);
  const normalizedStats = playerStats.map((s) => s.normalized);

  const getAverageFromOriginal = (key) => {
    const values = originalStats
      .map((s) => s[key])
      .filter((v) => typeof v === "number");
    if (values.length === 0) return "-";
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const avgRating = getAverageFromOriginal("rating");
  const avgConceded = () => getAverageFromOriginal("conceded");
  const avgPassAccuracy = () => getAverageFromOriginal("pass_accuracy");

  const positionStatText = {
    FW: () => `⚽ 평균 골: ${getAverageFromOriginal("goal")}`,
    MF: () => `📊 평균 패스 정확도: ${avgPassAccuracy()}%`,
    DF: () => `🧱 평균 클리어링: ${getAverageFromOriginal("clearance")}`,
    GK: () => `🥅 평균 실점: ${avgConceded()}`,
  };

  const radarData = {};
  const sample = normalizedStats[0] || {};
  Object.keys(sample).forEach((key) => {
    const values = normalizedStats
      .map((s) => s[key])
      .filter((v) => typeof v === "number");
    if (values.length) {
      radarData[key] = (
        values.reduce((a, b) => a + b, 0) / values.length
      ).toFixed(1);
    }
  });

  const recentMatches = matches
    .filter((m) => m.players?.includes(playerId))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="player-page">
      <div className="box">
        <div>
          <h2>{player.name}</h2>
          <img
            src={`/players/${player.id}.png`}
            alt={player.name}
            className="profile"
          />
          <p>
            <strong>{player.position}</strong> | {player.team}
          </p>

          <div className="averages">
            <p>⭐ 평균 평점: {avgRating}</p>
            <p>{positionStatText[player.position]?.()}</p>
          </div>
        </div>

        <div className="recent-matches">
          <h4>🕒 최근 경기</h4>
          {recentMatches.map((m) => (
            <p key={m.id}>
              {m.date} - vs {m.opponent} ({m.result})
            </p>
          ))}
          <button
            className="view-all-button"
            onClick={() => navigate(`/match?player=${playerId}`)}
          >
            전체 경기 보기 →
          </button>
        </div>

        <div className="radar">
          <PlayerRadarChart stat={radarData} />
        </div>
      </div>

      <div className="main">
        <PlayerRatingChart className="chart" playerId={playerId} />

        <div className="nav-buttons">
          <button onClick={() => navigate(-1)}>← 이전으로</button>
          <button onClick={() => navigate("/")}>🏠 홈</button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
