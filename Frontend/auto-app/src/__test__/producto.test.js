import React from "react";
import { MemoryRouter } from "react-router";
import Producto, { api } from "../components/Producto";
import { render, waitFor } from "@testing-library/react";

const makeRender = (newProps = {}) => {
    const defaultProps = {
      match: { params: { id: "1" } },
    };
    const props = { ...defaultProps, ...newProps };
  return render(
    <MemoryRouter>
      <Producto {...props} />
    </MemoryRouter>
  );
};

describe("Reservas", () => {
    test("Deberia renderizar", () => {
      const { container } = makeRender();
  
      expect(container).toBeDefined();
    });
});