//@ts-nocheck
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faWifi, faMapMarkerAlt, faStar, faUserAlt, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";


export default function Listado() {
  const wifi = <FontAwesomeIcon icon={faWifi} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const people = <FontAwesomeIcon icon={faUserAlt} />;
  const door = <FontAwesomeIcon icon={faDoorClosed} />;
  const [ moreText, setMoreText ] = useState(false);

  const handlerShowText = () => {
    setMoreText(!moreText);
  };

  return (
    <>
      <div className="listado">
        <h2>Recomendaciones</h2>
        <div className="product-container">
          <div className="product-card">
            <div className="product-image">
              <img className="product" src="img/Mazda.jpeg" alt="mazda" />
              <a href="./">
                <img className="like" src="img/like.png" alt="like" />
              </a>
            </div>
            <div className="product-data">
              <div className="product-star-rating">
                <h4>Autos</h4>
                <div>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                </div>
              </div>
              <h1>Mazda</h1>
              <p className="txt-1 product-location">
                <i>{marker}</i> A 100mt del centro <a href="./"><span>MOSTRAR EN EL MAPA</span></a>
              </p>
              <div className="product-features">
                <i>{people}</i><strong>5</strong>
                <i>{door}</i><strong>4</strong>
              </div>
              
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
              <button className="product-show-more btn-1"><a href="./">Ver más</a></button>
              <div className="qualification">
                <span>10</span>
                <p className="txt-1">Muy bueno</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img className="product" src="img/Mazda.jpeg" alt="mazda" />
              <a href="./">
                <img className="like" src="img/like.png" alt="like" />
              </a>
            </div>
            <div className="product-data">
              <div className="product-star-rating">
                <h4>Autos</h4>
                <div>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                </div>
              </div>
              <h1>Mazda</h1>
              <p className="txt-1 product-location">
                <i>{marker}</i> A 100mt del centro <a href="./"><span>MOSTRAR EN EL MAPA</span></a>
              </p>
              <div className="product-features">
                <i>{people}</i><strong>5</strong>
                <i>{door}</i><strong>4</strong>
              </div>
              
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
              <button className="product-show-more btn-1"><a href="./">Ver más</a></button>
              <div className="qualification">
                <span>10</span>
                <p className="txt-1">Muy bueno</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
