import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../../components/Button";
import "./Signup.css";

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
      const response = await axios.post(
        "https://site--marvel-backend--96jcjn4jx467.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
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
      if (error.response.status === 409) {
        setExist(true);
      }
    }
  };

  return (
    <section>
      <div className="login-page">
        <form onSubmit={handleSubmit}>
          <h3>S'inscrire</h3>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          {exist && (
            <p className="error">Cet email a déjà un compte chez nous</p>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <Button text="Sign Up" />
          <Link to="/login" className="link-to">
            Already signed up? Log in now !
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
