import SessionList from "../sessionList";

function Sessions() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Your Past Sessions 📋
      </h1>
      <SessionList />
    </div>
  );
}

export default Sessions;
