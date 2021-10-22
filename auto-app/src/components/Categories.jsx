//@ts-nocheck
//Estilos
import '../styles/Categories.css';

//Assets
import autos from '../assets/Autos.jpeg';
import buses from '../assets/Buses.jpeg';
import bicicletas from '../assets/Bicicletas.jpeg';
import motos from '../assets/Motos.jpeg';

const categorias = [
    {
        img: autos,
        titulo: "Autos",
        cantidad: "30 autos",
    },
    {
        img: buses,
        titulo: "Buses",
        cantidad: "10 buses",
    },
    {
        img: motos,
        titulo: "Motos",
        cantidad: "20 motos",
    },
    {
        img: bicicletas,
        titulo: "Bicicletas",
        cantidad: "25 bicicletas",
    },
];

export default function BloqueCategoria() {
    return(
        <div className="category">
            <h2>Buscar por tipo de transporte</h2>
            <div className="type-container">
                {categorias.map( item => 
                    <div className="type-card">
                        <a href="./">
                            <img src={item.img} alt={item.titulo} />
                        </a>
                        <h3>{item.titulo}</h3>
                        <p>{item.cantidad}</p>
                        <br /><br /><br /><br />
                    </div>
                )}
            </div>
        </div>
    );
};
