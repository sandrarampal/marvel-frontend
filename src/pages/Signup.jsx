import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exist, setExist] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);

      Cookies.set("userToken", response.data.token);
      setToken(response.data.token);
      if (location.state) {
        navigate(location.state.from, {
          state: { title: title, price: price },
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h3>S'inscrire</h3>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUsernameChange}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
        {exist && <p className="error">Cet email a déjà un compte chez nous</p>}
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
          value={password}
        />
        <button type="submit">S'inscrire</button>
        <Link to="/login" className="link-to">
          Tu as déjà un compte? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default Signup;
