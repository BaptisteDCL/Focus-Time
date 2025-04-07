import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Sessions from "./pages/sessions";
import Focus from "./pages/focus";
import CreateSession from "./pages/createSession";
import Reports from "./pages/Reports";

function App() {
  return (
    <div>
      <nav >
        <div>
          <Link to="/">
            Home
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/sessions">
            Sessions
          </Link>
        </div>
        <div>
          <Link to="/create">
            Créer une session manuelle
          </Link>
        </div>
        <div>
          <Link to="/reports">
            Rapports
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;

