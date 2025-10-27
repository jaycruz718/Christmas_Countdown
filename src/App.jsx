import React from 'react';
import Countdown from './components/Countdown';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MusicPlayer from './components/MusicPlayer';
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
    <>
return (
    <div className="App">
      {/* 🎶 Background music */}
      <audio autoPlay loop>
        <source src="/christmas_music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <MusicPlayer />
      <Countdown />
      <PostForm addPost={() => {}} />
      <PostList />
    </div>
    
  </>
  );
}

export default App
