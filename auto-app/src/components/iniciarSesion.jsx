//@ts-nocheck
import Header from "./header";
import "../styles/iniciarSesion.css"
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;


export default function IniciarSesion() {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <Header />
      <div className="logIn">
      <h1>Iniciar sesión</h1>
      <form className="form-iniciarSesion" action="">
          <div className="inputs-inicio">
          <label className="labels-inicio" htmlFor="correo electronico">Correo electrónico</label>
          <input className="campos-inicio" type="email" name="correo electronico" id="correo electronico"/>
          <label className="labels-inicio" htmlFor="contrasenia">Contraseña</label>
          <input className="campos-inicio" type={passwordShown ? "text" : "password"} placeholder="•••••••••" name="contrasenia" id="contrasenia"/>
          <i onClick={togglePasswordVisiblity} class="password" id="password">{passwordShown ? visible : notVisible}</i>
          <button type="submit" className="boton-iniciarSesion" id="boton-iniciarSesion">Ingresar</button>
          <p className="texto-cuenta">¿Aún no tenes cuenta? <a href="crearCuenta">Registrate</a></p>
          </div>
      </form>
      </div>
    <Footer />
      </>
  )
}