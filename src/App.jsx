import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Header from "./components/Header";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Cookies from "js-cookie";
import Favourites from "./pages/Favourites";
import { useState } from "react";

function App() {
  const cookies = Cookies.get("favourite");
  const faveTab = [];

  faveTab.push(JSON.parse(Cookies.get("favourite")));

  const [favourite, setFavourite] = useState(cookies ? faveTab : []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={
            <Characters favourite={favourite} setFavourite={setFavourite} />
          }
        />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/favourites"
          element={
            <Favourites favourite={favourite} setFavourite={setFavourite} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
