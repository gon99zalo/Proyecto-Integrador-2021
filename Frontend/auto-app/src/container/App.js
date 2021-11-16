//@ts-nocheck
import '../styles/Global.css';
import "../styles/App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import CrearCuenta from "../components/CrearCuenta";
import iniciarSesion from "../components/IniciarSesion";
import Logged from '../components/Logged';
import Producto from '../components/Producto';
import Buscar from '../components/Buscar';
import Reservas from '../components/Reservas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/crearCuenta" component={CrearCuenta} />
          <Route exact path="/iniciarSesion" component={iniciarSesion} />
          <Route exact path="/logueado" component={Logged} />
          <Route exact path="/buscar/:filtro" component={Buscar} />
          <Route exact path="/buscar/:filtro/:condicion" component={(props) => <Buscar timestamp={new Date().toString()} {...props} />} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/:id/reserva" component={Reservas} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
  
export default App;
