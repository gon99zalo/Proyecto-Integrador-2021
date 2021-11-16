//@ts-nocheck
//Estilos
import "../styles/Reservas.css";
//Librerías
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
//Componentes
import Header from "./Header";
import Footer from './Footer';
import Loading from './Loading';

export default function Reservas(props) {
  const [width, setwidth] = useState({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: {
      titulo: "",
    },
    ciudad: {
      nombre: "",
      pais: "",
    },
    imagenes: {
      titulo: "",
      url: "",
    },
  });
  const api = "http://localhost:8080";
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;

  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
      setwidth(window.screen.availWidth);
    }
    window.addEventListener("resize", handleResize);
    
    // Aquí se hardcodeo el ID
    //------------------------------
    fetch(api + "/productos/buscar/9")
      .then((res) => res.json())
      .then(
        (result) => {
          result == null ? console.log(result) : setProducto(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
          setProducto({
            id: 0,
            nombre: "error",
            descripcion: "error",
            categoria: {
              titulo: "error",
            },
            imagenes: {
              titulo: "error",
              url: "error",
            },
            ciudad: {
              nombre: "error",
              pais: "error",
            },
          });
        }
      );
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (error) {
    return (
      <>
        <Header />
        <div>Error: {error.message}</div>;
        <Footer />
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  } else {
      return (
        <>
          <header className="booking-header">
            <div className="booking-header-titles">
              <div>
                <h4>{producto.categoria.titulo}</h4>
                <h1>{producto.nombre}</h1>
              </div>
              <i className="back-arrow">
                <a href="/">{backArrow}</a>
              </i>
            </div>
          </header>

          <main></main>

          <footer></footer>
        </>
      );
  };
};
