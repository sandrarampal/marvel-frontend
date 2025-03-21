import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ setToken, token }) => {
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
        <Link to={token ? "/favourites" : "/login"}>
          <button>Favourites</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/signup">
          <button>signup</button>
        </Link>
        <button
          onClick={() => {
            Cookies.remove("userToken");
            setToken(null);
          }}
        >
          logout
        </button>
      </div>
    </header>
  );
};

export default Header;
