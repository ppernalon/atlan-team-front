import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import CreateGame from './pages/CreateGame/CreateGame'
import GameLobby from './pages/GameLobby/GameLobby'
import GamePlay from './pages/GamePlay'
import JoinGame from './pages/JoinGame/JoinGame'

//const sound = PIXI.sound.Sound.from('resources/boing.mp3');

function App() {
//  sound.play();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/JoinGame/:roomId" element={<JoinGame />} />
        <Route path="/GameLobby" element={<GameLobby />} />
        <Route path="/GameLobby/:roomId" element={<GameLobby />} />
        <Route path="/InGame" element={<GamePlay />} />
      </Routes>
    </Router>
  )
}

export default App;
