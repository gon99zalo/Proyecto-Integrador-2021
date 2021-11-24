//@ts-nocheck
// Librerías
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// Estilo CSS
import "../styles/producto.css";
import "../styles/CalendarProducto.css";
// Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faStar, faMapMarkerAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
import Politicas from "./Politicas";
import Footer from './Footer';
import Loading from './Loading';
import { Link } from 'react-router-dom';

Geocode.setApiKey("AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s");

export default function Producto(props) {
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  registerLocale("es", es);
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
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
    imagenes: [],
    caracteristicas: []
  });

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

  const calendarHeaderProducto = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-producto">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"navigation-arrows-producto back-arrow-producto"}
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            {<i>{backArrow}</i>}
          </button>

          {/* LOS MESES MOSTRADOS EN EL HEADER */}
          <span className="react-datepicker__current-month">
            {monthDate
              .toLocaleString("es-CO", {
                month: "long",
              })
              .charAt(0)
              .toUpperCase() +
              monthDate
                .toLocaleString("es-CO", {
                  month: "long",
                })
                .slice(1)}
          </span>

          {/* BOTÓN PARA AUMENTAR MES */}
          <button
            aria-label="Next Month"
            className={"navigation-arrows-producto next-arrow-producto"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
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
          result == null ? setError({message : "Este producto no existe"}) : setProducto(result);
          Geocode.fromAddress(producto.ciudad.nombre + ", " + producto.ciudad.pais).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setCenter({
                lat: lat,
                lng: lng
              });
            },
            (error) => {
              console.error(error);
            }
          );
          setIsLoaded(true)
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
  }, [props.match.params.id, producto.ciudad.nombre, producto.ciudad.pais]);
  if (error) {
    return (
    <>
    <Header />
    <div>Error: {error.message}</div>
    <Footer />
    </>
    )
  } else if (!isLoaded) {
    return (
      <>
      <Header />
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
            <i className="back-arrow"><a href="/">{backArrow}</a></i>
            
          </div>

          <div className="commodity-location-ranking">
            <div className="commodity-location-description">
              <i>{marker}</i>
              <div className="texto-locacion">
                <p> {producto.ciudad.nombre + ", " + producto.ciudad.pais}</p>
                <p> A 100mt del Barrio Los Rosales</p>
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
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
        </div>
      </div>

      <div className="commodity-features">
        <h1>¿Qué ofrece este vehículo?</h1>
        <hr className="commodity-divisor" />
        <div className="features-box">
          {producto.caracteristicas.map(caract => {
            return <div><i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong></div>
          })}
        </div>
      </div>
      <div className="commodity-available-dates">
        <div className="commodity-calendar">
          <DatePicker
            disabledKeyboardNavigation
            renderCustomHeader={calendarHeaderProducto}
            //para que aparezca sin necesidad del input
            inline 
            //para poder seleccionar un rango de fechas
            selected={false}
            // selectsRange={false} 
            // startDate={false}
            // endDate={endDate}
            // onChange={null}
            //para que cuando sea menor a 480 se vuelva uno
            monthsShown={width <= 480 ? 1 : 2}
            //para que sea en español
            locale="es"
            //para que no se puedan escojer fechas pasadas a la actual
            minDate={subDays(new Date(), 0)}
            //para que el nombre de los meses quede con mayúscula inicial
            formatWeekDay={day => day.charAt(0).toUpperCase() + day.substring(1,2) }
            showPopperArrow={false}
            
          >
            <div className="divider-producto"></div>
          </DatePicker>
        </div>
        <div className="inicar-reserva">
            <p className="texto-iniciar-reserva">Agregá tus fechas de viaje para obtener precios exactos</p>
            <Link to={sessionStorage.getItem("infoUsuario")!= null ? "/productos/" + props.match.params.id + "/reserva" : "/iniciarSesion?reserva=" + props.match.params.id} className="boton-iniciar-reserva">Iniciar reserva</Link>
        </div>
      </div>

      <div className="commodity-location">
        <h1>¿Dónde lo encontrás?</h1>
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
      <Politicas />
      <Footer />
    </>
  );
};
};
