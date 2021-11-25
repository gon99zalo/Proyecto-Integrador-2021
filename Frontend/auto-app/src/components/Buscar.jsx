import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";
import Header from "./Header";
import Buscador from "./Buscador";
import Footer from "./Footer";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
const url = window.location.href

export default function Buscar(props) {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const params = useMemo(() => new URLSearchParams(window.location.search),[]);

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

  //useEffect que funciona como componentDidMount
  useEffect(() => {
    if (params.get("categoria") != null){
      fetch(api + "/productos/categoria?titulo=" + params.get("categoria"))
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
    else if (params.get("locacion") != null) {
      fetch(api + "/productos/ciudad?nombre=" + params.get("locacion"))
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
  }, [params])

  //useEffect que funciona como componentDidUpdate
  useEffect(() => {
    if(window.location.href !== url){
      window.location.reload()
      console.log("reload");
    }
  })


  if (error) {
    return (
    <>
      <Header/>
      <Buscador/>
      <div>Error: {error.message}</div>
      <Footer/>
    </>)
  } else if (!isLoaded) {
    return (
    <>
      <Header/>
      <Buscador/>
      <Loading />
      <Footer/>
    </>)
  } else {
  return (
    <>
    <Header/>
    <Buscador/>
      <div className="buscar"  key={params.get("locacion")}>
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
                        return <><i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong></>
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
                    <button className="product-show-more btn-1"><Link to={"/productos/" + item.id}>Ver Detalle</Link></button>
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
  );}
}