//@ts-nocheck
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt, faStar, faUserAlt, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import productList from "../json/Listado.json";
import "../styles/Listado.css";

export default function Listado() {
  const categoria = "Buses";
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const people = <FontAwesomeIcon icon={faUserAlt} />;
  const door = <FontAwesomeIcon icon={faDoorClosed} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});

  const handlerShowText = (title) => {
    setShowText({
      show: !showText.show,
      idText: title
    });
  };

  const withDoors = (doors) => {
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

  return (
    <>
      <div className="listado">
        <h2>Recomendaciones</h2>
        <div className="product-container">

          {productList[categoria].map( (item, i) => {
            return (
                <div className="product-card" key={i}>
                  <div className="product-image">
                    <img className="product" src={item.img} alt={item.altImg} />
                    <a href="./">
                      <img className="like" src="img/like.png" alt="like" />
                    </a>
                  </div>
                  <div className="product-data">
                    <div className="product-star-rating">
                      <h4>{item.category}</h4>
                      <div>
                        <i>{star}</i>
                        <i>{star}</i>
                        <i>{star}</i>
                        <i>{star}</i>
                      </div>
                    </div>
                    <h1>{item.title}</h1>
                    <p className="txt-1 product-location">
                      <i>{marker}</i> A 100mt de {item.location} <a href="./"><span>MOSTRAR EN EL MAPA</span></a>
                    </p>
                    <div className="product-features">
                      <i>{people}</i><strong>{item.people}</strong>
                      {withDoors(item.doors)}
                    </div>
                    <div className="txt-1 product-description">
                      <p key={`p-${i}`}>
                        {showText.show && showText.idText === item.title ? item.description : item.description.substring(0, 20)+"..."}
                        <span key={`s-${i}`} className="show-text" onClick={() => handlerShowText(item.title)}> 
                          {showText.show && showText.idText === item.title ? " menos" : " más"}
                        </span>
                      </p>
                    </div>
                    <button className="product-show-more btn-1"><a href="./">Ver Detalle</a></button>
                    <div className="qualification">
                      <span>{item.qualification}</span>
                      <p className="txt-1">{qualificationText(item.qualification)}</p>
                    </div>
                  </div>
                </div>
            );
          })}

        </div>
      </div>
    </>
  );
}
