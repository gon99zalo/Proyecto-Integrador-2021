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

const api = "http://localhost:8080"

export default function Buscador() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const calendarIcon = <FontAwesomeIcon icon={faCalendarDay} />
  const [width, setwidth] = useState ({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  registerLocale("es", es);

  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
        setwidth(window.screen.availWidth);
    }
    window.addEventListener('resize', handleResize)
    fetch(api + "/ciudades/todas")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCiudades(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    return _ => {
        window.removeEventListener('resize', handleResize)
    }
  }, []);

  const CalendarInput = forwardRef(({ value, onClick }) => (
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
        <select>
          <option hidden selected>
            Elije donde quieres retirar el auto
          </option>
          {ciudades.map((item) => {console.log(item.nombre); return <option>{item.nombre}</option>})}
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
        <button className="boton-buscar" id="boton-buscar">
          Buscar
        </button>
      </div>
    </div>
  );
}
