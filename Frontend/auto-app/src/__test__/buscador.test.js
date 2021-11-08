import React from "react";
import Buscador from "../components/Buscador";
import '@testing-library/jest-dom'
//import { unmountComponentAtNode } from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

//Sprint 1
describe('Buscador', () => {
  test('Renderiza el texto', () => {
    render(< Buscador />);
    expect(screen.getByText(/Busca el auto que necesitas/i)).toBeInTheDocument();
    expect(screen.getByText(/Elije donde quieres retirar el auto/i)).toBeInTheDocument();
    expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
  })
});