import React, { useRef, useState } from "react";

const MusicPlayer = () => {
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
            <button onClick={togglePlay}>
            {playing ? "⏸ Pause Music" : "▶ Play Music"}
        </button>
            <audio ref={audioRef} loop>
                <source src="/christmas_music.mp3" type="audio/mp3" />
            </audio>
        </div>
  );
};

export default MusicPlayer;
