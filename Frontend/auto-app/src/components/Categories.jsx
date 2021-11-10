//@ts-nocheck
//Estilos
import '../styles/Categories.css';
import { useEffect, useState } from 'react';

const api01 = "http://localhost:8080"
const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"


export default function BloqueCategoria() {
    
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(api + "/categorias/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategorias(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return(
        <div className="category">
            <h2>Buscar por tipo de transporte</h2>
            <div className="type-container">
                {categorias.map( (item, i) => 
                    <div className="type-card" key={i}>
                        <a href="./">
                            <img src={item.url} alt={item.titulo} />
                        </a>
                        <h3>{item.titulo}</h3>
                        <p>{item.descripcion}</p>
                    </div>
                )}
            </div>
        </div>
    );
}};
