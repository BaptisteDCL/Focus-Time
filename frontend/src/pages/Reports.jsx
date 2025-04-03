import { useEffect, useState } from "react";

function Reports() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:5001/sessions?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      });
  }, []);

  // Regrouper les sessions
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay()); // dimanche

  const todaySessions = sessions.filter((s) =>
    s.createdAt.startsWith(today)
  );

  const weekSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.createdAt);
    return sessionDate >= thisWeekStart;
  });

  const getTotalDuration = (data) =>
    data.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">🧾 Rapports</h1>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Aujourd'hui</h2>
            <p>Total de sessions : {todaySessions.length}</p>
            <p>Temps total : {getTotalDuration(todaySessions)} minutes</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Cette semaine</h2>
            <p>Total de sessions : {weekSessions.length}</p>
            <p>Temps total : {getTotalDuration(weekSessions)} minutes</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
