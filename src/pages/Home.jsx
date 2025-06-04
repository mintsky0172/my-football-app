import { useNavigate } from "react-router-dom";
import "./Home.scss";

function Home() {
  console.log("✅ Home 컴포넌트 실행됨");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/player");
  };

  return (
    <div className="home-page">
      <div className="overlay" />
      <div className="content">
        <h1>iFootball에 오신 걸 환영합니다!</h1>
        <p>국가대표 A매치 실적을 선수별로 확인해보세요 ⚽</p>
        <button onClick={handleStart}>시작하기</button>
      </div>
    </div>
  );
}

export default Home;
