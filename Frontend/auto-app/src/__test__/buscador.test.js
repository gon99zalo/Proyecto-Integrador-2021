import React from "react";
import Buscador, { api } from "../components/Buscador";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router";
import { createMemoryHistory } from "history";
import fetchMock from "fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import {act} from 'react-dom/test-utils';
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });
global.fetch = require("jest-fetch-mock");


describe("Buscador", () => {
  // beforeEach(() => {
  // });
  test("Fetch a Api Ciudades", async () => {
      await act(async ()=>{
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
      })
      
  });
  test("Debe contener el texto", async () => {
    await act(async ()=>{
      jest.spyOn(window, "addEventListener");
      const firstResponse = {
        json: jest.fn(() => []),
      };
      global.fetch = jest.fn().mockResolvedValue(firstResponse);
      //console.log(firstResponse)
      render(
        <MemoryRouter>
          <Buscador />
        </MemoryRouter>
      );
      //screen.debug();
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
    //screen.debug();
  });
});

