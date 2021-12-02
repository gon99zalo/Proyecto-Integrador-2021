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
          <Route exact path="/crearCuenta" component={CrearCuenta} />
          <Route exact path="/iniciarSesion" component={iniciarSesion} />
          <Route exact path="/buscar" component={Buscar} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/:id/reserva" component={Reservas} />
          <Route exact path="/exito" component={PantallaExito} />
          <Route exact path="/administracion" component={CreacionProducto} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
  
export default App;
