import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email,username, password });
      history.push("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://i.imgur.com/8tSYNFA.png"
            alt=""
          />
          <button className="loginButton">Entrar</button>
        </div>
      </div>
      <div className="container">
        <h1>Filmes, séries e muito mais, sem limites</h1>
        <h2>Assista em qualquer lugar. Cancele a qualquer momento.</h2>
        <p>
          Pronto para assistir? Digite seu e-mail para criar ou reiniciar sua associação.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Enviar
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="Senha" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
