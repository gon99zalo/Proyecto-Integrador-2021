//@ts-nocheck
import "../styles/horarioLlegada.css";
import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HorarioLLegada() {
  const Hora = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        popperClassName="datepicker"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    );
  };

  return (
    <>
      <div className="horarioLlegada">
        <h2>Tu horario de llegada</h2>
        <form action="" className="form-horarioLlegada">
          <div>
            <p>Tu habitación va a estar lista para el check-in entre las</p>
            {/* <label htmlFor="horarioElegido">Indicá tu horario estimado de llegada</label> 
             <select>
             <option value="" selected disabled hidden>Seleccionar hora</option>
             </select> */}
            <Hora />
          </div>
        </form>
      </div>
    </>
  );
}
