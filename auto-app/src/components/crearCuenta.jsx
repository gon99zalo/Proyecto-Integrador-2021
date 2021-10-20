import Header from "./header";
import "../styles/crearCuenta.css"
import Footer from "./footer";

export default function CrearCuenta() {
  return (
    <>
      <Header />
      <div className="signUp">
      <h1 className="titulo-crear">Crear cuenta</h1>
      {/* <div className="form-crearCuenta"> */}
      <form className="form-crearCuenta" action="">
          <div className="inputs">
              <div className="campos-pegados">
          <span className="span-1"><label className="labels-crear" htmlFor="nombre">Nombre</label>
          <input className="campos-crear" type="text" name="nombre" id="nombre"/></span>
          <span className="span-2"><label className="labels-crear" htmlFor="apellido">Apellido</label>
          <input className="campos-crear" type="text" name="apellido" id="apellido"/></span>
          </div>
          <label className="labels-crear" htmlFor="correo electronico">Correo electrónico</label>
          <input className="campos-crear" type="email" name="correo electronico" id="correo electronico"/>
          <label className="labels-crear" htmlFor="contrasenia">Contraseña</label>
          <input className="campos-crear" type="password" name="contrasenia" id="contrasenia"/>
          <label className="labels-crear" htmlFor="confirmarContrasenia">Confirmar contraseña</label>
          <input className="campos-crear" type="password" name="confirmarContrasenia" id="confirmarContrasenia"/>
          <button type="submit" className="boton-crearCuenta" id="boton-crearCuenta">Crear cuenta</button>
          <p className="texto-inicio">¿Ya tenes una cuenta? Iniciar sesión</p>
          </div>
      </form>
      </div>
    {/* </div> */}
    <Footer />
    </>
  );
}
