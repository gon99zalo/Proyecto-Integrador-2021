import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../container/App";

describe("Crear Cuenta", () => {
  test("Redireccionamiento de home a crear cuenta", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    const botonCrear = screen.getByRole("heading", { name: /Crear Cuenta/i });
    expect(window.location.pathname).toBe("/");
    userEvent.click(botonCrear);
    expect(window.location.pathname).toBe("/crearCuenta");
    expect(screen.getByText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Contraseña/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Confirmar contraseña/i)).toBeInTheDocument();
  });
});
