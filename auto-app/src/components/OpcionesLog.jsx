import "../styles/Opciones.css";
import "../styles/header.css";
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const facebook = <FontAwesomeIcon icon={faFacebook} />;
const linkedin = <FontAwesomeIcon icon={faLinkedinIn} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;

export default function OpcionesLog(props) {
    let history = useHistory();
    let nombreCompleto = JSON.parse(localStorage.getItem('infoUsuario'))

  const usuario = () => {
    return nombreCompleto.nombre + " " + nombreCompleto.apellido
  }

  const iniciales = () => {
    let inicial1 = nombreCompleto.nombre[0]
    let inicial2 = nombreCompleto.apellido[0]
    return inicial1.toUpperCase() + inicial2.toUpperCase()
  }
    let prevLocation
    if(props.location.query === undefined){
        history.replace("/")
    }else {
        prevLocation = props.location.query.router
    }

    return(
        <>
        <div className="opciones" id="opciones">
            <p onClick={history.goBack}>X</p>
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
    </>
    );
}