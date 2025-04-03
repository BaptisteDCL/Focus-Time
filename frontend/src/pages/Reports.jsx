import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

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

  // Partie traitant les graphiques en barres
  const tagDurations = {};

  weekSessions.forEach((session) => {
    if (!tagDurations[session.tag]) {
      tagDurations[session.tag] = 0;
    }
    tagDurations[session.tag] += session.duration;
  });

  const chartData = Object.entries(tagDurations).map(([tag, duration]) => ({
    tag,
    duration,
  }));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">🧾 Rapports</h1>
  
      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <>
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
  
          <div className="bg-white shadow rounded p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">⏳ Temps par activité</h2>
            {chartData.length === 0 ? (
              <p className="text-gray-500">Aucune session cette semaine.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="tag" type="category" />
                  <Tooltip />
                  <Bar dataKey="duration" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Reports;
