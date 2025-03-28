import SessionList from "./sessionList";

function App() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        FocusTime Sessions 📊
      </h1>
      <SessionList />
    </div>
  );
}

export default App;
