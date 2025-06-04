function RadarChartCompare({ player1, player2, statKeys }) {
  const labels = {
    rating: "평점",
    goal: "골",
    assist: "어시스트",
    shoot: "슈팅",
    dribble: "드리블",
    pass_accuracy: "패스 정확도",
    key_pass: "키 패스",
    tackle: "태클",
    clearance: "클리어링",
    block: "차단",
    aerial: "공중볼",
    save: "선방",
    conceded: "실점",
    clean_sheet: "클린시트",
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
      },
      {
        label: player2.name,
        data: statKeys.map((key) => player2[key] ?? 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  return <Radar data={data} />;
}
