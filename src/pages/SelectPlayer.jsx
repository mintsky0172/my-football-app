import { useState } from "react";
import { useNavigate } from "react-router-dom";
import players from "../data/players.json";
const positions = ["ALL", "FW", "MF", "DF", "GK"];

import "./SelectPlayer.scss";

function SelectPlayer() {
  const [selectedPosition, setSelectedPosition] = useState("ALL");

  const filteredPlayers =
    selectedPosition === "ALL"
      ? players
      : players.filter((p) => p.position === selectedPosition);

  const navigate = useNavigate();

  return (
    <div className="select-player-page">
      <h2>선수를 선택하세요</h2>

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
      </div>

      <div className="player-grid">
        {filteredPlayers.map((player) => (
          <div
            className="player-card"
            key={player.id}
            onClick={() => navigate(`/player/${player.id}`)}
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
