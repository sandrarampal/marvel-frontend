import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });

      Cookies.set("userToken", response.data.token);
      setToken(response.data.token);
      //   if (location.state) {
      //     navigate(location.state.from, {
      //       state: { title: title, price: price },
      //     });
      //   } else {
      navigate("/");
    } catch (error) {
      console.log(error.response);
      //   setError("Mot de Passe ou Email incorrect");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h3>Se connecter</h3>
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
          value={password}
        />
        {error && <p className="error">{error}</p>}
        <button>Se connecter</button>
        <Link to="/signup" className="link-to">
          <p>Pas encore de compte? Inscris-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
