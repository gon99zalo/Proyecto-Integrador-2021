//@ts-nocheck
import '../styles/Global.css';
import "../styles/App.css";
import { Route, Link, Router, Switch, BrowserRouter } from "react-router-dom";
import Home from "../components/home";
import CrearCuenta from "../components/crearCuenta";
import iniciarSesion from "../components/iniciarSesion";
import Logged from '../components/logged';
import OpcionesLog from '../components/OpcionesLog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/crearCuenta" component={CrearCuenta} />
          <Route exact path="/iniciarSesion" component={iniciarSesion} />
          <Route exact path="/logueado" component={Logged} />
          <Route exact path="/opcionesLog" component={OpcionesLog} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
