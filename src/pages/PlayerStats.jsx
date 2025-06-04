import { useLocation, useNavigate } from "react-router-dom";
import stats from "../data/stat5.json";
import players from "../data/players.json";
import matches from "../data/matches2024.json";
import "./PlayerStats.scss";

function PlayerStats() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerId, matchId } = location.state || {};

  const statLabels = {
    goal: "⚽ 골",
    assist: "🎯 어시스트",
    pass_accuracy: "📊 패스 정확도",
    key_pass: "🔑 키 패스",
    shoot: "🥅 슈팅 수",
    dribble: "💫 드리블 성공",
    tackle: "🛡️ 태클",
    clearance: "🧱 걷어내기",
    block: "🚫 슈팅 차단",
    aerial: "📈 공중볼 경합",
    save: "🧤 선방",
    conceded: "💥 실점",
    clean_sheet: "🧼 클린 시트",
    rating: "⭐ 평점",
  };

  if (!playerId || !matchId) {
    return <p>❗선수 또는 경기 정보가 없습니다.</p>;
  }

  const player = players.find((p) => p.id === playerId);
  const match = matches.find((m) => m.id === matchId);
  const stat = stats[matchId]?.[playerId];

  if (!stat) {
    return <p>⚠️ 해당 경기의 실적 정보가 없습니다.</p>;
  }

  const position = stat.position || player.position;

  const statKeysToShowByPosition = {
    FW: ["goal", "assist", "shoot", "rating"],
    MF: ["assist", "pass_accuracy", "key_pass", "tackle", "rating"],
    DF: ["clearance", "tackle", "block", "aerial", "rating"],
    GK: ["save", "conceded", "clean_sheet", "rating"],
  };

  const keysToShow = statKeysToShowByPosition[position] || Object.keys(stat);

  return (
    <div className="player-stats-page">
      <h1>
        {player.name} - vs {match.opponent}
      </h1>
      <p>
        <strong>{match.date}</strong> | {match.location} | {match.result}
      </p>

      <div className="stat-cards">
        {keysToShow.map((key) =>
          stat[key] !== undefined ? (
            <div key={key}>
              {statLabels[key] || key}:{" "}
              {key === "pass_accuracy" ? `${stat[key]}%` : stat[key]}
            </div>
          ) : null
        )}
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate(-1)}>← 이전으로</button>
        <button onClick={() => navigate("/")}>🏠 홈으로</button>
      </div>
    </div>
  );
}

export default PlayerStats;
