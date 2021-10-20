import { Link } from "react-router-dom"
import "../styles/header.css"
export default function Header() {
    return (
        <header>
            <div className="logo">
            (logo)<span>El auto que necesitas</span>
            </div> 
            <div class="inputs-header">
            <Link to="/crearCuenta"><input className="crearCuenta" name="Crear cuenta" id="Crear cuenta" value="Crear cuenta" type="button"/></Link>
            <Link to="/iniciarSesion"><input className="iniciarSesion" name="Iniciar sesión" id="Iniciar sesión" value="Iniciar sesión" type="button"/></Link>
            </div>
        </header>
    )
}