//@ts-nocheck
import Header from "./Header";
import "../styles/iniciarSesion.css"
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import "../styles/crearCuenta.css"
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
    let inputs = document.querySelectorAll(".campos-inicio")
    let boton = document.querySelector(".texto-cuenta")
    if(infoUsuario.correo === emailUsuario && infoUsuario.contrasenia === contraseniaUsuario){
      history.push("/logueado")
    }else{
<<<<<<< HEAD
      alert("Por favor vuelva a intentarlo, sus credenciales son inválidas")
=======
      // alert("Por favor vuelva a intentarlo, tus credenciales son inválidas") 
      for(inputs of inputs){
      inputs.classList.toggle("error")
      }
      boton.nextElementSibling.classList.toggle("error-mensaje")
>>>>>>> 107ebfee7f6f1c80be22b2523eb31f7658433b27
    }
  }

  return (
    <>
      <Header login={true}/>
      <div className="logIn">
      <h1 className="titulo-inicio">Iniciar sesión</h1>
      <form className="form-iniciarSesion" action="">
          <div className="inputs-inicio">
          <label className="labels-inicio" htmlFor="correo-electronico">Correo electrónico</label>
          <input className="campos-inicio" type="email" name="correo-electronico" id="correo-electronico" required />
          <label  className="labels-inicio" htmlFor="contrasenia">Contraseña</label>
          <div className="campos-inicio">
            <input className="campos-inicio" type={passwordShown ? "text" : "password"} placeholder={passwordShown ? "contraseña" : "•••••••••"} name="contrasenia" id="contrasenia" required/>
            <i onClick={togglePasswordVisiblity} className="password" id="password">{passwordShown ? visible : notVisible}</i>
          </div>
          <button onClick={handlerValidate} type="submit" className="boton-iniciarSesion" id="boton-iniciarSesion">Ingresar</button>
          <p className="texto-cuenta txt-1">¿Aún no tenes cuenta? <Link to="/crearCuenta"><span className="color-links">Registrate</span></Link></p>
          <div className="error-mensaje-escondido">por favor vuelva a intarlo, sus credenciales son inválidas</div>
          </div>
      </form>
      </div>
    <Footer />
      </>
  )
}
