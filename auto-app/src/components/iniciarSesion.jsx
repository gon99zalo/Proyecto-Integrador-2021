//@ts-nocheck
import Header from "./header";
import "../styles/iniciarSesion.css"
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;



export default function IniciarSesion() {
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))

  const handlerValidate = (e) =>{
    e.preventDefault()
    let emailUsuario = document.querySelector("#correo-electronico").value
    let contraseniaUsuario = document.querySelector("#contrasenia").value
    if(infoUsuario.correo==emailUsuario && infoUsuario.contrasenia === contraseniaUsuario){
      history.push("/logueado")
    }else{
      alert("Por favor vuelva a intentarlo, tus credenciales son inválidas")
    }
  }

  return (
    <>
      <Header login={true}/>
      <div className="logIn">
      <h1 className="titulo-inicio">Iniciar sesión</h1>
      <form className="form-iniciarSesion" action="">
          <div className="inputs-inicio">
          <label className="labels-inicio" htmlFor="correo electronico">Correo electrónico</label>
          <input className="campos-inicio" type="email" name="correo electronico" id="correo-electronico" required />
          <label className="labels-inicio" htmlFor="contrasenia">Contraseña</label>
          <div className="campos-inicio">
            <input className="campos-inicio" type={passwordShown ? "text" : "password"} placeholder={passwordShown ? "contraseña" : "•••••••••"} name="contrasenia" id="contrasenia" required/>
            <i onClick={togglePasswordVisiblity} className="password" id="password">{passwordShown ? visible : notVisible}</i>
          </div>
          <button onClick={handlerValidate} type="submit" className="boton-iniciarSesion" id="boton-iniciarSesion">Ingresar</button>
          <p className="texto-cuenta txt-1">¿Aún no tenes cuenta? <Link to="/crearCuenta">Registrate</Link></p>
          </div>
      </form>
      </div>
    <Footer />
      </>
  )
}