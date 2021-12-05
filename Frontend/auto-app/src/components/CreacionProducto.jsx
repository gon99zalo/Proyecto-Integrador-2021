import "../styles/creacionProducto.css";
import Header from "./Header";
import Footer from "./Footer";
import { api } from "./Buscador";
import { useEffect, useState } from "react";

export default function CreacionProducto() {
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [atributosArr, setAtributosArr] = useState([])
  const [nombreAtributo, setNombreAtributo] = useState([]) 
  const [iconoElegido, setIconoElegido] = useState([])
  const [imagenesArr, setImagenesArr] = useState([])
  const [imagen, setImagen] = useState([])


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

  const handlerSubmit = (e) => {
    e.preventDefault()

    let datosDeUsuario = sessionStorage.getItem("infoUsuario");
    let datosDeUsuarioParseado = JSON.parse(datosDeUsuario);

    let valores = {
      nombre : document.querySelector("#nombre-auto").value,
      descripcion: document.querySelector("#descripcion").value,
      categoria: document.querySelector("#categoria").value,
      ciudad: document.querySelector("#ciudad").value,
      imagenes: document.querySelector("#cargar-imagen").value,
      caracteristicas: [{
        nombre: document.querySelector("#nombre-atributo").value,
        icono: document.querySelector("#icono").value
      }],
    }

    let configPost = {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/JSON",
        Authorization: datosDeUsuarioParseado.token,
      },
    };

    fetch(api + "/productos", configPost)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(api + "/categorias/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setCategorias(result);
        },
        (error) => {
          console.log(error);
        }
      )
    traerCiudades();
  }, []);


  

  function Atributo() {
    return(
    <div className="esqueleto-agregar-atributo">
              <div className="agregar-icono">
                <div>
                  <label htmlFor="nombre-atributo">Nombre</label>
                  <input
                    type="text"
                    name="nombre-atributo"
                    id="nombre-atributo"
                    value={nombreAtributo}
                    disabled
                  />
                  <label htmlFor="icono" >Icono</label>
                  <input type="text" name="icono" id="icono" defaultValue="fa-Wifi" value={iconoElegido} disabled/>
                  <i className="fas fa-times cruz" onClick={() => borrarAtributo(atributosArr.length)}></i>
                  {/* encontrar otro icono, este es el unico gratis */}
                </div>
              </div>
            </div>
    )
  } 


  const handleChangeAtributo = () => {
    setNombreAtributo(document.querySelector("#nombre-atributo").value)
    setIconoElegido(document.querySelector("#icono").value);
  };

  const nuevoAtributo = () => {
    setNombreAtributo(nombreAtributo)
    setIconoElegido(iconoElegido)
    setAtributosArr([...atributosArr, <Atributo key={[atributosArr.length]} />])
  } 

  const borrarAtributo = (id) => {
    atributosArr.splice(id,1)
    setAtributosArr(atributosArr)
  }

  function Imagen() {
    return(
      <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" value={imagen} placeholder="insertar https://" />
                  <i className="fas fa-times cruz" onClick={() => borrarImagen(imagenesArr.length)}></i>
                  {/* encontrar otro icono, este es el unico gratis */}
                </div>
              </div>
            </div>
    )
  }

  const handleChangeImagen = () => {
    setImagen(document.querySelector("#cargar-imagen").value)
  };

  const nuevaImagen = () => {
    setImagen(imagen)
    setImagenesArr([...imagenesArr, <Imagen key={[imagenesArr.length]} />])
  } 

  const borrarImagen = (id) => {
    imagenesArr.splice(id,1)
    setImagenesArr(imagenesArr)
  }

  return (
    <>
      <Header />

      <div className="esqueleto-pagina">
        <div className="titulo">
          <h1>Crear auto</h1>
        </div>

        <form className="form-crear-auto" onSubmit={handlerSubmit}>
          <div className="inputs-crear-auto">
            <div className="inputs-pegados">
              <div>
                <label htmlFor="nombre">Nombre del auto</label>
                <input type="text" name="nombre" id="nombre-auto" placeholder="Audi A5" />

                <label htmlFor="direccion">Direccion</label>
                <input type="text" name="direccion" id="direccion" placeholder="Aráoz 2885" />
              </div>

              <div>
                <label htmlFor="categoria">Categoria</label>
                <select defaultValue="Auto" name="categoria" id="categoria" >
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
              <label htmlFor="descripcion">Descripcion</label>
              <textarea  name="descripcion" id="descripcion" placeholder="Escribir aquí" />
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
                    placeholder="Wifi"
                    onChange={handleChangeAtributo}
                  />
                  <label htmlFor="icono" >Icono</label>
                  <select name="icono" id="icono" onChange={handleChangeAtributo} defaultValue="fa-Wifi">
                    <option value="fa-Wifi" disabled>fa-Wifi</option>
                    <option value="fa-car-side">fa-car-side</option>
                    <option value="fa-bus">fa-bus</option>
                    <option value="fa-motorcycle">fa-motorcycle</option>
                    <option value="fa-gas-pump">fa-gas-pump</option>
                  </select>
                  <i className="fas fa-plus-square mas" onClick={nuevoAtributo}></i>
                </div>
              </div>
            </div>
            {atributosArr}

            <h2>Políticas del producto</h2>
            <div className="esqueleto-politicas">
              <div className="politicas">
                <div>
                  <h2>Normas del auto</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-normas"
                    placeholder="Escribir aquí"
                  />
                </div>
                <div>
                  <h2>Salud y seguridad</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-seguridad"
                    placeholder="Escribir aquí"
                  />
                </div>
                <div>
                  <h2>Política de cancelación</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-cancelacion"
                    placeholder="Escribir aquí"
                  />
                </div>
              </div>
            </div>

            <h2>Cargar imágenes</h2>
            <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" placeholder="insertar https://" onChange={handleChangeImagen} />
                  <i className="fas fa-plus-square mas" onClick={nuevaImagen}></i>
                </div>
              </div>
            </div>
            {imagenesArr}

            <input type="submit" className="submit-crear" value="Crear" />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}
