//@ts-nocheck
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt, faStar, faUserAlt, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import productList from "../json/Listado.json";
import "../styles/Listado.css";

export default function Listado() {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const people = <FontAwesomeIcon icon={faUserAlt} />;
  const door = <FontAwesomeIcon icon={faDoorClosed} />;
  const categoria = "Motos";
  const [ moreText, setMoreText ] = useState(false);

  const handlerShowText = () => {
    setMoreText(!moreText);
  };

  const withDoors = (doors) => {
    if(categoria === "Motos" || categoria === "Bicicletas") {
      return "";
    } else {
      return ((<><i>{door}</i><strong>{doors}</strong></>));
    };
  };

  return (
    <>
      <div className="listado">
        <h2>Recomendaciones</h2>
        <div className="product-container">

          {productList[categoria].map(item => {
            return (
              <>
                <div className="product-card">
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
                    
                    <p className="txt-1 product-description">
                      {item.description}
                        <span className={moreText ? "": "hide-text"}>, 
                          consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                          Omnis natus commodi, accusamus consequatur officiis sint reprehenderit. 
                          Temporibus accusamus eveniet officiis, impedit aspernatur laboriosam 
                          possimus iste placeat reiciendis in repellat eaque. 
                        </span> 
                        <span className="show-text" onClick={handlerShowText}> 
                          {moreText ? " menos..." : " más..."} 
                        </span>
                    </p>
                    <button className="product-show-more btn-1"><a href="./">Ver más</a></button>
                    <div className="qualification">
                      <span>{item.qualification}</span>
                      <p className="txt-1">Muy bueno</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

        </div>
      </div>
    </>
  );
}
