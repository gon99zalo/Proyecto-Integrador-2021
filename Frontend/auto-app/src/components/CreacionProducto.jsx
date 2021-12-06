import "../styles/creacionProducto.css";
import Header from "./Header";
import Footer from "./Footer";
import { api } from "./Buscador";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function CreacionProducto() {
  const history = useHistory();
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [atributosArr, setAtributosArr] = useState([])
  const [nombreAtributo, setNombreAtributo] = useState([]) 
  const [iconoElegido, setIconoElegido] = useState([])
  const [imagenesArr, setImagenesArr] = useState([])
  const [imagen, setImagen] = useState([])
  const [ciudadId, setCiudadId] = useState(null)
  const [categoriaId, setCategoriaId] = useState(null)
  // const [nombreImagen, setNombreImagen] = useState(null)
  const [objetoAtributo, setObjetoAtributo] = useState([])
  const [objetoImagen, setObjetoImagen] = useState([])

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

  let ciudadElegida = "buenos aires";
  const handleCangeCiudad = () => {
    ciudadElegida = document.querySelector("#ciudad").value
    setCiudadId(ciudadElegida);
    console.log(ciudadId)
  };

  let categoriaElegida = "autos";
  const handleChangeCategoria = () => {
    categoriaElegida = document.querySelector("#categoria").value
    setCategoriaId(categoriaElegida);
    console.log(categoriaId)
  };

  const handlerSubmit = (e) => {
    e.preventDefault()

    let datosDeUsuario = sessionStorage.getItem("infoUsuario");
    let datosDeUsuarioParseado = JSON.parse(datosDeUsuario);

    let valores = {
      nombre : document.querySelector("#nombre-auto").value,
      descripcion: document.querySelector("#descripcion").value,
      categoria: {id: categoriaId},
      ciudad: {id: ciudadId},
      imagenes: [...objetoImagen],
      caracteristicas: [...objetoAtributo],
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
      .then((data) => {console.log(data)
      return data.status === 200 ? history.push("/administracion/exito") : Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lamentablemente el producto no ha podido crearse. Por favor intente más tarde",
      })
      })
      .catch((error) => {console.log(error)});
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

  function Atributo(props) {
    return(
    <div className="esqueleto-agregar-atributo">
              <div className="agregar-icono">
                <div>
                  <label htmlFor="nombre-atributo">Nombre</label>
                  <input
                    type="text"
                    name="nombre-atributo"
                    id="nombre-atributo"
                    value={props.datos.nombre}
                    disabled
                  />
                  <label htmlFor="icono" >Icono</label>
                  <input type="text" name="icono" id="icono" defaultValue="fa-Wifi" value={props.datos.icono} disabled/>
                  <i className="fas fa-times cruz" onClick={() => borrarAtributo(props.id)}></i>
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
    setAtributosArr([...atributosArr, <Atributo key={[atributosArr.length]} id={atributosArr.length} />])
    setObjetoAtributo([...objetoAtributo, {
      nombre: nombreAtributo,
      icono: iconoElegido
    }])
  } 

  const borrarAtributo = (id) => {
    let original = objetoAtributo
    original.splice(id,1)
    setObjetoAtributo([...original])
  }

  function Imagen(props) {
    return(
      <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" value={props.datos.url} disabled />
                  <i className="fas fa-times cruz" onClick={() => borrarImagen(props.id)}></i>
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
    let nombreAuto = document.querySelector("#nombre-auto").value
    // setNombreImagen(nombreAuto + " " + imagenesArr.length)
    setObjetoImagen([...objetoImagen, {
      titulo: nombreAuto + " " + objetoImagen.length,
      url: imagen,
    }])
  } 

  const borrarImagen = (id) => {
    let original = objetoImagen
    original.splice(id,1)
    setObjetoImagen([...original])
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
                <select defaultValue="Categoria" name="categoria" id="categoria" onChange={handleChangeCategoria}>
                  <option value="Categoria" disabled>
                    Categoría
                  </option>
                  {categorias.map((categoria) => (
                    <option value={categoria.id}>{categoria.titulo}</option>
                  ))}
                </select>

                <label htmlFor="ciudad">Ciudad</label>
                <select
                  defaultValue="Ciudad"
                  name="ciudad"
                  id="ciudad"
                  required 
                  onChange={handleCangeCiudad}
                >
                  <option value="Ciudad" disabled>
                    Ciudad
                  </option>
                  {ciudades.map((ciudad) => (
                    <option value={ciudad.id}>{ciudad.nombre}</option>
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
                  <select name="icono" id="icono" onChange={handleChangeAtributo} defaultValue="fa-car-side">
                    <option value="fa-car-side" className="fa"> &#xf5e4; vehículo</option>
                    <option value="fa-bus" className="fa"> &#xf207; bus</option>
                    <option value="fa-motorcycle" className="fa"> &#xf21c; moto</option>
                    <option value="fa-gas-pump" className="fa"> &#xf52f; combustible</option>
                    <option value="fa-users" className="fa"> &#xf0c0; capacidad</option>
                    <option value="fa-clock" className="fa"> &#xf017; año</option>
                  </select>
                  <i className="fas fa-plus-square mas" onClick={nuevoAtributo}></i>
                </div>
              </div>
            </div>
            {/* {atributosArr} */}
            {objetoAtributo.map((objeto, index) => <Atributo datos={objeto} id={index} />)}

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
            {objetoImagen.map((objeto, index) => <Imagen datos={objeto} id={index} />)}

            <input type="submit" className="submit-crear" value="Crear" />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}
