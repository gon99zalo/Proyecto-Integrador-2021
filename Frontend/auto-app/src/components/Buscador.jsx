//@ts-nocheck
import "../styles/buscador.css";
import React, { useState, forwardRef, useEffect } from "react";
//Para calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/CalendarBuscador.css";
// import "../styles/CalendarDatePicker.css";
//Para que el calendario esté en español
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
//Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//Formatear fechas
import { subDays, getDate } from "date-fns";
import { Link } from "react-router-dom";
//Autcomplete buscador
//import { AutoComplete } from 'primereact/autocomplete';

export const api =
  "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";

export default function Buscador() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [width, setwidth] = useState({ width: window.screen.availWidth });
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  //const [selectedCity, setSelectedCity] = useState(null)
  //const [filteredCitites, setFilteredCities] = useState([]);
  const previousArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  registerLocale("es", es);

  //funcion buscador ciudades
  //   const searchCities = (event) => {
  //     let filteredCities;
  //     if (!event.query.trim().length) {
  //         filteredCities = [...ciudades];
  //     } else {
  //         filteredCities = ciudades.filter(ciudad => {
  //             return ciudad.nombre.toLowerCase().indexOf(event.query.toLowerCase()) >= 0;
  //         });
  //         console.log(filteredCitites)
  //     }

  //     setFilteredCities(filteredCities);
  // }

  const handlerCiudad = () => {
    const ciudadElegida = document.querySelector("option:checked").value;
    setCiudad(ciudadElegida);
  };

  useEffect(() => {
    //calculo del ancho de pantalla
    setwidth(window.screen.availWidth);
    function handleResize() {
      setwidth(window.screen.availWidth);
    }

    window.addEventListener("resize", handleResize);
    //get al api de ciudades

    fetch(api + "/ciudades/todas")
      .then((res) => res.json())
      .then(
        (result) => {
          setCiudades(result);
        },
        (error) => {
          console.log(error);
        }
      );
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CalendarBuscadorInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-buscador-input" onClick={onClick}>
      {/* PlaceHolder */}
      <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.8 2H18.7V0H16.5V2H5.5V0H3.3V2H2.2C0.99 2 0 2.9 0 4V20C0 21.1 0.99 22 2.2 22H19.8C21.01 22 22 21.1 22 20V4C22 2.9 21.01 2 19.8 2ZM19.8 20H2.2V7H19.8V20Z"
          fill="#191b1d"
        />
      </svg>
      <p>{value ? value : "Check in - Check out"}</p>
    </button>
  ));

  const calendarHeader = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <div className="header-calendar-buscador">
        <button
          aria-label="Previous Month"
          className={"navigation-arrows-buscador back-arrow-buscador"}
          style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
          onClick={decreaseMonth}
        >
          {<i>{previousArrow}</i>}
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
          className={"navigation-arrows-buscador next-arrow-buscador"}
          style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
          onClick={increaseMonth}
        >
          {<i>{nextArrow}</i>}
        </button>
      </div>
    );
  };

  const calendarHeaderMobile = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => (
    <div className="header-calendar-buscador">
      <button
        aria-label="Previous Month"
        className={"navigation-arrows-buscador back-arrow-buscador"}
        style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
        onClick={decreaseMonth}
      >
        {<i>{previousArrow}</i>}
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
        className={"navigation-arrows-buscador next-arrow-buscador"}
        onClick={increaseMonth}
      >
        {<i>{nextArrow}</i>}
      </button>
    </div>
  );

  // Estilo de días
  const buscadorDayStyle = (date) => getDate(date) ? "buscador-day-style" : undefined;

  const handleCloseCalendar = () => {
    // setHideCalendar(!hideCalendar);
    console.log("al hacer click aquí debe cerrar el popper");
  };


  return (
    <div className="buscador">
      <h1 className="titulo-buscador">Busca el auto que necesitas</h1>
      <div className="buscadores">
        {/* <AutoComplete placeholder="Elige donde quieres retirar el auto" value={selectedCity} completeMethod={searchCities} suggestions={filteredCitites} field="nombre" onChange={(e) => {setCiudad(e.value.nombre); setSelectedCity(e.value)}}/>  */}
        <select defaultValue="Elige donde quieres retirar el auto" name="ciudades" onClick={handlerCiudad}>
          <option value="Elige donde quieres retirar el auto" disabled>
            Elige donde quieres retirar el auto
          </option>
          {ciudades.map((ciudad, index) => (
            <option key={index} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>

        <DatePicker
          disabledKeyboardNavigation
          renderCustomHeader={ width <= 480 ? calendarHeaderMobile : calendarHeader }
          showPopperArrow={false}
          customInput={<CalendarBuscadorInput />}
          dayClassName={buscadorDayStyle}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable
          monthsShown={width <= 480 ? 1 : 2}
          locale="es"
          shouldCloseOnSelect={false}
          minDate={subDays(new Date(), 0)}
          dateFormat="d 'de' MMM'.'"
          formatWeekDay={(day) =>
            day.charAt(0).toUpperCase() + day.substring(1, 2)
          }
          popperPlacement={width <= 768 ? "bottom-end" : "bottom-start"}
          popperClassName="popper-calendar-buscador"
        >
          <button onClick={handleCloseCalendar} className="btn-1 calendar-button-buscador">Aplicar</button>
          <div className="divider-buscador"></div>
        </DatePicker>

        <Link
          to={ciudad === "" ? "/buscar" : "/buscar?locacion=" + ciudad}
          className="boton-buscar"
          id="boton-buscar"
        >
          Buscar
        </Link>
      </div>
    </div>
  );
}
