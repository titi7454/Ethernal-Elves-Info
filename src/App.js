// import logo from './logo.svg';
import "./App.css";
import LookUp from "./views/LookUp/LookUp";
import Stats from "./views/Stats/Stats";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Elves from "./views/Elves/Elves";
import Elders from "./views/Elders/Elders";
import Orcs from "./views/Orcs/Orcs";
import Banner from "./Components/Banner";
import Changelog from "./views/Changelog/Changelog";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Banner />
      <Routes>
        <Route path="/" element={<Stats />} />
        <Route path="/LookUp" element={<LookUp />} />
        <Route path="/Elves" element={<Elves />} />
        <Route path="/Elders" element={<Elders />} />
        <Route path="/Orcs" element={<Orcs />} />
        <Route path="/Changelog" element={<Changelog />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
