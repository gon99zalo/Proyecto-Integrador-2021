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
  
  const usuario = () => {
    let nombreCompleto = JSON.parse(localStorage.getItem('usuario'))
    console.log("completo", nombreCompleto)
    return nombreCompleto.nombre + " " + nombreCompleto.apellido
  }
  return (
    <>
    <header>
            <div className="logo">
            <a href="/"><img src={logo} alt="logo" className="logo-img" /></a>
            <span className="slogan">El auto que necesitas</span>
            </div> 
            <div className="avatar">
               <span className="iniciales-avatar"> AD </span>
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