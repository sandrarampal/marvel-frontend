import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Characters/Characters";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Character from "./pages/Character/Character";
import Comic from "./pages/Comic/Comic";
import Cookies from "js-cookie";
import Favourites from "./pages/Favourites/Favourites";
import { useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

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
      <footer>
        <div></div>
      </footer>
    </Router>
  );
}

export default App;
