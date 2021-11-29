import { useState } from "react";
import "../styles/formDatos.css";

export default function FormDatos(props) {
  //TODO: Si no se llena este campo arroja una pantalla de error hay que buscar una condición o algo
  // const infoUsuario = JSON.parse(localStorage.getItem("infoUsuario"));
  const [selectedOption, setSelectedOption] = useState(null)

  let datosDeUsuario = sessionStorage.getItem("infoUsuario")
  let datosDeUsuarioParseado = JSON.parse(datosDeUsuario)

  const handleCiudad = () => {
    setSelectedOption(document.querySelector("#ciudad").value);
    props.ciudad(selectedOption)
  };

  return (
    <>
        <form className="form-datosUsuario" action="">
          <div className="inputs-formDatosUsuario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" disabled value={datosDeUsuarioParseado.nombre} />

              <label htmlFor="email">Email</label>
              <input type="text" disabled value={datosDeUsuarioParseado.email} />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input type="text" disabled value={datosDeUsuarioParseado.apellido} />

              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" id="ciudad" required onChange={handleCiudad}/>
            </div>
          </div>
        </form>
    </>
  );
};