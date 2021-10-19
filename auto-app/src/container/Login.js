import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
      <form>
          <h1>Iniciar sesión</h1>
          <label>Email</label>
          <input type="email" required />
          <label>Password</label>
          <input type={passwordShown ? "text" : "password"} placeholder="password" required />
          <i onClick={togglePasswordVisiblity}>{passwordShown ? visible : notVisible}</i>
          <button onClick={console.log("")}>iniciar sesión</button>
          <p>¿Aún no tenes cuenta? <a href="Registration">Registrate</a></p>
      </form>
    </div>
  );
}

export default Login;
