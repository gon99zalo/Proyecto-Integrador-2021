import Header from "./header";
import "../styles/Global.css"
import "../styles/crearCuenta.css"
import Footer from "./footer";
import { Link, useHistory } from "react-router-dom"
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

export default function CrearCuenta() {
  const history = useHistory()
  const handlerSubmit=(e)=>{
    e.preventDefault()
  let contrasenia = document.getElementById("contrasenia").value
  let confirmarContrasenia = document.getElementById("confirmarContrasenia").value
  let mail = document.getElementById("correo-electronico").value
  let inputs = document.querySelectorAll(".campos-crear")
  let valido = true
  if(contrasenia.length<=6){
    for(inputs of inputs){
      if(inputs.value === ""){
        valido = false
        if(!inputs.classList.contains("error")){
          inputs.classList.toggle("error")
        }
        if(!inputs.nextElementSibling.classList.contains("error-mensaje")){
          inputs.nextElementSibling.classList.toggle("error-mensaje")
        }
    }
  }
    alert("La contraseña debe tener más de 6 caracteres")
  }else if(mail.includes("@") === false){
    for(inputs of inputs){
      if(inputs.value === ""){
        valido = false
        if(!inputs.classList.contains("error")){
          inputs.classList.toggle("error")
        }
        if(!inputs.nextElementSibling.classList.contains("error-mensaje")){
          inputs.nextElementSibling.classList.toggle("error-mensaje")
        }
    }
  }
    alert("por favor introduzca un mail válido")
  }else if(contrasenia != confirmarContrasenia){
    alert("contraseñas ingresadas no coinciden")
  }else{
    for(inputs of inputs){
      if(inputs.value === ""){
        valido = false
        if(!inputs.classList.contains("error")){
          inputs.classList.toggle("error")
        }
        if(!inputs.nextElementSibling.classList.contains("error-mensaje")){
          inputs.nextElementSibling.classList.toggle("error-mensaje")
        }
    }
  }
  if(valido){
    let infoUsuario = {
      nombre: document.querySelector("#nombre").value,
      apellido: document.querySelector("#apellido").value,
      correo: document.querySelector("#correo-electronico").value,
      contrasenia: document.querySelector("#contrasenia").value,
    }
    localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario))
    history.push("/iniciarSesion")
  }
  }
  }

  return (
    <>
      <Header crearCuenta={true}/>
      <div className="signUp">
      <h1 className="titulo-crear">Crear cuenta</h1>
      {/* <div className="form-crearCuenta"> */}
      <form className="form-crearCuenta" action="">
          <div className="inputs">
              <div className="campos-pegados">
          <span className="span-1"><label className="labels-crear" htmlFor="nombre">Nombre</label>
          <input className="campos-crear" type="text" name="nombre" id="nombre" required/><div className="error-mensaje-escondido">Este campo es obligatorio</div></span>
          <span className="span-2"><label className="labels-crear" htmlFor="apellido">Apellido</label>
          <input className="campos-crear" type="text" name="apellido" id="apellido" required/><div className="error-mensaje-escondido">Este campo es obligatorio</div></span>
          </div>
          <label className="labels-crear" htmlFor="correo electronico">Correo electrónico</label>
          <input className="campos-crear" type="email" name="correo electronico" id="correo-electronico" required/>
          <div className="error-mensaje-escondido">Este campo es obligatorio</div>
          <label className="labels-crear" htmlFor="contrasenia">Contraseña</label>
          <input className="campos-crear" type="password" name="contrasenia" id="contrasenia" required/>
          <div className="error-mensaje-escondido">Este campo es obligatorio</div>
          <label className="labels-crear" htmlFor="confirmarContrasenia" >Confirmar contraseña</label>
          <input className="campos-crear" type="password" name="confirmarContrasenia" id="confirmarContrasenia" required/>
          <div className="error-mensaje-escondido">Este campo es obligatorio</div>
          <button onClick={handlerSubmit} type="submit" className="boton-crearCuenta" id="boton-crearCuenta">Crear cuenta</button>
          <p className="texto-inicio txt-1">¿Ya tenes una cuenta? <Link to="iniciarSesion"><span className="color-links">Iniciar sesión</span></Link></p>
          </div>
      </form>
      </div>
    {/* </div> */}
    <Footer />
    </>
  );
}
