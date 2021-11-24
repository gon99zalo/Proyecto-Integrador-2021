import "../styles/Politicas.css";

export default function Politicas() {
  return (
    <>
      <div className="commodity-rules">
        <h1>Qué tenés que saber</h1>
        <hr className="commodity-divisor" />
        <div className="commodity-rule-container">
          <div className="normas">
            <h3>Normas del vehículo</h3>
            <p>Norma 1</p>
            <p>Norma 2</p>
            <p>Norma 3</p>
          </div>
          <div className="salud">
            <h3>Salud y seguridad</h3>
            <p>Salud 1</p>
            <p>Salud 2</p>
            <p>Salud 3</p>
          </div>
          <div className="cancelacion">
            <h3>Política de cancelación</h3>
            <p className="texto-cancelacion">
              Agregá las fechas de tu viaje para obtener los detalles de
              cancelación de esta estadía.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
