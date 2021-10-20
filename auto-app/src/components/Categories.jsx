//@ts-nocheck
//Estilos
import '../styles/Categories.css';

//Assets
import prueba from '../assets/Prueba.jpeg';

export default function BloqueCategoria() {
    return(
        <div className="category">
            <h2>Buscar por tipo de transporte</h2>
            <div className="type-container">
                <div className="type-card">
                    <img src={prueba} alt="pochita" />
                    <h3>Carros</h3>
                    <h4>100.000 carros</h4>
                </div>
                <div className="type-card">
                    <img src={prueba} alt="pochita" />
                    <h3>Buses</h3>
                    <h4>20.000 buses</h4>
                </div>
                <div className="type-card">
                    <img src={prueba} alt="pochita" />
                    <h3>Motos</h3>
                    <h4>30.000 motos</h4>
                </div>
                <div className="type-card">
                    <img src={prueba} alt="pochita" />
                    <h3>Bicicletas</h3>
                    <h4>8.000 bicicletas</h4>
                </div>
            </div>
        </div>
    );
};


