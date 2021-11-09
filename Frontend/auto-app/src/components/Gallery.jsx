//@ts-nocheck
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
//Estilos
import "../styles/Gallery.css";

const mazdaImages = [
  {
    src: "img/autos/mazda/mazda3-1.jpeg", 
    alt: "mazda3-1",
  },
  {
    src: "img/autos/mazda/mazda3-2.jpeg",
    alt: "mazda3-2",
  },
  {
    src: "img/autos/mazda/mazda3-3.jpeg",
    alt: "mazda3-3",
  },
  {
    src: "img/autos/mazda/mazda3-4.jpeg",
    alt: "mazda3-4",
  },
  {
    src: "img/autos/mazda/mazda3-5.jpeg",
    alt: "mazda3-5",
  },
];

export default function Gallery() {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <div className="gallery-container">
        {mazdaImages.map( (photo, index) => {
          return (
            <div key={`photo-${index}`}>
              <img src={photo.src} alt="" />
            </div>
          );
        })}
        <div className="ver-mas" onClick={() => setToggler(!toggler)}>
          Ver más
        </div>
        <FsLightbox
          toggler={toggler}
          sources={mazdaImages.map( photo => photo.src )}
          type="image"
          customAttributes={mazdaImages.map( photo => {
            return { alt: photo.alt, };
          })}
        />
      </div>
    </>
  );
}
