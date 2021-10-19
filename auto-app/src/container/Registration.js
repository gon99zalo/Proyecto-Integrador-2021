import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;

function Registration() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    return (
      <div className="Registration">
        <form>
            <h1>Crear Cuenta</h1>
            <label>Nombre</label>
            <input type="text" required></input>
            <label>Apellido</label>
            <input type="text" required></input>
            <label>Email</label>
            <input type="email" required></input>
            <label>Repetir email</label>
            <input type="email" required></input>
            <label>Password</label>
            <input type={passwordShown ? "text" : "password"} required></input>
            <i onClick={togglePasswordVisiblity}>{passwordShown ? visible : notVisible}</i>
            <button onClick={console.log("s")}>registro</button>
            <p>¿Ya tienes una cuenta? <a href="">Iniciar sesión</a></p>
        </form>
      </div>
    );
  }
  
  export default Registration;