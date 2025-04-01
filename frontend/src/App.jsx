import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Sessions from "./pages/sessions";
import Focus from "./pages/focus";
import CreateSession from "./pages/createSession";

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
        <div className="space-x-4">
          <Link to="/create" className="text-gray-700 hover:text-blue-600">
            Créer une session manuelle
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/create" element={<CreateSession />} />
      </Routes>
    </div>
  );
}

export default App;

