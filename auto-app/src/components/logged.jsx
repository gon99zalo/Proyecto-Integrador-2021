import Buscador from "./buscador";
import Footer from "./footer";
import Categories from '../components/Categories';
import { Link, useHistory } from "react-router-dom"
import "../styles/header.css";
import logo  from "../assets/img/logos/logo1DB.png"

export default function Logged() {
  const history = useHistory();
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
    <header>
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
            <span className="colorUser"> {usuario()} </span></p>{/*revisar todo avatar*/}
            </div>
        </header>
      <Buscador />
      <Categories />
      <Footer />
    </>
  );
}