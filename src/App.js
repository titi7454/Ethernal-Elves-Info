// import logo from './logo.svg';
import "./App.css";
import LookUp from "./LookUp";
import Analytics from "./Analytics";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Routes>
        <Route path="/Ethernal-Elves-Info" element={<Analytics />}/>
        <Route path="/LookUp" element={<LookUp />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
