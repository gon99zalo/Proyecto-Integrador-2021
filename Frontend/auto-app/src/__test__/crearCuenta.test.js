import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../container/App";

describe("Crear Cuenta", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
});
  test("Redireccionamiento de home a crear cuenta", () => {
    // const history = createMemoryHistory();
    // render(
    //   <Router history={history}>
    //     <App />
    //   </Router>
    // );
    const botonCrear = screen.getByRole("heading", { name: /Crear Cuenta/i });
    expect(window.location.pathname).toBe("/");
    userEvent.click(botonCrear);
    expect(window.location.pathname).toBe("/crearCuenta");
    expect(screen.getByText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Contraseña/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Confirmar contraseña/i)).toBeInTheDocument();
  });
  test("Form Crear Cuenta", () => {
    const botonCrear = screen.getByRole("heading", {
      name: /Crear Cuenta/i,
    });
    userEvent.click(botonCrear);
    //screen.debug()
    const nombre = screen.getByLabelText(/Nombre/i);
    const apellido = screen.getByLabelText(/Apellido/i);
    const correo = screen.getByLabelText(/Correo electrónico/i);
    const pass = screen.getAllByLabelText(/Contraseña/i);
    //const passConfir = screen.getAllByLabelText(/Contraseña/i);
    userEvent.type(nombre, "jaimito");
    userEvent.type(apellido, "perez")
    userEvent.type(correo, "jaimito@mail.com");
    userEvent.type(pass, "jaimitoelmejor");
    //userEvent.type(passConfir, "jaimitoelmejor");
    expect(nombre.value).toBe("jaimito");
    expect(apellido.value).toBe("perez");
    expect(correo.value).toBe("jaimito@mail.com");
    //expect(pass.value).toBe("jaimitoelmejor");
    //expect(passConfir.value).toBe("jaimitoelmejor");
  });
});
