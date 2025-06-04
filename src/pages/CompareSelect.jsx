import { useState } from "react";
import { useNavigate } from "react-router-dom";
import players from "../data/players.json";
import './CompareSelect.scss';

function CompareSelect() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleCompare = () => {
    if (player1 && player2 && player1 !== player2) {
      navigate(`/compare/${encodeURIComponent(player1)}-vs-${encodeURIComponent(player2)}`);

  };

  return (
    <div className="compare-select">
      <h2>비교할 선수 선택</h2>
      <select value={player1} onChange={(e) => setPlayer1(e.target.value)}>
        <option value="">선수 1 선택</option>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select value={player2} onChange={(e) => setPlayer2(e.target.value)}>
        <option value="">선수 2 선택</option>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button onClick={handleCompare}>비교하기</button>
    </div>
  );
}

export default CompareSelect;
