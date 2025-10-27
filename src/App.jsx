import React from 'react';
import Countdown from './components/Countdown';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

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
      <div className="App">
        <Countdown />
        <PostList />
        <PostForm />
        <audio autoPlay loop>
          <source src="/christmas_music.mp3" type="audio/mp3" />
        </audio>
    </div>
    </>
  );
}

export default App
