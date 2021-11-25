//@ts-nocheck
import "../styles/horarioLlegada.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function HorarioLLegada(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const checkCircle = <FontAwesomeIcon icon={faCheckCircle} />;

  let horaElegida = null;

  const handleChange = () => {
    horaElegida = document.querySelector("option:checked").value;
    setSelectedOption(document.querySelector("option:checked").value);
    props.horario(horaElegida)
  };

  return (
    <>
        <form action="" className="form-horarioLlegada">
            <p>
              <i>{checkCircle}</i>
              Tu auto va a estar listo en el siguiente horario: {selectedOption}
            </p>
            <label htmlFor="horarioElegido">
              Indica tu horario estimado de llegada
            </label>
            <select name="horario" onChange={handleChange}>
              <option value="" defaultValue="Seleccionar hora" disabled hidden>
                Seleccionar hora
              </option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="2:00 AM">2:00 AM</option>
              <option value="3:00 AM">3:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </select>
        </form>
    </>
  );

};
