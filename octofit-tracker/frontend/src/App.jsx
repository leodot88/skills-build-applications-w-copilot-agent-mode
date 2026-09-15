import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { hasApiConfiguration } from './components/api'

function App() {
  return <div className="app-shell">
    <header className="app-header"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit <em>Tracker</em></span></NavLink><nav aria-label="Primary navigation"><NavLink to="/activities">Activities</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Members</NavLink><NavLink to="/workouts">Workouts</NavLink></nav><span className="status-dot">● Live</span></header>
    {!hasApiConfiguration && <div className="config-alert" role="status">API hostname not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>; using same-origin <code>/api</code> fallback.</div>}
    <main><Routes><Route path="/" element={<div className="welcome"><p className="eyebrow">Your movement, in one place</p><h1>Make your next<br /><span>move count.</span></h1><p className="welcome-copy">Track the work, find your rhythm, and move further together.</p><NavLink className="primary-button" to="/activities">View activity <span>↗</span></NavLink></div>} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    <footer><span>OCTOFIT / 2026</span><span>Small steps. Strong systems.</span></footer>
  </div>
}

export default App
