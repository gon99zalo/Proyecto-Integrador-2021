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

  return (
    <>
    <header>
            <div className="logo">
            <a href="/"><img src={logo} alt="logo" className="logo-img" /></a>
            <span className="slogan">El auto que necesitas</span>
            </div> 
            <div className="user">
            <i class="fas fa-times" onClick={handlerClose}></i>
            <p className="saludo">Hola,
              <br/><span className="colorUser"> alumno DH </span></p>{/*revisar*/}
            </div>
        </header>
      <Buscador />
      <Categories />
      <Footer />
    </>
  );
}