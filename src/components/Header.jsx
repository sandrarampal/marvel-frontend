import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";
import Button from "./Button";

const Header = ({ setToken, token }) => {
  return (
    <header>
      <div className="header-main container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="navigation">
          <div className="nav-categories">
            <Link to="/characters">
              <Button text="Characters" />
            </Link>
            <Link to="/comics">
              <Button text="Comics" />
            </Link>
            {token && (
              <Link to="/favourites">
                <Button text="Favourites" />
              </Link>
            )}
          </div>
          <div className="nav-account">
            {!token && (
              <div>
                <Link to="/login">
                  <Button text="Login" />
                </Link>
                <Link to="/signup">
                  <Button text="Signup" />
                </Link>
              </div>
            )}
            {token && (
              <button
                className="css-button-retro--red"
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
      </div>
    </header>
  );
};

export default Header;
