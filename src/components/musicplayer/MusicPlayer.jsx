
import React, { useRef, useState, useEffect } from "react";
import "./MusicPlayer.css";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [themeColor, setThemeColor] = useState("#ff416c"); // 🎨 dynamic color

  const [audioCtx, setAudioCtx] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  // 🎄 Playlist
  const playlist = [
    { src: "/assets/christmas_music/12-days-of-christmas.mp3", title: "🎄 12 Days of Christmas" },
    { src: "/christmas_music/calm-christmas-bells.mp3", title: "✨ Calm Christmas Bells" },
    { src: "/christmas_music/carol-of-the-bells.mp3", title: "🎅 Carol of the Bells" },
    { src: "/christmas_music/happy-christmas-music.mp3", title: "🎁 Happy Christmas" },
    { src: "/christmas_music/joy-to-the-world-bells.mp3", title: "🎶 Joy To The World" },
    { src: "/christmas_music/o-holy-night-bell.mp3", title: "🌟 O Holy Night" },
    { src: "/christmas_music/the-first-noel-bells.mp3", title: "✨ The First Noel" },
    { src: "/christmas_music/what-child-is-this-xmas.mp3", title: "👶 What Child Is This" }
  ];

  // ▶ Play / Pause
  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // Resume audio context if suspended (browser policy)
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(err => console.log("Playback error:", err));
    }
  };

  // ⏭ Next / ⏮ Prev
  const nextTrack = () => {
    const nextIndex = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
  };
  const prevTrack = () => {
    const prevIndex = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevIndex);
  };

  // Track progress
  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // 🎵 Setup audio context + analyser for beat detection
  useEffect(() => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 256;
      setAudioCtx(ctx);
      setAnalyser(analyserNode);
    }
  }, []);

  // 🎵 Beat detection loop
  useEffect(() => {
    if (audioRef.current && audioCtx && analyser) {
      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const detectBeat = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        if (avg > 100) { // threshold
          const colors = ["#ff4b2b", "#00c851", "#ffbb33", "#33b5e5"];
          setThemeColor(colors[Math.floor(Math.random() * colors.length)]);
        }
        requestAnimationFrame(detectBeat);
      };

      detectBeat();
    }
  }, [audioCtx, analyser]);

  return (
    <div
      className="music-player"
      style={{ "--theme-color": themeColor }}
    >
      <h3 style={{ color: "white" }}>🎶 Holiday Playlist</h3>

      <div style={{ marginBottom: "10px" }}>
        <button className="music-btn" onClick={prevTrack}>⏮ Prev</button>
        <button className="music-btn" onClick={togglePlay}>
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button className="music-btn" onClick={nextTrack}>⏭ Next</button>
        <button
          className={`music-btn ${shuffle ? "active" : ""}`}
          onClick={() => setShuffle(!shuffle)}
        >
          🔀 Shuffle {shuffle ? "On" : "Off"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <span style={{ color: "white" }}>{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setProgress(e.target.value);
          }}
          className="progress-bar"
        />
        <span style={{ color: "white" }}>{formatTime(duration)}</span>
      </div>

      <p className="now-playing">
        Now Playing: {playlist[currentTrack].title}
      </p>

      <audio ref={audioRef} onTimeUpdate={updateProgress} onEnded={nextTrack}>
        <source src={playlist[currentTrack].src} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default MusicPlayer;
