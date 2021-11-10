// import React from "react";
// import Buscador from "../components/Buscador";
// import "@testing-library/jest-dom";
// //import Fetch from "../components/Fetch";
// //import { unmountComponentAtNode } from "react-dom";
// import { Router } from "react-router-dom";
// import { MemoryRouter } from "react-router";
// import "@testing-library/jest-dom/extend-expect";
// import { render, screen, fireEvent } from "@testing-library/react";
// import fetchMock from "fetch-mock";
// import renderer from "react-test-renderer";
// import { createMemoryHistory } from "history";


// //Sprint 1

// describe("Buscador", () => {
//   const history = createMemoryHistory();
//   test("Renderiza el texto", () => {
    
//      render(
//        <Router history={history}>
//         <Buscador />
//       </Router>
//     );
//     expect(
//       screen.getByText(/Busca el auto que necesitas/i)
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(/Elije donde quieres retirar el auto/i)
//     ).toBeInTheDocument();
//     expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
//   });

//   test("Input seleccion ciudad",() => {
//     fetchMock.mock("/ciudades/todas", "Buenos Aires");
//     const rendered = renderer
//       .create(
//         <Router history={history}>
//           <Buscador />
//         </Router>
//       )
//       .toJSON();
//     expect(rendered).toBeTruthy();
//   });
// });
