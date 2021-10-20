import "../styles/buscador.css"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function Buscador() {
    // const [startDate, setStartDate] = useState(null);

    return (
        <div className="buscador">
        <h1 className="titulo-buscador">Busca el auto que necesitas</h1>
        <div className="buscadores">
        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        <select>
            <option hidden selected>Elija donde quiera retirar el auto</option>
            <option>San Carlos de Bariloche</option>
            <option>Buenos Aires</option>
            <option>Mendoza</option>
            <option>Cordoba</option>
        </select>
        <input type="date" />
        <input type="date" />
        <button className="boton-buscar" id="boton-buscar" >Buscar</button>
        </div>
        </div>
    )
}