//@ts-nocheck
//Estilos
import '../styles/Categories.css';
import { useEffect, useState } from 'react';

const api = "http://localhost:8080"

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
                {categorias.map( item => 
                    <div className="type-card">
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
