//@ts-nocheck
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faWifi, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";


export default function Listado() {
  const wifi = <FontAwesomeIcon icon={faWifi} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const [ moreText, setMoreText ] = useState(false);

  const handlerShowText = () => {
    setMoreText(!moreText);
  };


  return (
    <>
      <div className="listado">
        <div className="product-card">
          <div className="product-image">
            <img className="product" src="img/Mazda.jpeg" alt="mazda" />
            <a href="./">
              <img className="like" src="img/like.png" alt="like" />
            </a>
          </div>
          <div className="product-data">
            <h4>Autos</h4> {/*con un after poner estrellitas*/}
            <h1>Mazda</h1>
            <p className="txt-1 product-location">
              <i>{marker}</i>  A 100mt del centro <a href="./"><span>MOSTRAR EN EL MAPA</span></a>
            </p>
            <i>{wifi}</i>
            <p className="txt-1 product-description">
              Lorem ipsum dolor sit amet 
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
            <button className="product-show-more btn-1">Ver más</button>
            <div className="qualification">
              <span>10</span>
              <p className="txt-1">Muy bueno</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
