import Buscador from "./buscador";
import Footer from "./footer";
import Categories from '../components/Categories';
import { Link } from "react-router-dom"
import "../styles/header.css";
import logo  from "../assets/img/logos/logo1DB.png"

export default function logged() {
  return (
    <>
    <header>
            <div className="logo">
            <a href="/"><img src={logo} alt="logo" className="logo-img" /></a>
            <span className="slogan">El auto que necesitas</span>
            </div> 
            <div className="user">
            <p>Hola santino</p>{/*arreglar esto*/}
            </div>
        </header>
      <Buscador />
      <Categories />
      <Footer />
    </>
  );
}