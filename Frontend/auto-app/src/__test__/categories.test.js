import React from "react";
import Categories from "../components/Categories";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

//Sprint 1

// let findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);
// const mockSetValue = jest.fn();
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: (initialState) => [initialState, mockSetValue],
// }));

describe("Categorias", () => {
  const history = createMemoryHistory();
  test("Renderiza el texto", () => {
    render(
      <Router history={history}>
        <Categories />
      </Router>
    );
    screen.debug();
    //const h2 = screen.getAllByRole('heading');

    //expect(screen.getAllByText(/Buscar por tipo de transporte/i)).toBeInTheDocument();
    //expect(screen.getAllByRole(h2)).toBeInTheDocument();
    //screen.debug();
  });
});
