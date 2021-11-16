import "../styles/formDatos.css"
import HorarioLLegada from "./HorarioLlegada"

export default function FormDatos() {

    const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
    const nombreUsuario = infoUsuario.nombre
    const apellidoUsuario = infoUsuario.apellido
    const correoUsuario = infoUsuario.correo


    return (
        <>
        <div className="datosUsuario">
            <h2>Completá tus datos</h2>
            <form className="form-datosUsuario" action="">
                <div className="inputs-formDatosUsuario">
                <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" disabled value={nombreUsuario} />

                <label htmlFor="email">Email</label>
                <input type="text" disabled value={correoUsuario}/>
                </div>

                <div>
                <label htmlFor="apellido">Apellido</label>
                <input type="text" disabled value={apellidoUsuario} />

                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" required />
                </div>
                </div>
            </form>
        </div>
        </>
    )
}