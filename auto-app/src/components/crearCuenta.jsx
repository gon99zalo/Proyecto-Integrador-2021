import Header from "./header";
import "../styles/Global.css"
import "../styles/crearCuenta.css"
import Footer from "./footer";

export default function CrearCuenta() {
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
          <input className="campos-crear" type="text" name="nombre" id="nombre" required/></span>
          <span className="span-2"><label className="labels-crear" htmlFor="apellido">Apellido</label>
          <input className="campos-crear" type="text" name="apellido" id="apellido" required/></span>
          </div>
          <label className="labels-crear" htmlFor="correo electronico">Correo electrónico</label>
          <input className="campos-crear" type="email" name="correo electronico" id="correo electronico" required/>
          <label className="labels-crear" htmlFor="contrasenia">Contraseña</label>
          <input className="campos-crear" type="password" name="contrasenia" id="contrasenia" required/>
          <label className="labels-crear" htmlFor="confirmarContrasenia" >Confirmar contraseña</label>
          <input className="campos-crear" type="password" name="confirmarContrasenia" id="confirmarContrasenia" required/>
          <button type="submit" className="boton-crearCuenta" id="boton-crearCuenta">Crear cuenta</button>
          <p className="texto-inicio txt-1">¿Ya tenes una cuenta? <a href="iniciarSesion">Iniciar sesión</a></p>
          </div>
      </form>
      </div>
    {/* </div> */}
    <Footer />
    </>
  );
}
