//@ts-nocheck
//Estilos
import "../styles/Reservas.css";
//Librerías
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faMapMarkerAlt,
  faStar,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns';
//Componentes
import Header from "./Header";
import Politicas from "./Politicas";
import Footer from "./Footer";
import Loading from "./Loading";
import FormDatos from "./FormDatos";
import HorarioLLegada from "./HorarioLlegada";
import Calendario from "./CalendarDatePicker";

export default function Reservas(props) {
  // HOOKS
  const [width, setwidth] = useState ({ width: window.screen.availWidth });
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
    imagenes: [
      {
        titulo: "",
        url: "",
      },
    ],
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // ÍCONOS
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  

  const calendarHeaderReservas = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-producto">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"navigation-arrows-producto back-arrow-producto"}
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            {<i>{backArrow}</i>}
          </button>

          {/* LOS MESES MOSTRADOS EN EL HEADER */}
          <span className="react-datepicker__current-month">
            {monthDate
              .toLocaleString("es-CO", {
                month: "long",
              })
              .charAt(0)
              .toUpperCase() +
              monthDate
                .toLocaleString("es-CO", {
                  month: "long",
                })
                .slice(1)}
          </span>

          {/* BOTÓN PARA AUMENTAR MES */}
          <button
            aria-label="Next Month"
            className={"navigation-arrows-producto next-arrow-producto"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
  };

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
              <div
                style={{
                  height: "217px",
                  border: "1px solid #DFE4EA",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                  marginBottom: "35px",
                }}
              >
                <FormDatos />
              </div>

              {/* CALENDARIO */}
              <h1 style={{ marginBottom: "13px" }}>
                Seleccioná tu fecha de reserva
              </h1>
              <div
                className="booking-calendar"
                style={{
                  height: "297px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "5px",
                  marginBottom: "36px",
                }}
              >
                {/* <DatePicker inline monthsShown={2}/> */}
                {/* <Calendario /> */}
                <DatePicker
                  inline
                  monthsShown={2}
                  renderCustomHeader={calendarHeaderReservas}
                  //para poder seleccionar un rango de fechas
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  //para que cuando sea menor a 480 se vuelva uno
                  monthsShown={width <= 480 ? 1 : 2}
                  //para que sea en español
                  locale="es"
                  //para que no se puedan escojer fechas pasadas a la actual
                  minDate={subDays(new Date(), 0)}
                  //para que el nombre de los meses quede con mayúscula inicial
                  formatWeekDay={(day) =>
                    day.charAt(0).toUpperCase() + day.substring(1, 2)
                  }
                  showPopperArrow={false}
                />
              </div>

              {/* HORARIO */}
              <h1 style={{ marginBottom: "16px" }}>Tu horario de llegada</h1>
              <div
                style={{
                  height: "144px",
                  border: "1px solid #DFE4EA",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                }}
              >
                <HorarioLLegada />
              </div>
            </div>

            {/* DETALLES DE RESERVA - LADO DERECHO */}
            <div className="booking-details">
              <h1>Detalles de la reserva</h1>

              {/* IMAGEN RESERVA */}
              <div className="booking-details-image">
                {console.log(producto.imagenes)}
                <img
                  src={producto.imagenes[0].url}
                  alt={producto.imagenes[0].titulo}
                />
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
                    <p>
                      {" "}
                      {producto.ciudad.nombre + ", " + producto.ciudad.pais}
                    </p>
                  </div>
                </div>
              </div>

              {/* CHECK IN - CHECK OUT */}
              <div className="booking-details-check">
                <div className="booking-details-divisor"></div>
                <div className="txt-2 checks check-in">
                  <p>Check in</p>
                  <span>_/_/_</span>
                </div>
                <div className="booking-details-divisor"></div>
                <div className="txt-2 checks check-out">
                  <p>Check out</p>
                  <span>_/_/_</span>
                </div>
                <div className="booking-details-divisor"></div>
              </div>

              {/* BOTÓN DE RESERVA */}
              <button className="btn-2 btn-details">Confirmar reserva</button>
            </div>
          </div>
        </main>

        {/* REGLAS */}
        <Politicas />

        <Footer />
      </>
    );
  }
}
