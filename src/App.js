// import logo from './logo.svg';
import "./App.css";
import LookUp from "./LookUp";
import Analytics from "./Analytics";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Elves from "./Elves";
import Elders from "./Elders";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Routes>
        <Route path="/Ethernal-Elves-Info" element={<Analytics />} />
        <Route path="/LookUp" element={<LookUp />} />
        <Route path="/Elves" element={<Elves />} />
        <Route path="/Elders" element={<Elders />} />
      </Routes>
    </div>
  );
}

export default App;
