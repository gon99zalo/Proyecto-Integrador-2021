import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt, faStar, faUserAlt, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";
import Header from "./Header";
import Buscador from "./Buscador";
import Footer from "./Footer";

const api = "http://localhost:8080"

export default function Buscar(props) {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const people = <FontAwesomeIcon icon={faUserAlt} />;
  const door = <FontAwesomeIcon icon={faDoorClosed} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const { locacion, categoria } = props.location.state

  const handlerShowText = (title) => {
    setShowText({
      show: !showText.show,
      idText: title
    });
  };

  const withDoors = (categoria, doors) => {
    if(categoria === "Motos" || categoria === "Bicicletas") {
      return "";
    } else {
      return ((<><i>{door}</i><strong>{doors}</strong></>));
    };
  };

  const qualificationText = (qualification) => {
    if(qualification >= 1 && qualification <= 2.5) {
      return "Muy malo";
    } else if(qualification > 2.5 && qualification <= 5) {
      return "Malo";
    } else if(qualification > 5 && qualification <= 7.5) {
      return "Bueno";
    } else if(qualification > 7.5 && qualification <= 10) {
      return "Muy bueno";
    } else {
      return "Sin Calificación";
    };
  };

  useEffect(() => {
    if((locacion=="") && (categoria=="")){
      fetch(api + "/productos/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setProductos(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }
    else if ((locacion=="")){
      fetch(api + "/productos/categoria?titulo=" + categoria)
      .then(res => res.json())
      .then(
        (result) => {
          setProductos(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }
    else {
      fetch(api + "/productos/ciudad?nombre=" + locacion)
      .then(res => res.json())
      .then(
        (result) => {
          setProductos(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }
  }, [])

  return (
    <>
    <Header/>
    <Buscador/>
      <div className="buscar">
        <div className="product-container">

          {productos.map( (item, i) => {
            return (
                <div className="product-card" key={i}>
                  <div className="product-image">
                  <img className="product" src={item.imagenes[0].url} alt={item.imagenes[0].titulo} />
                    <a href="./">
                      <img className="like" src="img/like.png" alt="like" />
                    </a>
                  </div>
                  <div className="product-data">
                    <div className="product-star-rating">
                      <h4>{item.categoria.titulo}</h4>
                      <div>
                        <i>{star}</i>
                        <i>{star}</i>
                        <i>{star}</i>
                        <i>{star}</i>
                        <i>{star}</i>
                      </div>
                    </div>
                    <h1>{item.nombre}</h1>
                    <p className="txt-1 product-location">
                      <i>{marker}</i> A 100mt de {item.ciudad.nombre + ", " + item.ciudad.pais} <a href="./"><span>MOSTRAR EN EL MAPA</span></a>
                    </p>
                    <div className="product-features">
                      <i>{people}</i><strong>{/*item.people --cantidad de personas*/}3</strong>
                      {/*withDoors(item.doors) --cantidad de puertas*/}{withDoors(item.categoria.nombre, 4)}
                    </div>
                    <div className="txt-1 product-description">
                      <p key={`p-${i}`}>
                        {showText.show && showText.idText === item.nombre ? item.descripcion : item.descripcion.substring(0, 20)+"..."}
                        <span key={`s-${i}`} className="show-text" onClick={() => handlerShowText(item.nombre)}> 
                          {showText.show && showText.idText === item.nombre ? " menos" : " más"}
                        </span>
                      </p>
                    </div>
                    <button className="product-show-more btn-1"><a href={"./productos/" + item.id}>Ver Detalle</a></button>
                    <div className="qualification">
                      <span>{/*item.qualification*/ 7}</span>
                      <p className="txt-1">{qualificationText(/*item.qualification*/7)}</p>
                    </div>
                  </div>
                </div>
            );
          })}

        </div>
      </div>
      <Footer/>
    </>
  );
}