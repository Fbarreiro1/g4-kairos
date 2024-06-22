import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Exit from './pages/Exit/Exit';
import Admin from './pages/Admin/Admin';
import TurnosDisponibles from './pages/TurnosDisponibles/TurnosDisponibles';

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Exit/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/turnos-disponibles" element={<TurnosDisponibles/>}></Route>
    </Routes>
    </Router>
    </div>

      
  );
}

export default App;
