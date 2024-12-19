import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [timer, setTimer] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [message, setMessage] = useState("");

  const startTimer = () => {
    if (!timer || isNaN(timer)) return;
    setCountdown(timer);
    setMessage("");
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        setMessage("Vaqt tugadi!");
        return 0;
      });
    }, 1000);
  };

  const [selectedCity, setSelectedCity] = useState("Tashkent");
  const [localTime, setLocalTime] = useState("");

  const timeZones = {
    Tashkent: "Asia/Tashkent",
    London: "Europe/London",
    Tokyo: "Asia/Tokyo",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZones[selectedCity],
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(formatter.format(now));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <div className="app-container">
      <div className="section section1">
        <h2>Digital Clock</h2>
        <p className="clock-display">{currentTime}</p>
      </div>

      <div className="section section2">
        <h2>Countdown Timer</h2>
        <input
          type="number"
          placeholder="Sekundni kiriting"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="timer-input"
        /> <br />
        <button onClick={startTimer} className="start-button">Boshlash</button>
        <p className="timer-display">{countdown !== null ? countdown : ""}</p>
        {message && <p className="timer-message">{message}</p>}
      </div>

      <div className="section section3">
        <h2>Mahalliy Vaqt</h2>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="city-selector"
        >
          <option value="Tashkent">Toshkent</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokio</option>
        </select>
        <p className="city-time">{localTime}</p>
      </div>
    </div>
  );
}

export default App;