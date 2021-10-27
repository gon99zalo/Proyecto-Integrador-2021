//@ts-nocheck
import "../styles/buscador.css";
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Para calendar
import "../styles/CalendarDatePicker.css";
//Para que el calendario esté en español
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

export default function Buscador() {
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;

  const [startDate, setStartDate] = useState(new Date());
  registerLocale("es", es);

  const CalendarInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className="buscador">
      <h1 className="titulo-buscador">Busca el auto que necesitas</h1>
      <div className="buscadores">
        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        <select>
          <option hidden selected>
            Elije donde quieres retirar el auto
          </option>
          <option>San Carlos de Bariloche</option>
          <option>Buenos Aires</option>
          <option>Mendoza</option>
          <option>Cordoba</option>
        </select>

        <DatePicker
          renderCustomHeader={({
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
          )}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={2}
          locale="es"
          placeholderText="Select a weekday"
          customInput={<CalendarInput />}
        />

        {/* <DatePicker className="datePicker"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
            setDateRange(update);
        }}/> */}
        <button className="boton-buscar" id="boton-buscar">
          Buscar
        </button>
      </div>
    </div>
  );
}
