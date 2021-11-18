import React from "react";

import DatePicker from "react-datepicker";
import Buscador from "../components/Buscador";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import fetchMock from "fetch-mock";
import renderer, { act } from "react-test-renderer";
import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-17-updated'
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
    //screen.debug();
    expect(
      screen.getByText(/Busca el auto que necesitas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('searchbox', /Elige donde quieres retirar el auto/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
  });
  //este si
  test("Input seleccion ciudad", () => {
    fetchMock.mock("/ciudades/todas", "Buenos Aires");
    const rendered = renderer
      .create(
        <Router history={history}>
          <Buscador />
        </Router>
      )
      .toJSON();
      screen.debug(rendered);
    expect(rendered).toBeTruthy();
    screen.debug();
  });

  //este si
  test("Botón de búsqueda", () => {
    const wrapper = shallow(
        <Buscador />
    );
    const boton = wrapper.find("Link.boton-buscar");
    expect(boton.exists()).toBe(true);
    //console.log("boton", boton.debug());
  });
  // test("Renderiza calendario", ()=>{
  //   const wrapper = shallow(
  //     <Router history={history}>
	// 		<Buscador>
  //       <div>
  //       <div>
  //       <DatePicker />
  //       </div>
  //       </div>
  //     </Buscador>
  //     </Router>
	// 	);
  //   console.log(wrapper.debug());
	// 	const calendario = findByTestAttr(wrapper, ".react-datepicker");
	// 	expect(calendario).toHaveLength(1);
  // })
  // test("Filtrar por ciudad", async () => {
  //   shallow(
  //     <Router history={history}>
  //       <Buscador />
  //     </Router>
  //   );
  //   const api = "http://localhost:8080";
  //   function ciudades() {
  //     try {
  //       fetch(api + "/ciudades/todas")
  //         .then((res) => res.json())
  //         .then(
  //           (result) => {
  //             console.log(result);
  //           },
  //           (error) => {
  //             console.log(error);
  //           }
  //         );
  //     } catch (error) {
  //       console.error("algo salio maluco", error);
  //     }
  //   }
  //   ciudades();
    // const history = createMemoryHistory();
    // const wrapper =  mount(
    //   <Router history={history}>
    //     <Buscador />
    //   </Router>
    // );
    // const select = wrapper.find("select");
    // console.log("select", select.debug());
    //select.simulate("click", { target: { value: "Bogotá" } });

    //expect(mockSetValue).toHaveBeenCalled();
    //});
    // test("Renderiza Calendario", () => {
    // 	const wrapper = mount(
    // 		<Buscador>
    // 			<DatePicker />
    // 		</Buscador>
    // 	);
    // 	const calendario = findByTestAttr(wrapper, "react-datepicker");
    //   console.log('calendario', calendario.debug());
    // 	//expect(calendario).toHaveLength(1);
  });

