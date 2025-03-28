import { useEffect, useState } from "react";

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/sessions?userId=1")
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="mt-8 space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="border p-4 rounded-lg shadow bg-white"
        >
            <h1>Session Number {session.id}</h1>
          <h2 className="text-xl font-semibold text-gray-800">
            {session.tag}
          </h2>
          <p className="text-gray-600">Duration: {session.duration} minutes</p>
          <p className="text-sm text-gray-400">
            {new Date(session.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
