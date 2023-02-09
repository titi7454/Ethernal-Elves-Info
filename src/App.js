// import logo from './logo.svg';
import "./App.css";
import LookUp from "./Components/LookUp";
import Analytics from "./Components/Analytics";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Elves from "./Components/Elves";
import Elders from "./Components/Elders";
import Orcs from "./Components/Orcs";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Routes>
        <Route path="/Ethernal-Elves-Info" element={<Analytics />} />
        <Route path="/LookUp" element={<LookUp />} />
        <Route path="/Elves" element={<Elves />} />
        <Route path="/Elders" element={<Elders />} />
        <Route path="/Orcs" element={<Orcs />} />
      </Routes>
    </div>
  );
}

export default App;
