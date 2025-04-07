import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="">FocusTime ⏳</h1>
      <button
        onClick={() => navigate("/focus")}
        className=""
      >
        Start Focus Session
      </button>
    </div>
  );
}

export default Home;
