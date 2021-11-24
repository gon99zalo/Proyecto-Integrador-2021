//@ts-nocheck
import Header from "./Header";
import "../styles/Global.css"
import "../styles/crearCuenta.css"
import Footer from "./Footer";
import { Link, useHistory } from "react-router-dom"

export default function CrearCuenta() {
  const history = useHistory()
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
  const handlerSubmit=(e)=>{
    e.preventDefault()
  let contrasenia = document.getElementById("contrasenia").value
  let confirmarContrasenia = document.getElementById("confirmarContrasenia").value
  let mail = document.getElementById("correo-electronico").value
  let email = document.getElementById("correo-electronico")
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
  }else if(!mail.includes("@",1) || !mail.includes(".",mail.indexOf("@") + 2)){
    valido = false
    for(inputs of inputs){
      if(inputs.value === "" || valido === false){
        
        if(!email.classList.contains("error")){
          email.classList.toggle("error")
        }
        if(!email.nextElementSibling.classList.contains("error-mensaje")){
          email.nextElementSibling.classList.toggle("error-mensaje")
        }
    }
  }
    alert("por favor introduzca un mail válido")
  }else if(contrasenia !== confirmarContrasenia){
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
      email: document.querySelector("#correo-electronico").value,
      contrasenia: document.querySelector("#contrasenia").value,
      rol: {
        id:2
      }
    }
    fetch(api + "/registro",{method: 'POST', body: JSON.stringify(infoUsuario), headers: {'Content-Type' : 'application/json'}})
    .then(
      (result) => {
        history.push("/iniciarSesion")
      },
      (error) => {
        console.log(error);
        alert(error)
      }
    )
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
          <label className="labels-crear" htmlFor="correo-electronico">Correo electrónico</label>
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
