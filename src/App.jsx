import React, { useState } from "react";
import Snowfall from "react-snowfall";
import Countdown from "./components/countdown/Countdown";
import PostList from "./components/postlist/PostList";
import PostForm from "./components/postform/PostForm";
import MusicPlayer from "./components/musicplayer/MusicPlayer";
import "./App.css";

function App() {
  const [isBeating, setIsBeating] = useState(false);

  const addPost = async (post) => {
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="src/assets/ChristmasBackground1.mp4" type="video/mp4" />
      </video>

      <Snowfall
        snowflakeCount={isBeating ? 200 : 120}
        style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: 0 }}
        colors={isBeating ? ["#ff4b2b", "#00c851", "#fff"] : ["#fff", "#e0f7fa", "#f8f9fa"]}
      />

      <div className="content">
        <Countdown />
        <MusicPlayer onBeatChange={setIsBeating} />
        <PostForm addPost={addPost} />
        <PostList />
      </div>
    </div>
  );
}

export default App;
