import React from 'react';
import { useState } from 'react';
import Countdown from './components/Countdown';
import './App.css';

function App() {

  return (
    <>
      <div className="App">
      <Countdown />
        <audio autoPlay loop>
          <source src="/christmas_music.mp3" type="audio/mp3" />
        </audio>
    </div>
    </>
  );
}

export default App
