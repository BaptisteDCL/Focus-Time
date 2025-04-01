import { useState } from "react";

function CreateSession() {
  const [tag, setTag] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState(null);

  const userId = 1; // provisoire

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5001/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          tag,
          duration: parseInt(duration),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Session enregistrée !");
        setTag("");
        setDuration("");
      } else {
        setMessage("❌ Erreur : " + data.error);
      }
    } catch (err) {
      setMessage("❌ Erreur de connexion au serveur");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Créer une session manuelle
        </h1>

        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag (ex: dev, sport)"
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Durée (en minutes)"
          className="w-full border px-4 py-2 rounded"
          required
          min="1"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Enregistrer la session
        </button>

        {message && (
          <div className="text-center mt-2 text-sm text-gray-700">{message}</div>
        )}
      </form>
    </div>
  );
}

export default CreateSession;
