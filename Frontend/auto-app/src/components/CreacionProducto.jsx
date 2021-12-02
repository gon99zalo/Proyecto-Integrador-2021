import "../styles/creacionProducto.css";
import Header from "./Header";
import Footer from "./Footer";
import { api } from "./Buscador";
import { useEffect, useState } from "react";

export default function CreacionProducto() {
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const traerCategorias = () => {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
      },
    };

    fetch(api + "/categorias/todas", config)
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.log(error));
  };

  const traerCiudades = () => {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
      },
    };

    fetch(api + "/ciudades/todas", config)
      .then((response) => response.json())
      .then((data) => setCiudades(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    traerCategorias();
    traerCiudades();
  }, []);

  return (
    <>
      <Header />

      <div className="esqueleto-pagina">
        <div className="titulo">
          <h1>Crear auto</h1>
        </div>

        <form className="form-crear-auto" action="">
          <div className="inputs-crear-auto">
            <div className="inputs-pegados">
              <div>
                <label htmlFor="nombre">Nombre del auto</label>
                <input type="text" name="nombre" id="nombre-auto" />

                <label htmlFor="direccion">Direccion</label>
                <input type="text" name="direccion" id="direccion" />
              </div>

              <div>
                <label htmlFor="categoria">Categoria</label>
                <select defaultValue="Auto" name="categoria" id="categoria">
                  <option value="Auto" disabled>
                    Auto
                  </option>
                  {categorias.map((categoria) => (
                    <option>{categoria.titulo}</option>
                  ))}
                </select>

                <label htmlFor="ciudad">Ciudad</label>
                <select
                  defaultValue="Ciudad"
                  name="ciudad"
                  id="ciudad"
                  required
                >
                  <option value="Ciudad" disabled>
                    Ciudad
                  </option>
                  {ciudades.map((ciudad) => (
                    <option>{ciudad.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="div-descripcion">
              <label>Descripcion</label>
              <input type="text" name="descripcion" id="descripcion" />
            </div>

            <h2>Agregar atributos</h2>
            <div className="esqueleto-agregar-atributo">
              <div className="agregar-icono">
                <div>
                  <label htmlFor="nombre-atributo">Nombre</label>
                  <input
                    type="text"
                    name="nombre-atributo"
                    id="nombre-atributo"
                  />
                  <label htmlFor="icono">Icono</label>
                  <input type="text" name="icono" id="icono" />
                  <i className="fas fa-plus-square"></i>
                </div>
              </div>
            </div>

            <h2>Políticas del producto</h2>
            <div className="esqueleto-politicas">
              <div className="politicas">
                <div>
                  <h2>Normas del auto</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <input
                    type="text"
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-normas"
                  />
                </div>
                <div>
                  <h2>Salud y seguridad</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <input
                    type="text"
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-seguridad"
                  />
                </div>
                <div>
                  <h2>Política de cancelación</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <input
                    type="text"
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-cancelacion"
                  />
                </div>
              </div>
            </div>

            <h2>Cargar imágenes</h2>
            <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" />
                  <i className="fas fa-plus-square"></i>
                </div>
              </div>
            </div>

            <input type="submit" className="submit-crear" value="Crear" />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}
