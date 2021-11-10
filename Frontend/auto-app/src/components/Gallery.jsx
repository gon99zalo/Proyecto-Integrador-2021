//@ts-nocheck
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
//Estilos
import "../styles/Gallery.css";


export default function Gallery(props) {
  const [toggler, setToggler] = useState(false);
  let images = props.imagenes

  return (
    <>
      <div className="gallery-container">
        {images.map( (photo, index) => {
          return (
            <div key={`photo-${index}`}>
              <img src={photo.url} alt={photo.titulo} />
            </div>
          );
        })}
        <div className="ver-mas" onClick={() => setToggler(!toggler)}>
          Ver más
        </div>
        <FsLightbox
          toggler={toggler}
          sources={images.map( photo => photo.url)}
          type="image"
          customAttributes={images.map( photo => {
            return { alt: photo.titulo, };
          })}
        />
      </div>
    </>
  );
}
