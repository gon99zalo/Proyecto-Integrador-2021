//@ts-nocheck
//Estilos
import "../styles/Reservas.css";
import "../styles/CalendarReservas.css";
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
import { subDays, getDate } from "date-fns";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
//Componentes
import Header from "./Header";
import Politicas from "./Politicas";
import Footer from "./Footer";
import Loading from "./Loading";
import FormDatos from "./FormDatos";
import HorarioLLegada from "./HorarioLlegada";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function Reservas(props) {
  // HOOKS
  const [width, setwidth] = useState({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [horario, setHorario] = useState(null);
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
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";
  const history = useHistory();
  registerLocale("es", es);

  // ÍCONOS
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;

  let datosDeUsuario = sessionStorage.getItem("infoUsuario");
  let datosDeUsuarioParseado = JSON.parse(datosDeUsuario);

  const handlerReserva = (e) => {
    e.preventDefault();

    e.preventDefault();   
    //obtenemos el id del usuario logueado a partir del token de seguridad
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
    console.log(parseInt(idUsuario).valueOf());

    let valores = {
      fechaInicial: startDate,
      fechaFinal: endDate,
      hora: horario,
      producto: {id: producto.id},
      usuario: {id: idUsuario}
    };

    let config = {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/JSON",
        Authorization: datosDeUsuarioParseado.token,
      },
    };

    fetch(api + "/reservas", config)
    .then((response)=>console.log(response))
      .then((response) =>
      // el response status no funciona en el segundo fetch, pero si lo pongo en el primero, el catch no funciona.
        response.status === 200
          ? history.push("/exito")
          : null
      )
      .catch((error) => console.log(error,),
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde",
      }));
  };

  // Estilo de días
const buscadorDayStyle = (date) => getDate(date) ? "reservas-day-style" : undefined;

  const calendarHeaderReservas = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-reservas">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"navigation-arrows-reservas back-arrow-reservas"}
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
            className={"navigation-arrows-reservas next-arrow-reservas"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
  };

  const calendarHeaderReservasMobile = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => (
    <div className="header-calendar-reservas">
      <button
        aria-label="Previous Month"
        className={"navigation-arrows-reservas back-arrow-reservas"}
        style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
        onClick={decreaseMonth}
      >
        {<i>{backArrow}</i>}
      </button>
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
      <button
        aria-label="Next Month"
        className={"navigation-arrows-reservas next-arrow-reservas"}
        onClick={increaseMonth}
      >
        {<i>{nextArrow}</i>}
      </button>
    </div>
  );

  // AQUÍ SE TRAE LOS DATOS DEL PRODUCTO - API
  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
      setwidth(window.screen.availWidth);
    }
    window.addEventListener("resize", handleResize);
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
              <div className="booking-data-form">
                <FormDatos />
              </div>

              {/* CALENDARIO */}
              <h1 style={{ marginBottom: "13px" }}>
                Seleccioná tu fecha de reserva
              </h1>
              <div className="booking-calendar">
                <DatePicker
                  disabledKeyboardNavigation
                  inline
                  dayClassName={buscadorDayStyle}
                  renderCustomHeader={ width <= 480 ? calendarHeaderReservasMobile : calendarHeaderReservas }
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
                >
                  <div className="divider-reserva"></div>
                </DatePicker>
              </div>

              {/* HORARIO */}
              <h1 style={{ marginBottom: "16px" }}>Tu horario de llegada</h1>
              <div className="booking-data-horario">
                <HorarioLLegada horario={setHorario} />
              </div>
            </div>

            {/* DETALLES DE RESERVA - LADO DERECHO */}
            <div className="booking-details">
              <h1>Detalles de la reserva</h1>

              <div className="booking-image-info">
                {/* IMAGEN RESERVA */}
                <div className="booking-details-image">
                  <img
                    src={producto.imagenes[0].url}
                    alt={producto.imagenes[0].titulo}
                  />
                </div>

                {/* INFORMACIÓN DEL PRODUCTO */}
                <div className="booking-info-container">
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
                      <span className="hora-check-in">
                        {startDate ? startDate.toLocaleDateString() : "_/_/_"}
                      </span>
                    </div>
                    <div className="booking-details-divisor"></div>
                    <div className="txt-2 checks check-out">
                      <p>Check out</p>
                      <span className="hora-check-out">
                        {endDate ? endDate.toLocaleDateString() : "_/_/_"}
                      </span>
                    </div>
                    <div className="booking-details-divisor"></div>
                  </div>

                  {/* BOTÓN DE RESERVA */}
                  <button
                    className="btn-2 btn-details"
                    onClick={handlerReserva}
                  >
                    Confirmar reserva
                  </button>
                </div>
              </div>
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
