import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Sessions from "./pages/sessions";
import Focus from "./pages/focus";

function App() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <nav >
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/sessions" className="text-gray-700 hover:text-blue-600">
            Sessions
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

