//@ts-nocheck
// Librerías
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// Estilo CSS
import "../styles/producto.css";
// Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faChevronLeft, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// Calendario
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { subDays } from 'date-fns';
// Galería de imagenes
import Gallery from './Gallery';
import SwipeGallery from './SwipeGallery';
import Header from "./Header";
import Footer from './Footer';
import Loading from './Loading';

export default function Producto(props) {
  const commodityBackArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  registerLocale("es", es);
  const api = "http://localhost:8080"
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [width, setwidth] = useState ({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [center, setCenter] = useState({
    lat: -34.603722,
    lng: -58.381592
  });
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: {
      titulo: "",
    },
    ciudad: {
      nombre: "",
      pais: ""
    },
    imagenes: {
      titulo: "",
      url: ""
    }
  });
  Geocode.setApiKey("AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s");

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
    setwidth(window.screen.availWidth);
    function handleResize() {
        setwidth(window.screen.availWidth);
    }
    window.addEventListener('resize', handleResize)
    fetch(api + "/productos/buscar/" + props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          result == null ? console.log(result) : setProducto(result);
          Geocode.fromAddress(result.ciudad.nombre + ", " + result.ciudad.pais).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setCenter({
                lat: lat,
                lng: lng
              });
              setIsLoaded(true)
            },
            (error) => {
              console.error(error);
              setIsLoaded(true)
            }
          );
        },
        (error) => {
          setError(error);
          setIsLoaded(true)
          setProducto({
            id: 0,
            nombre: "error",
            descripcion: "error",
            categoria: {
              titulo: "error",
            },
            imagenes: {
              titulo:"error",
              url: "error"
            },
            ciudad: {
              nombre: "error",
              pais: "error"
            }
          })
        })
    return _ => {
        window.removeEventListener('resize', handleResize)
    }
  }, [props.match.params.id]);
  if (error) {
    return (
    <>
    <Header />
    <div>Error: {error.message}</div>;
    <Footer />
    </>
    )
  } else if (!isLoaded) {
    return (
      <>
      <Header />
      {/* <div>Loading...</div> */}
      <Loading />
      <Footer />
    </>
    )
  } else {
  return (
    <>
    <Header />
      <div className="commodity-container">

        <div className="commodity-header">

          <div className="commodity-header-titles">
            <div>
              <h4>{producto.categoria.titulo}</h4>
              <h1>{producto.nombre}</h1>
            </div>
            <i className="commodity-back-arrow"><a href="/">{commodityBackArrow}</a></i>
            
          </div>

          <div className="commodity-location-ranking">
            <div className="commodity-location-description">
              <i>{marker}</i>
              <div className="texto-locacion">
                <p> Aquí va la ciudad ingresada en el buscador</p>
                <p>Aquí la distancia y locación: {producto.ciudad.nombre + ", " + producto.ciudad.pais}</p>
              </div>
            </div>
            
            <div className="commodity-ranking-description">
              <div className="commodity-rank">
                <p className="txt-1">{qualificationText(7)}</p>
                <div>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                </div>
              </div>
              <span>{7}</span>
            </div>
          </div>
        </div>

        <div className="commodity-gallery" style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
          {width < 768 ? <SwipeGallery imagenes={producto.imagenes}/> : <Gallery imagenes={producto.imagenes}/> }
        </div>

        <div className="commodity-description">
          <h1>{"An intense commitment to your total satisfaction, that's The Mazda Way."}</h1>
          <p>{producto.descripcion}</p>
        </div>
      </div>

      <div className="commodity-features">
        <h1>¿Qué ofrece este lugar?</h1>
        <hr className="commodity-divisor" />
        <div className="features-box">
          {producto.caracteristicas.map(caract => {
            return <><i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong></>
          })}
        </div>
      </div>
      <div className="commodity-available-dates">
        <DatePicker
          //para que aparezca sin necesidad del input
          inline 
          //para poder seleccionar un rango de fechas
          selectsRange={true} 
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
              setDateRange(update);
            }}
          //para que cuando sea menor a 480 se vuelva uno
          monthsShown={width <= 480 ? 1 : 2}
          //para que sea en español
          locale="es"
          //para que no se puedan escojer fechas pasadas a la actual
          minDate={subDays(new Date(), 0)}
          //para que el nombre de los meses quede con mayúscula inicial
          formatWeekDay={day => day.charAt(0).toUpperCase() + day.substring(1,2) }
        >
          <div className="divider"></div>
        </DatePicker>
        <div className="inicar-reserva">
            <p className="texto-iniciar-reserva">Agregá tus fechas de viaje para obetener precios exactos</p>
            <button className="boton-iniciar-reserva">Iniciar reseva</button>
        </div>
      </div>

      <div className="commodity-location">
        <h1>¿Dónde vas a estar?</h1>
        <hr className="commodity-divisor" />
        <h4>{producto.ciudad.nombre}</h4>
        <div className="commodity-location-container">
          <div>
            <LoadScript
              googleMapsApiKey="AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s"
            >
              <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={10}
              />
            </LoadScript>
          </div>
        </div>
      </div>

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
              Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta estadía.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
};
