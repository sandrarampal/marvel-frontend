import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Header from "./components/Header";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Cookies from "js-cookie";
import Favourites from "./pages/Favourites";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  return (
    <Router>
      <Header setToken={setToken} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters token={token} />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/comics" element={<Comics token={token} />} />
        <Route path="/favourites" element={<Favourites token={token} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
