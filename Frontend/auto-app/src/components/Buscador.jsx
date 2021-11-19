//@ts-nocheck
import "../styles/buscador.css";
import React, { useState, forwardRef, useEffect } from "react";
//Para calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/CalendarDatePicker.css";
//Para que el calendario esté en español
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
//Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
//Formatear fechas
import { subDays } from 'date-fns';
import { Link } from "react-router-dom";
//Autcomplete buscador
//import { AutoComplete } from 'primereact/autocomplete';

export const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"

export default function Buscador() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const calendarIcon = <FontAwesomeIcon icon={faCalendarDay} />
  const [width, setwidth] = useState ({ width: window.screen.availWidth });
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [selectedCity, setSelectedCity] = useState(null)
  const [filteredCitites, setFilteredCities] = useState([]);
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
  const ciudadElegida = document.querySelector("option:checked").value
    setCiudad(ciudadElegida);
}

  useEffect(() => {
    //calculo del ancho de pantalla
    setwidth(window.screen.availWidth);
    function handleResize() {
        setwidth(window.screen.availWidth);
    }

    window.addEventListener('resize', handleResize)
    //get al api de ciudades

    fetch(api + "/ciudades/todas")
      .then(res => res.json())
      .then(
        (result) => {
          setCiudades(result);
        },
        (error) => {
          console.log(error);
        }
      )
      return _ => {
        window.removeEventListener('resize', handleResize)
    }
  }, []);

  const CalendarInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-input" onClick={onClick} >
      <i>{calendarIcon}</i><p>{value ? value : "Check in - Check out"}</p>
    </button>
  ));

  const calendarHeader = ({ monthDate, customHeaderCount, decreaseMonth, increaseMonth, }) => {
    return (
      <div>
        <button
          aria-label="Previous Month"
          className={
            "react-datepicker__navigation react-datepicker__navigation--previous"
          }
          style={
            customHeaderCount === 1 ? { visibility: "hidden" } : null
          }
          onClick={decreaseMonth}
        >
          <span
            className={
              "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
            }
          >
            {"<"}
          </span>
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
          className={
            "react-datepicker__navigation react-datepicker__navigation--next"
          }
          style={
            customHeaderCount === 0 ? { visibility: "hidden" } : null
          }
          onClick={increaseMonth}
        >
          <span
            className={
              "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
            }
          >
            {">"}
          </span>
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
    <div>
      <button
        aria-label="Previous Month"
        className={
          "react-datepicker__navigation react-datepicker__navigation--previous"
        }
        style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
        onClick={decreaseMonth}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
          }
        >
          {"<"}
        </span>
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
        className={
          "react-datepicker__navigation react-datepicker__navigation--next"
        }
        onClick={increaseMonth}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
          }
        >
          {">"}
        </span>
      </button>
    </div>
  );

  return (
    <div className="buscador">
      <h1 className="titulo-buscador">Busca el auto que necesitas</h1>
      <div className="buscadores">
      {/* <AutoComplete placeholder="Elige donde quieres retirar el auto" value={selectedCity} completeMethod={searchCities} suggestions={filteredCitites} field="nombre" onChange={(e) => {setCiudad(e.value.nombre); setSelectedCity(e.value)}}/>  */}
      <select name="ciudades" onClick={handlerCiudad}>
      <option value="" defaultValue disabled hidden>Elige donde quieres retirar el auto</option>
        {ciudades.map(ciudad => <option value={ciudad.nombre}>{ciudad.nombre}</option>)}
      </select>
        <DatePicker
          renderCustomHeader={width <= 480 ? calendarHeaderMobile : calendarHeader}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          monthsShown={width <= 480 ? 1 : 2}
          locale="es"
          customInput={<CalendarInput />}
          shouldCloseOnSelect={false}
          minDate={subDays(new Date(), 0)}
          dateFormat="d 'de' MMM'.'"
          formatWeekDay={day => day.charAt(0).toUpperCase() + day.substring(1,2) }
          popperPlacement={width <= 768 ? "bottom-end" : "bottom-start"}
        >
          <button className="btn-1 calendar-button">Aplicar</button>
          <div className="divider"></div>
        </DatePicker>
        <Link to={ciudad === "" ? "/buscar": "/buscar?locacion=" + ciudad} className="boton-buscar" id="boton-buscar" >
          Buscar
        </Link> 
      </div>
    </div>
  );
}
