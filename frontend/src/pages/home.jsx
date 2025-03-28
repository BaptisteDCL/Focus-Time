import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold text-blue-600">FocusTime ⏳</h1>
      <button
        onClick={() => navigate("/focus")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Start Focus Session
      </button>
    </div>
  );
}

export default Home;
