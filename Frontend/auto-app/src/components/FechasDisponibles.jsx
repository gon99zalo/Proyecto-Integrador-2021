import "../styles/fechasDisponibles.css"

export default function FechasDisponibles() {
    return(
        <div className="fechas-disponibles">
        <h2 className="titulo-fechas">Fechas disponibles</h2>
        <div className="inicar-reserva">
            <p>Agregá tus fechas de viaje para obetener precios exactos</p>
            <button className="boton-iniciar-reserva">Iniciar reseva</button>
        </div>
        </div>
    )
}