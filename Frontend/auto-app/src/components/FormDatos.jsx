import "../styles/formDatos.css";

export default function FormDatos() {
  //TODO: Si no se llena este campo arroja una pantalla de error hay que buscar una condición o algo
  // const infoUsuario = JSON.parse(localStorage.getItem("infoUsuario"));
  const nombreUsuario =  "Joan";
  const apellidoUsuario =  "González";
  const correoUsuario =  "joan.gs@outlook.com";

  return (
    <>
        <form className="form-datosUsuario" action="">
          <div className="inputs-formDatosUsuario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" disabled value={nombreUsuario} />

              <label htmlFor="email">Email</label>
              <input type="text" disabled value={correoUsuario} />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input type="text" disabled value={apellidoUsuario} />

              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" required />
            </div>
          </div>
        </form>
    </>
  );
};
