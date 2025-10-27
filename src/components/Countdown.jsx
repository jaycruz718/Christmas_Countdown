import React, { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const christmas = new Date(new Date().getFullYear(), 11, 25); // Dec 25
    const now = new Date();
    const diff = christmas - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
  const fetchCountdown = async () => {
    const res = await fetch("http://localhost:3000/api/countdown");
    const data = await res.json();
    setTimeLeft(data);
  };

  fetchCountdown();
  const timer = setInterval(fetchCountdown, 1000);
  return () => clearInterval(timer);
}, []);


  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>🎄 Christmas Countdown 🎅</h1>
      <h2>
        {timeLeft.days} Days : {timeLeft.hours} Hours : {timeLeft.minutes} Minutes : {timeLeft.seconds} Seconds
      </h2>
    </div>
  );
};

export default Countdown;
