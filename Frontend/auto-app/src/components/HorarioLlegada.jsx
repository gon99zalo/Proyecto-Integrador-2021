import "../styles/horarioLlegada.css"

export default function HorarioLLegada() {

    return (
         <>
         <div className="horarioLlegada">
         <h2>Tu horario de llegada</h2>
         <form action="" className="form-horarioLlegada">
             <div>
             <p>Tu habitación va a estar lista para el check-in entre las</p>
             <label htmlFor="horarioElegido">Indicá tu horario estimado de llegada</label> 
             <select>
             <option value="" selected disabled hidden>Seleccionar hora</option>
             </select>
             </div>
         </form>
         </div>
         </>
    )
}