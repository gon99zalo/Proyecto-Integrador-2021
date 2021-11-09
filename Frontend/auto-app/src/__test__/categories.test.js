import React from "react";
import Categories from "../components/Categories";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";
//import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";

//Sprint 1

describe('Categorias', () => {
  test('Renderiza el texto', () => {
    render(< Categories />);
    //const h1 = screen.getByRole('heading');
    
    //expect(screen.getAllByText(/Buscar por tipo de transporte/i)).toBeInTheDocument();
    //expect(screen.getByRole(h1)).toBeInTheDocument();
    //screen.debug(h1);
  })
});