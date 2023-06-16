import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://i.imgur.com/8tSYNFA.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email ou Telefone"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
          <span>
            Novo no Netflix? <b>Inscreva-se agora.</b>
          </span>
          <small>
            Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um
            robô. <b>Saber mais.</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
