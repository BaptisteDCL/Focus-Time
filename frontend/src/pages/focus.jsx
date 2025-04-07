import { useState, useEffect } from "react";

function Focus() {
  const focusDuration = 25 * 60; // 25 minutes en secondes
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [tag, setTag] = useState("focus"); // par défaut "focus"
  const userId = 1; // à remplacer par une vraie logique d'authentification plus tard


  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    
    if (isRunning && timeLeft === 0) {
      // Créer la session quand le timer arrive à zéro
      fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          tag,
          duration: focusDuration / 60 // en minutes
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Session saved:", data);
          alert("✅ Focus session saved!");
          setTimeLeft(focusDuration); // on remet le timer à 25 min pour recommencer
        })
        .catch((err) => {
          console.error("Failed to save session:", err);
          alert("❌ Failed to save session");
        });
    }

    // Pause ou fin
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div>
      <div>
        <h1>Pomodoro Timer 🍅</h1>

        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter session tag (ex: dev, sport...)"
          className=""
        />

        <div>{formatTime(timeLeft)}</div>

        <div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className=""
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(focusDuration);
            }}
            className=""
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Focus;
