import React from "react";
import Buscador, { api } from "../components/Buscador";
import "@testing-library/jest-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import renderer, { act } from "react-test-renderer";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });
// global.fetch = require("jest-fetch-mock");


describe("Buscador", () => {

  test("Fetch a Api Ciudades", async () => {
    jest.spyOn(window, "addEventListener");
    const firstResponse = {
      json: jest.fn(() => []),
    };
    global.fetch = jest.fn().mockResolvedValue(firstResponse);

    render(
      <MemoryRouter>
        <Buscador />
      </MemoryRouter>
    );

    expect(window.addEventListener).toBeCalledWith(
      "resize",
      expect.any(Function)
    );
    expect(global.fetch).toBeCalledWith(api + "/ciudades/todas");
    await waitFor(() => {
      expect(firstResponse.json).toBeCalledWith();
    });
  });

  test("Debe contener el texto", async() => {
      jest.spyOn(window, "addEventListener");
      const firstResponse = {
        json: jest.fn(() => []),
      };
      global.fetch = jest.fn().mockResolvedValue(firstResponse);


        render(
          <MemoryRouter>
          <Buscador />
        </MemoryRouter>
      );

    await waitFor(() => {  
      expect(
        screen.getByText(/Busca el auto que necesitas/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Elige donde quieres retirar el auto/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
      expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
    });
    })
    
  //   test("Botón de búsqueda", async () => {
  //     jest.spyOn(window, "addEventListener");
  //     const firstResponse = {
  //       json: jest.fn(() => []),
  //     };
  //     global.fetch = jest.fn().mockResolvedValue(firstResponse);

  //     render(
  //       <MemoryRouter>
  //         <Buscador />
  //       </MemoryRouter>
  //     );
  //   const boton = wrapper.find("Link.boton-buscar");
  //   expect(boton.exists()).toBe(true);
  //   //console.log(wrapper.debug());
  // });
  test("Input seleccion ciudad", () => {
    fetchMock.mock("/ciudades/todas", "Buenos Aires");
    const history = createMemoryHistory();
    const rendered = renderer
      .create(
        <Router history={history}>
          <Buscador />
        </Router>
      )
      .toJSON();
    expect(rendered).toBeTruthy();
  });

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

    // let originalFetch;

    // beforeEach(() => {
    //     originalFetch = global.fetch;
    //     global.fetch = jest.fn(() => Promise.resolve({
    //         json: () => Promise.resolve({
    //             value: "Buenos Aires"
    //         })
    //     }));
    // });

    // afterEach(() => {
    //     global.fetch = originalFetch;
    // });
  // test("Test selector ciudades", async() => {
  //   global.fetch = jest.fn().mockImplementation(() => {
  //     return new Promise((resolve) =>
  //         resolve({
  //             json: () => {
  //                 return { data: "Buenos Aires"};
  //             }
  //         })
  //     );})
  //   render(<BrowserRouter>
  //     <Buscador />
  //     </BrowserRouter>);
  //   expect(screen.getByText("Elige donde quieres retirar el auto")).toBeInTheDocument();
  //   // highlight-start
  //   fireEvent.change(screen.getByTestId("select"), {
  //     target: { value: "Buenos Aires" },
  //   });
  //   // highlight-end
  //   expect(screen.getByText("Buenos Aires")).toBeInTheDocument();
  // });
  });