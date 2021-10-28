import Buscador from "./buscador";
import Footer from "./footer";
import Categories from '../components/Categories';
import { Link, useHistory } from "react-router-dom"
import "../styles/header.css";
import logo  from "../assets/img/logos/logo1DB.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Listado from '../components/Listado';
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const facebook = <FontAwesomeIcon icon={faFacebook} />;
const linkedin = <FontAwesomeIcon icon={faLinkedinIn} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;
const menu = <FontAwesomeIcon icon={faBars} />;

export default function Logged() {
  const history = useHistory();

  const [width, setwidth] = useState ({ width: window.screen.availWidth });
  const [show, setShow] = useState("sidenav");

  let toggleNav = () => {
      setShow(show == "sidenav"? "sidenav-show" : "sidenav");
    }

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
  const handlerClose=() => {
    history.push("/")
  }
  
  let nombreCompleto = JSON.parse(localStorage.getItem('infoUsuario'))

  const usuario = () => {
    return nombreCompleto.nombre + " " + nombreCompleto.apellido
  }

  const iniciales = () => {
    let inicial1 = nombreCompleto.nombre[0]
    let inicial2 = nombreCompleto.apellido[0]
    return inicial1.toUpperCase() + inicial2.toUpperCase()
  }
  return (
    <>
      <header className="header">
            <div className="logo">
            <Link to="/logueado"><img src={logo} alt="logo" className="logo-img" /></Link>
            <Link to="/logueado"><span className="slogan">El auto que necesitas</span></Link>
            </div> 
            {width > 480? 
            <>
            <div className="avatar">
            <span className="iniciales-avatar"> {iniciales()} </span>
           </div>
           <div className="user">
           <i className="fas fa-times" onClick={handlerClose}></i>
            <p className="saludo"> <span className="hola">Hola,</span>
            <span className="colorUser"> {usuario()} </span></p>
           </div>
           </>
            :
            <div className="inputs-header"><i className="opciones" id="opciones"onClick={toggleNav}>{menu}</i></div>
            }
        </header>
        <Buscador />
      <Categories />
      <Listado />
      <Footer />

      <div className={show}>
        <div className="opciones" id="opciones">
            <p onClick={toggleNav}>X</p>
            <div className="opciones-header-burger" id="opciones-header">
            <div className="avatar-burger">
               <span className="iniciales-avatar-burger"> {iniciales()} </span>
              </div>
            <div className="user">
            <p className="saludo"> <span className="hola-burger">Hola,</span>
            <span className="colorUser-burger"> {usuario()} </span></p>
            </div>
            </div>
            <i>{facebook}  {linkedin}  {twitter}  {instagram}</i>
        </div>
        <div className="opciones-links-burger" id="opciones-links">
        <p>¿Deseas <Link to="/"><span className="color-links">cerrar sesión?</span></Link></p>
    </div>
    <div className="linea-horizontal"></div>
    </div>
    </>
  );
}