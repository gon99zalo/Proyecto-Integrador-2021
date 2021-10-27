import { Link } from "react-router-dom"
import "../styles/header.css";
import logo  from "../assets/img/logos/logo1DB.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const menu = <FontAwesomeIcon icon={faBars} />;


export default function Header(props) {
    
    const [width, setwidth] = useState ({ width: window.screen.availWidth });
    let url = document.URL.split("/")
    let router = url[url.length -1]

    useEffect(() => {
        setwidth(window.screen.availWidth);
        function handleResize() {
            setwidth(window.screen.availWidth);
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
      })
    
    return (
        <header>
            <div className="logo">
            <Link to="/"><img src={logo} alt="logo" className="logo-img" /></Link>
            <Link to="/"><span className="slogan">El auto que necesitas</span></Link>
            </div> 
            {width > 480? 
            <div className="inputs-header">
                {props.crearCuenta ? "" : <Link to="/crearCuenta"><input className="crearCuenta" name="Crear cuenta" id="Crear cuenta" value="Crear cuenta" type="button"/></Link>} 
                {props.login ? "" :<Link to="/iniciarSesion"><input className="iniciarSesion" name="Iniciar sesión" id="Iniciar sesión" value="Iniciar sesión" type="button"/></Link>}
            </div> 
            :
            <div className="inputs-header"><Link to={{pathname: `/opciones`, query: {router}}}><i className="opciones" id="opciones">{menu}</i></Link></div>
            }
        </header>
    )
}