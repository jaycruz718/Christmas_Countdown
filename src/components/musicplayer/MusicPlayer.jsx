import React, { useRef, useState } from "react";
import "../musicplayer/MusicPlayer.css";


function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button className="music-btn" onClick={togglePlay}>
        {playing ? "⏸ Pause Music" : "▶ Play Music"}
      </button>
      <audio ref={audioRef} loop>
        <source src="/christmas_music/" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default MusicPlayer;
