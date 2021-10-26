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
const menu = <FontAwesomeIcon icon={faBars} />;

export default function Logged() {
  const history = useHistory();

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
    {/* <header>
            <div className="logo">
            <a href="/"><img src={logo} alt="logo" className="logo-img" /></a>
            <span className="slogan">El auto que necesitas</span>
            </div> 
            <div className="avatar">
               <span className="iniciales-avatar"> {iniciales()} </span>
              </div>
            <div className="user">
            <i className="fas fa-times" onClick={handlerClose}></i>
            <p className="saludo"> <span className="hola">Hola,</span>
            <span className="colorUser"> {usuario()} </span></p>
            </div>
          </header>
      <Buscador /> */}
      <header>
            <div className="logo">
            <Link to="/"><img src={logo} alt="logo" className="logo-img" /></Link>
            <span className="slogan">El auto que necesitas</span>
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
            <div className="inputs-header"><Link to={{pathname: `/opcionesLog`, query: {router}}}><i className="opciones" id="opciones">{menu}</i></Link></div>
            }
        </header>
        <Buscador />
      <Categories />
      <Listado />
      <Footer />
    </>
  );
}