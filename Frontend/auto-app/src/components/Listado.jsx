//@ts-nocheck
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const api = "http://localhost:8080"

export default function Listado() {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);

  const handlerShowText = (title) => {
    setShowText({
      show: !showText.show,
      idText: title
    });
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
    fetch(api + "/productos/cantidad")
      .then(res => res.json())
      .then(
        (result) => {
          let array = [];
          while(array.length < 8 && array.length < result){
            var r = Math.floor(Math.random() * result) + 1;
            if(array.indexOf(r) === -1) array.push(r);
          }
          array.forEach((i) => {
            fetch(api + "/productos/buscar/" + i)
            .then(res => res.json())
            .then(
              (result) => {
                setProductos(productos => [...productos, result])
              },
              (error) => {
                let p = {
                  id: 0,
                  nombre: "error",
                  descripcion: "error",
                  categoria: {
                    titulo: "error",
                  },
                  ciudad: {
                    nombre: "error",
                    pais: "error"
                  }
                };
                setProductos(productos.push(p))
              }
            )
          })
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Loading />
    );
  } else {
    return (
    <>
      <div className="listado">
        <h2>Recomendaciones</h2>
        <div className="product-container">

          {productos.map( (item, i) => {
            return (
                <div className="product-card" key={i}>
                  <div className="product-image">
                    <img className="product" src={item.imagenes[0].url} alt={item.imagenes[0].titulo} />
                    <a href="/">
                      <img className="like" src="https://buimagenes.s3.us-east-2.amazonaws.com/img/like.png" alt="like" />
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
                    {item.caracteristicas.map(caract => {
                        return <><i class={"fas " + caract.icono} /><strong>{caract.nombre}</strong></>
                      })}
                    </div>
                    <div className="txt-1 product-description">
                      <p key={`p-${i}`}>
                        {showText.show && showText.idText === item.nombre ? item.descripcion : item.descripcion.substring(0, 20)+"..."}
                        <span key={`s-${i}`} className="show-text" onClick={() => handlerShowText(item.nombre)}> 
                          {showText.show && showText.idText === item.nombre ? " menos" : " más"}
                        </span>
                      </p>
                    </div>
                    <Link  to={"/productos/" + item.id}><button className="product-show-more btn-1">Ver Detalle</button></Link>
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
    </>
  );}
}
