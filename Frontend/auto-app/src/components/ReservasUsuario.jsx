import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { api } from "./Buscador";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/ReservasUsuario.css";


export default function ReservaUsuario(){
    
    const [error, setError] = useState(null);
    const [cargado, setcargado] = useState(false);
    const [reservas, setReservas] =useState([])
    
    const history = useHistory();
    const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
    const clock = <FontAwesomeIcon icon={faClock} />;

    if(sessionStorage.getItem("infoUsuario")== null){
        history.push("/")
    }

    useEffect(()=>{
        let token = JSON.parse(sessionStorage.getItem("infoUsuario")).token;
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        let idUsuario = JSON.parse(jsonPayload).sub.split("'")[1];

        let configPost = {
            method: "GET",
            headers: {
              "Content-Type": "application/JSON",
              Authorization: JSON.parse(sessionStorage.getItem("infoUsuario")).token,
            },
          };
        
        fetch(api + "/reservas/usuario/" + idUsuario, configPost)
        .then(res =>res.json())
        .then((result) =>{
                setcargado(true);
                setReservas(result);
            },
            (error)=>{
                setError(error);
                setcargado(true);
            }
        )
    },[])
    
    if (error) {
        return (
          <>
            <Header reservas={true}/>
            <div>Error: {error.message}</div>
            <Footer />
          </>
        );
    } else if (!cargado) {
        return (
          <>
            <Loading />
          </>
        );
    } else {
        return(
            <>
            <Header reservas={true}/>

            
            <div className="reserva">
            <br />
            <h1>Mis Reservas</h1>
            <br />
            <div className="reserva-container">
            {reservas.length === 0 ?
            <h1>No hiciste ninguna reserva todavia</h1>
            : (reservas.map((item, i) => {
                return(
                <div className="reserva-card" key={i}>
                    <div className="reserva-data">
                        <div className="reserva-star-rating">
                            <h4>{item.producto.categoria.titulo}</h4>
                        </div>
                        <h1>{item.producto.nombre}</h1>
                        <p className="txt-1"> 
                        <i>{clock}</i> {item.hora}
                        </p>
                        <p className="txt-1">
                            <i>{calendar}</i> {item.fechaInicial.split("-")[2] + "/" + item.fechaInicial.split("-")[1] + "/" + item.fechaInicial.split("-")[0] + " - " + item.fechaFinal.split("-")[2] + "/" + item.fechaFinal.split("-")[1] + "/" + item.fechaFinal.split("-")[0]}
                        </p>
                        <p className="txt-1 reserva-location">
                            <i>{marker}</i> {item.producto.ciudad.nombre + ", " + item.producto.ciudad.pais}
                        </p>
                        <Link to={"/productos/" + item.id}><button className="product-show-more btn-1">Ver Producto</button></Link>
                    </div>
                </div>
                )
            }))}
            </div>
            </div>

            <Footer />
            </>
        )
    }
}