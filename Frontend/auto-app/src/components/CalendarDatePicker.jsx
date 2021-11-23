//@ts-nocheck
import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
import { subDays, getDate } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/CalendarDatePicker.css";

export default function Calendario() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [width, setwidth] = useState({ width: window.screen.availWidth });
  const [conInput, setConInput] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarIcon = <FontAwesomeIcon icon={faCalendarDay} />;
  const previousArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  registerLocale("es", es);

  // useEffect para obtener valores del tamaño de pantalla
  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
      setwidth(window.screen.availWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  // Atrapa la fecha después de cerrado el calendario
  const handleCalendarClose = () => {
    //El formato es dd/mm/yyyy
    console.log(
      "Fecha de incio",
      startDate ? startDate.toLocaleDateString() : "sin escoger"
    );
    console.log(
      "Fecha de finalización",
      endDate ? endDate.toLocaleDateString() : "sin escoger"
    );
  };

  //Define si mostrar o no el input del calendario
  const handleInput = () => {
    setConInput(!conInput);
  };

  //Componente Input
  const CalendarInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-picker-input" onClick={onClick} ref={ref}>
      {/* PlaceHolder */}
      <i>{calendarIcon}</i>
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
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-container">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"month-navigation-arrows mont-previous-arrow"}
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            {/* <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
              
            </span> */}
            {<i>{previousArrow}</i>}
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
            className={"month-navigation-arrows mont-next-arrow"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {/* <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span> */}
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
  };

  // Estilo de días
  // const calendarDays = (day, date) => {
  //   return(
  //     <>
  //       <span className="calendar-days">{getDate(date)}</span>
  //     </>
  //   );
  // };

  const calendarDayStyle = (date) =>
    getDate(date) ? "calendar-day-style" : undefined;

  const handleShowCalendar = () => {
    //Condición para que muestre algo si no se seleccionan de las fechas
    if (startDate === null || endDate === null) {
      console.log("debes seleccionar la fecha");
    } else {
      setShowCalendar(!showCalendar);
    }
  };

  const excludedDates = (date) => {
    console.log("fecha", date);
  };

  return (
    <>
      <button
        onClick={handleShowCalendar}
        style={{
          width: "400px",
          height: "50px",
          backgroundColor: "var(--main-color)",
          color: "white",
          fontSize: "24px",
          fontWeight: 700,
          borderRadius: "10px",
          border: "0",
          cursor: "pointer",
          marginTop: "40px",
        }}
      >
        Cerrar
      </button>
      <DatePicker
        //--------- --------- para hacer algo cuando se cierre el calendario
        onCalendarClose={handleCalendarClose}
        //--------- --------- para que aparezca sin necesidad del input
        inline={conInput}
        //--------- --------- permite borrar la fecha cuando hay input
        isClearable
        //--------- --------- agrega clase al contenedor detrás del calendario
        popperClassName="popper-calendar"
        //--------- --------- ubicación del calendario cuando tiene input
        // popperPlacement="bottom-left"
        //--------- --------- modifica el popper; más información en: https://popper.js.org
        popperModifiers={[
          {
            //offset permite mover el popper en pos(x, y)
            name: "offset",
            options: {
              offset: [0, 0],
            },
          },
        ]}
        //--------- --------- para modificar el componente input
        customInput={<CalendarInput />}
        //--------- --------- para modificar header
        renderCustomHeader={calendarHeader}
        //--------- --------- para modificar el texto de los días
        // renderDayContents={calendarDays}
        //
        dayClassName={calendarDayStyle}
        // Formato de fechas mostradas en Input
        dateFormat="d 'de' MMM'.'"
        //--------- --------- para poder seleccionar un rango de fechas
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        //--------- --------- para que cuando sea menor a 480 se vuelva uno
        monthsShown={width <= 480 ? 1 : 2}
        //--------- --------- para que sea en español
        locale="es"
        //--------- --------- para que no se puedan escojer fechas pasadas a la actual
        minDate={subDays(new Date(), 0)}
        //--------- --------- para que el nombre de los meses quede con mayúscula inicial
        formatWeekDay={(day) =>
          day.charAt(0).toUpperCase() + day.substring(1, 2)
        }
        // Excluye fechas
        filterDate={excludedDates}
        // Cierra el calendario después de seleccionar las fechas
        shouldCloseOnSelect={false}
        // Muestra o desaparece la flecha en el popper
        showPopperArrow={false}
      >
        <div className="divider"></div>
      </DatePicker>

      <button
        onClick={handleInput}
        style={{
          width: "300px",
          height: "50px",
          backgroundColor: "var(--main-color)",
          color: "white",
          fontSize: "24px",
          fontWeight: 700,
          borderRadius: "10px",
          border: "0",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Input
      </button>
    </>
  );
}
