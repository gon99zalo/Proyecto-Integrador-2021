import { Link } from "react-router-dom"
import "../styles/header.css"
import logo from '../assets/logo.svg';
export default function Header() {
    return (
        <header>
            <div className="logo">
            <img className="logo-db" src={logo} alt="logo" /><span>El auto que necesitas</span>
            </div> 
            <div className="inputs-header">
            <Link to="/crearCuenta"><input className="crearCuenta" name="Crear cuenta" id="Crear cuenta" value="Crear cuenta" type="button"/></Link>
            <Link to="/iniciarSesion"><input className="iniciarSesion" name="Iniciar sesión" id="Iniciar sesión" value="Iniciar sesión" type="button"/></Link>
            </div>
        </header>
    )
}