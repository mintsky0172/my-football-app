import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const labels = {
  goal: "골",
  assist: "어시",
  shoot: "슈팅",
  dribble: "드리블",
  pass_accuracy: "패스 정확도",
  key_pass: "키패스",
  tackle: "태클",
  clearance: "클리어",
  block: "차단",
  aerial: "공중볼",
  save: "선방",
  conceded: "실점",
  clean_sheet: "클린시트",
  rating: "평점",
};

function PlayerRadarChart({ stat }) {
  let fields;
  if (stat.position === "DF") {
    fields = [
      "tackle",
      "clearance",
      "block",
      "aerial",
      "pass_accuracy",
      "rating",
    ];
  } else {
    fields = Object.keys(stat).filter((k) => k !== "position");
  }

  const data = fields.map((key) => ({
    stat: labels[key] || key,
    value: stat[key],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="선수"
            dataKey="value"
            stroke="#79ae77"
            fill="#79ae77"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlayerRadarChart;
