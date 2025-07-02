import { useState } from "react";
import { useNavigate } from "react-router-dom";
import players from "../data/players.json";
import stats from "../data/stat5.json";
const positions = ["ALL", "FW", "MF", "DF", "GK"];

import "./SelectPlayer.scss";

function SelectPlayer() {
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState("rating");

  const filteredPlayers = players
    .filter(
      (p) =>
        (selectedPosition === "ALL" || p.position === selectedPosition) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name, "ko");
      }
      const aStat = getAverageStat(a.id, sortKey);
      const bStat = getAverageStat(b.id, sortKey);
      return bStat - aStat;
    });

  function getAverageStat(playerId, key) {
    const matches = Object.values(stats);
    const sample = matches.find((m) => m[playerId]);
    console.log("샘플 데이터:", sample);

    const values = matches
      .map((match) => {
        const playerStat = match[playerId];
        if (playerStat && typeof playerStat[key] === "number") {
          return playerStat[key];
        }
        return undefined;
      })
      .filter((v) => typeof v === "number");

    console.log(playerId, key, values);

    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  const toggleSelect = (id) => {
    if (compareMode) {
      setSelected((prev) =>
        prev.includes(id)
          ? prev.filter((pid) => pid !== id)
          : [...prev, id].slice(-2)
      );
    } else {
      navigate(`/player/${id}`);
    }
  };

  const handleCompareClick = () => {
    if (compareMode) {
      if (selected.length !== 2) {
        alert("두 명의 선수를 선택해 주세요.");
        return;
      }
      const player1 = players.find((p) => p.id === selected[0]);
      const player2 = players.find((p) => p.id === selected[1]);
      if (player1.position !== player2.position) {
        alert("같은 포지션의 두 선수를 선택해 주세요.");
        return;
      }
      navigate(`/compare/${selected[0]}/${selected[1]}`);
    } else {
      setCompareMode(true);
      setSelected([]);
    }
  };
  return (
    <div className="select-player-page">
      <h2>선수를 선택하세요</h2>

      <div className="header"></div>
      <div className="position-filter">
        {positions.map((pos) => (
          <button
            key={pos}
            className={selectedPosition === pos ? "active" : ""}
            onClick={() => setSelectedPosition(pos)}
          >
            {pos}
          </button>
        ))}

        <button onClick={handleCompareClick} className="compare-button">
          {compareMode ? "⚔️비교하기⚔️" : "⚔️비교 모드⚔️"}
        </button>
        <input
          type="text"
          placeholder="🔎선수 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="player-search"
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
        <div className="controls">
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="name">이름순</option>
            <option value="rating">평점순</option>
            <option value="goal">골 많은 순</option>
            <option value="assist">어시스트 많은 순</option>
          </select>
        </div>
      </div>
      <div className="player-grid">
        {filteredPlayers.map((player) => (
          <div
            className={`player-card ${compareMode && selected.includes(player.id) ? "selected" : ""}`}
            key={player.id}
            onClick={() => toggleSelect(player.id)}
          >
            <img src={player.image} alt={player.name} />
            <div className="name">{player.name}</div>
            <div className="position">{player.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectPlayer;
