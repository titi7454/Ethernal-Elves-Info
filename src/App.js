// import logo from './logo.svg';
import "./App.css";
import LookUp from "./views/LookUp/LookUp";
import Analytics from "./views/Analythics/Analytics";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Elves from "./views/Elves/Elves";
import Elders from "./views/Elders/Elders";
import Orcs from "./views/Orcs/Orcs";
import Banner from "./Components/Banner";
import Changelog from "./views/Changelog/Changelog";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Banner />
      <Routes>
        <Route path="/Ethernal-Elves-Info" element={<Analytics />} />
        <Route path="/LookUp" element={<LookUp />} />
        <Route path="/Elves" element={<Elves />} />
        <Route path="/Elders" element={<Elders />} />
        <Route path="/Orcs" element={<Orcs />} />
        <Route path="/Changelog" element={<Changelog />} />
      </Routes>
    </div>
  );
}

export default App;
