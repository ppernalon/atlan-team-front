import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import CreateGame from './pages/CreateGame/CreateGame'
import GameLobby from './pages/GameLobby/GameLobby'
import GamePlay from './components/GamePlay'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/GameLobby" element={<GameLobby />} />
        <Route path="/InGame" element={<GamePlay />} />
      </Routes>
    </Router>
  )
}

export default App;
