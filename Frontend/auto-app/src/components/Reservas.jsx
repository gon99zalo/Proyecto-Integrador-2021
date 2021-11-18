//@ts-nocheck
//Estilos
import "../styles/Reservas.css";
//Librerías
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Componentes
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import FormDatos from "./FormDatos";
import HorarioLLegada from "./HorarioLlegada";

export default function Reservas(props) {
  // HOOKS
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: {
      titulo: "",
    },
    ciudad: {
      nombre: "",
      pais: "",
    },
    imagenes: [{
      titulo: "",
      url: "",
    }],
  });
  // ÍCONOS
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  
  // AQUÍ SE TRAE LOS DATOS DEL PRODUCTO - API
  useEffect(() => {
    // Dirección de la API
    const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";
    fetch(api + "/productos/buscar/" + props.match.params.id)
      .then((res) => res.json())
      .then(
        (result) => {
          result == null ? console.log(result) : setProducto(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
          setProducto({
            id: 0,
            nombre: "error",
            descripcion: "error",
            categoria: {
              titulo: "error",
            },
            imagenes: {
              titulo: "error",
              url: "error",
            },
            ciudad: {
              nombre: "error",
              pais: "error",
            },
          });
        }
      );
  }, [props.match.params.id]);

  // ESTA CONDICIÓN PERMITE MOSTRAR ERROR O PANTALLA DE CARGA
  if (error) {
    return (
      <>
        <Header />
          <div>Error: {error.message}</div>
        <Footer />
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <Header />
        {/* TODO: ESTE HEADER SE USO EN LA ANTERIOR SECCIÓN, PODRÍA CREARSE UN COMPONENTE PARA REUTILIZARLO */}
        <header className="booking-header">
          <div className="booking-header-titles">
            <div>
              <h4>{producto.categoria.titulo}</h4>
              <h1>{producto.nombre}</h1>
            </div>
            <i className="back-arrow">
              <a href="/">{backArrow}</a>
            </i>
          </div>
        </header>

        {/* SECCIÓN DE DETALLES DEL PRODUCTO */}
        <main className="booking-main">
          <h1>Completá tus datos</h1>
          <div className="booking-sections">

            {/* DATOS PARA LA RESERVA - LADO IZQUIERDO */}
            <div className="booking-data">

              {/* FORMULARIO */}
              <div style={{height: "217px", border: "1px solid #DFE4EA", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "8px", marginBottom: "35px"}}>
                <FormDatos />
              </div>

              {/* CALENDARIO */}
              <h1 style={{marginBottom: "13px"}}>Seleccioná tu fecha de reserva</h1>
              <div className="booking-calendar" style={{height: "297px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "5px", marginBottom: "36px"}}>
                <DatePicker inline />
              </div>

              {/* HORARIO */}
              <h1 style={{marginBottom: "16px"}}>Tu horario de llegada</h1>
              <div style={{height: "144px", border: "1px solid #DFE4EA", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "8px"}}>
                <HorarioLLegada />
              </div>
            </div>

            {/* DETALLES DE RESERVA - LADO DERECHO */}
            <div className="booking-details">

              <h1>Detalles de la reserva</h1>

              {/* IMAGEN RESERVA */}
              <div className="booking-details-image">
                {console.log(producto.imagenes)}
                <img src={producto.imagenes[0].url} alt={producto.imagenes[0].titulo} />
              </div>

              {/* INFORMACIÓN DEL PRODUCTO */}
              <div className="booking-details-info">
                <h4>{producto.categoria.titulo}</h4>
                <h1>{producto.nombre}</h1>
                <div className="details-stars">
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                </div>

                {/* INFORMACIÓN DE LOCACIÓN DEL PRODUCTO */}
                <div className="booking-details-location">
                  <i>{marker}</i>
                  <div>
                    <p> A 100mt del Barrio Los Rosales</p>
                    <p> {producto.ciudad.nombre + ", " + producto.ciudad.pais}</p>
                  </div>
                </div>
              </div>

              {/* CHECK IN - CHECK OUT */}
              <div className="booking-details-check">
                <div className="booking-details-divisor"></div>
                <div className="txt-2 checks">
                  <p>Check in</p>
                  <span>_/_/_</span>
                </div>
                <div className="booking-details-divisor"></div>
                <div className="txt-2 checks">
                  <p>Check out</p>
                  <span>_/_/_</span>
                </div>
                <div className="booking-details-divisor"></div>
              </div>

              {/* BOTÓN DE RESERVA */}
              <button className="btn-2 btn-details">
                Confirmar reserva
              </button>
            </div>
          </div>
        </main>

        {/* REGLAS */}
        {/* TODO: PUEDE CREARSE UN COMPONENTE Y USARLO AQUÍ Y EN LA SECCIÓN DE PRODUCTO  */}
        <div className="commodity-rules">
          <h1>Qué tenés que saber</h1>
          <hr className="commodity-divisor" />
          <div className="commodity-rule-container">
            <div className="normas">
              <h3>Normas del vehículo</h3>
              <p>Norma 1</p>
              <p>Norma 2</p>
              <p>Norma 3</p>
            </div>
            <div className="salud">
              <h3>Salud y seguridad</h3>
              <p>Salud 1</p>
              <p>Salud 2</p>
              <p>Salud 3</p>
            </div>
            <div className="cancelacion">
              <h3>Política de cancelación</h3>
              <p className="texto-cancelacion">
                Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta estadía.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
};
