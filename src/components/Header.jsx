import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div>
        <Link to="/characters">
          <button>Characters</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to="/favourites">
          <button>Favourites</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
