import { useLocation } from "react-router-dom";
import matchesData from "../data/matches2024.json";
import playersData from "../data/players.json";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectMatch.scss";

function MatchSelect() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const playerId = query.get("player");
  const navigate = useNavigate();

  if (!playerId) return <p>선수가 선택되지 않았습니다.</p>;

  const player = playersData.find((p) => p.id === playerId);
  if (!player) return <p>해당 선수 정보를 찾을 수 없습니다.</p>;

  const allMatches = matchesData.map((match) => ({
    ...match,
    month: match.date.slice(0, 7),
  }));

  const uniqueMonths = useMemo(() => {
    const months = allMatches.map((m) => m.month);
    return [...new Set(months)].sort();
  }, [allMatches]);

  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0]);

  const filteredMatches = allMatches.filter(
    (m) =>
      m.month === selectedMonth &&
      Array.isArray(m.players) &&
      m.players.includes(playerId)
  );

  return (
    <div className="select-match-page">
      <h2>경기를 선택하세요</h2>

      <div className="month-buttons">
        {uniqueMonths.map((month) => (
          <button
            key={month}
            className={selectedMonth === month ? "active" : ""}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="match-list">
        {filteredMatches.length === 0 ? (
          <p>해당 월에 출전한 경기가 없습니다.</p>
        ) : (
          filteredMatches.map((match) => (
            <div
              className="match-card"
              key={match.id}
              onClick={() =>
                navigate("/player-stats", {
                  state: { playerId, matchId: match.id },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <strong>{match.date}</strong> - vs {match.opponent} (
              {match.result})
              <br />
              <small>{match.location}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MatchSelect;
