import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";

const Header = ({ setToken, token }) => {
  return (
    <header className="container">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="navigation">
        <div className="nav-categories">
          <Link to="/characters">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          {token && (
            <Link to="/favourites">
              <button>Favourites</button>
            </Link>
          )}
        </div>
        <div className="nav-account">
          {!token && (
            <div>
              <Link to="/login">
                <button>login</button>
              </Link>
              <Link to="/signup">
                <button>signup</button>
              </Link>
            </div>
          )}
          {token && (
            <button
              onClick={() => {
                Cookies.remove("userToken");
                setToken(null);
              }}
            >
              logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
