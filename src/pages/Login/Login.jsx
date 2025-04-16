import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import "../Signup/Signup.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--96jcjn4jx467.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );

      Cookies.set("userToken", response.data.token);
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        setError("Email or password incorrect");
      }
    }
  };

  return (
    <section>
      <div className="login-page">
        <form onSubmit={handleSubmit}>
          <h3>Se connecter</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Adresse email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button text="Login" />
          <Link to="/signup" className="link-to">
            <p>No account yet? Sign up now !</p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
