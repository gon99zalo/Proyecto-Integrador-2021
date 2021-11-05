import React from "react";
import Buscador from "../components/Buscador";
import { unmountComponentAtNode } from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act } from "@testing-library/react";

//Sprint 1
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Buscador, renderizado correcto", () => {
  act(() => {
    render(<Buscador />, container);
  });
  
expect(screen.getByRole('button', {name: /Buscar/})).toBeInTheDocument();
expect(screen.getByRole('button', {name: /Check in - Check out/})).toBeInTheDocument();
expect(screen.getByRole('option', {name: /San Carlos de Bariloche/})).toBeInTheDocument();
expect(screen.getByRole('option', {name: /Buenos Aires/})).toBeInTheDocument();
expect(screen.getByRole('option', {name: /Mendoza/})).toBeInTheDocument();
expect(screen.getByRole('option', {name: /Cordoba/})).toBeInTheDocument();
});