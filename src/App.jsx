import React from 'react';
import Snowfall from 'react-snowfall';
import Countdown from './components/Countdown';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MusicPlayer from './components/musicplayer/MusicPlayer';
import HolidayPlaylist from './components/Playlist';
import './App.css';

function App() {
  const addPost = async (post) => {
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  };

   return (
    <div className="App">
      {/* Background video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="../src/assets/ChristmasBackground1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Snow effect */}
      <Snowfall
        snowflakeCount={120}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 0, // sits above video, below content
        }}
        colors={["#fff", "#e0f7fa", "#f8f9fa"]}
      />

      {/* Main content */}
      <div className="App">
        
        <Countdown />
        <HolidayPlaylist />
        <PostForm addPost={addPost} />
        <PostList />
      </div>
    </div>
  );
}

export default App;