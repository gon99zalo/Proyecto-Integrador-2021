import "../styles/Opciones.css";
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const facebook = <FontAwesomeIcon icon={faFacebook} />;
const linkedin = <FontAwesomeIcon icon={faLinkedinIn} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;

export default function Opciones(props) {
    let history = useHistory();
    let prevLocation
    if(props.location.query === undefined){
        history.replace("/")
    }else {
        prevLocation = props.location.query.router
    }

    return(
        <div className="opciones" id="opciones">
            <p onClick={history.goBack}>X</p>
            <div className="opciones-header" id="opciones-header">
                <h2>MENÚ</h2>
            </div>
            <div className="opciones-links" id="opciones-links">
                {prevLocation === "iniciarSesion" ? "" : <Link to="/iniciarSesion"><h3>Iniciar sesión</h3></Link>}
                {prevLocation === "crearCuenta" ? "" : <Link to="/crearCuenta"><h3>Crear cuenta</h3></Link>}
            </div>
            <i>{facebook}  {linkedin}  {twitter}  {instagram}</i>
        </div>
    );
}