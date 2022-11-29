// import logo from './logo.svg';
import "./App.css";
import LookUp from "./LookUp";
import Analytics from "./Analytics";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App-header">
      <NavBar />
      <Routes>
        <Route path="/" element={<Analytics />}/>
        <Route path="/LookUp" element={<LookUp />}/>
      </Routes>
    </div>
  );
}

export default App;
