import ImageGallery from "react-image-gallery";
import '../styles/SwipeGallery.css';

//Es necesario tener un key llamado original que le sigue la dirección
const mazdaImages = [
  {
    original: "img/autos/mazda/mazda3-1.jpeg", 
  },
  {
    original: "img/autos/mazda/mazda3-2.jpeg",
  },
  {
    original: "img/autos/mazda/mazda3-3.jpeg",
  },
  {
    original: "img/autos/mazda/mazda3-4.jpeg",
  },
  {
    original: "img/autos/mazda/mazda3-5.jpeg",
  },
];

export default function SwipeGallery(props) {
  
  let images = []
  props.imagenes.map((image) => {})
  
  return (
    <>
      <ImageGallery
        items={images}
        showNav={false}
        showThumbnails={false}
        showPlayButton={false}
        showIndex={true}
        autoPlay={true}
      />
    </>
  );
}
