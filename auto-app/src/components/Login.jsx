import '../styles/Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;

function Login() {
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  return (
    <div className="Login">
      <h1 class="login">Iniciar sesión</h1>
      <form>
          <label class="email" id="email">Email</label>
          <input type="email" class="email" id="email" required />
          <label class="password" id="password">Password</label>
          <div class="password" id="password">
            <input type={passwordShown ? "text" : "password"} placeholder="•••••••••" class="password" id="password" required />
            <i onClick={togglePasswordVisiblity} class="password" id="password">{passwordShown ? visible : notVisible}</i>
          </div>
          <button onClick={console.log("")}>iniciar sesión</button>
          <p>¿Aún no tenes cuenta? <a href="Registration">Registrate</a></p>
      </form>
    </div>
  );
}

export default Login;
