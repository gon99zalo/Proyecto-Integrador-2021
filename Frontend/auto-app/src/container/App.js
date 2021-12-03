//@ts-nocheck
import '../styles/Global.css';
import "../styles/App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import CrearCuenta from "../components/CrearCuenta";
import iniciarSesion from "../components/IniciarSesion";
import Producto from '../components/Producto';
import Buscar from '../components/Buscar';
import Reservas from '../components/Reservas';
import PantallaExito from '../components/PantallaExito';
import CreacionProducto from '../components/CreacionProducto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/crearCuenta" component={CrearCuenta} />
          <Route path="/iniciarSesion" component={iniciarSesion} />
          <Route path="/buscar" component={Buscar} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route path="/productos/:id/reserva" component={Reservas} />
          <Route path="/exito" component={PantallaExito} />
          <Route path="/administracion" component={CreacionProducto} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
  
export default App;
