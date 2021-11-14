import React from "react";
import App from "../container/App";
import DatePicker from "react-datepicker";
import Buscador from "../components/Buscador";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import fetchMock from "fetch-mock";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

//Sprint 1

let findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);
const mockSetValue = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockSetValue],
}));

describe("Buscador", () => {
  const history = createMemoryHistory();
  test("Renderiza el texto", () => {
    render(
      <Router history={history}>
        <Buscador />
      </Router>
    );
    expect(
      screen.getByText(/Busca el auto que necesitas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Elije donde quieres retirar el auto/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
  });

  test("Input seleccion ciudad", () => {
    fetchMock.mock("/ciudades/todas", "Buenos Aires");
    const rendered = renderer
      .create(
        <Router history={history}>
          <Buscador />
        </Router>
      )
      .toJSON();
    expect(rendered).toBeTruthy();
    //screen.debug();
  });

  test("Botón de búsqueda", () => {
    const wrapper = shallow(<Buscador />);
    //console.log(wrapper.debug())
    const boton = wrapper.find("Link.boton-buscar");
    expect(boton.exists()).toBe(true);
    //const titulo= wrapper.find('h1.titulo-buscador')
    //console.log("boton", boton.debug());
    //const button = findByTestAttr(wrapper, "boton-buscar");
  });
  // test("Filtrar por ciudad", () => {
  //   const history = createMemoryHistory();
  //   const wrapper = shallow(
  //     <Router history={history}>
  //       {" "}
  //       <Buscador onClick={mockSetValue}/>
  //     </Router>
  //   );
  //   const select = wrapper.find("select");
  //   select.simulate('click', {target: {value:"Bogotá"}});
  //   console.log("select", select.props());
  // });
  test("Renderiza Calendario", () => {
		const wrapper = mount(
			<Buscador>
				<DatePicker />
			</Buscador>
		);
		const calendario = findByTestAttr(wrapper, "react-datepicker");
    console.log('calendario', calendario.debug());
		//expect(calendario).toHaveLength(1);
    
	});
});
