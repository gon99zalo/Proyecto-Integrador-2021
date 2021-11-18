import React from "react";
import Categories from "../components/Categories";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
//import BloqueCategoria from "../components/Categories";
Enzyme.configure({ adapter: new Adapter() });

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
    expect(screen.getByText(/Buscar por tipo de transporte/i)).toBeInTheDocument();
    screen.debug();
    //const h2 = screen.getAllByRole('heading');

    
    //expect(screen.getAllByRole(h2)).toBeInTheDocument();
    //screen.debug();
  });
});
//const wrapper = shallow(<Categories />);
//console.log(wrapper.html());
//console.log(wrapper.debug());

// describe("Categoriass", () => {
//   const history = createMemoryHistory();
//   test("Renderiza un solo h2", () => {
//     render(
//       <Router history={history}>
//         <Categories />
//       </Router>
//     );
//     expect(wrapper.find("h2")).toHaveLength(1);
//   });
// });
