
//@ts-nocheck
import '../styles/Global.css';
import Categories from '../components/Categories';
import Buscador from "../components/buscador";
import Header from "../components/header";
import "../styles/App.css";
import { Route, Link, Router, Switch, BrowserRouter } from "react-router-dom";
import Home from "../components/home";
import CrearCuenta from "../components/crearCuenta";
import iniciarSesion from "../components/iniciarSesion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/crearCuenta" component={CrearCuenta} />
          <Route exact path="/iniciarSesion" component={iniciarSesion} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
