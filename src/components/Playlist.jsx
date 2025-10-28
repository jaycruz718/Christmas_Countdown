import React, { useRef, useState, useEffect } from "react";
import "../components/musicplayer/MusicPlayer.css";

function HolidayPlaylist() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // List of holiday songs 
  const playlist = [
    "/music/song1.mp3",
    "/music/song2.mp3",
    "/music/song3.mp3",
  ];

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // When a track ends, go to the next one (or loop back to start)
  const handleEnded = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  // Whenever currentTrack changes, load and play the new song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (playing) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <button className="music-btn" onClick={togglePlay}>
        {playing ? "⏸ Pause Playlist" : "▶ Play Playlist"}
      </button>
      <p style={{ color: "white", marginTop: "10px" }}>
        Now Playing: {playlist[currentTrack].split("/").pop()}
      </p>

      <audio ref={audioRef} onEnded={handleEnded}>
        <source src={playlist[currentTrack]} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default HolidayPlaylist;
