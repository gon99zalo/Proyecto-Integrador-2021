import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../container/App";

describe("Iniciar Sesión", () => {
  test("Redireccionamiento de home a iniciar sesion", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    const botonIniciar = screen.getByRole("heading", { name: /Iniciar Sesión/i });
    screen.debug(botonIniciar);
    expect(window.location.pathname).toBe("/");
    userEvent.click(botonIniciar);
    expect(window.location.pathname).toBe("/iniciarSesion");
    expect(screen.getByText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Contraseña/i)).toBeInTheDocument();
  });
});