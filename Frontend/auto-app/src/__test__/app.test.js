import React from 'react';
import App from "../container/App";
import { unmountComponentAtNode } from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act } from "@testing-library/react";

//Sprint 1
    let container = null;
    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });
    
    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });
    
    it('App renderizado correcto', () => {
      act(() => {
        render(<App />, container);
      });
      expect(screen.getByText(/busca el auto que necesitas/i)).toBeInTheDocument();
      expect(screen.getByText(/buscar por tipo de transporte/i)).toBeInTheDocument();
      expect(screen.getByText(/recomendaciones/i)).toBeInTheDocument();
      expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
      expect(screen.getByText(/crear cuenta/i)).toBeInTheDocument();
      expect(screen.getByText(/elije donde quieres retirar el auto/i)).toBeInTheDocument();
      expect(screen.getByText(/check in - check out/i)).toBeInTheDocument();
      // expect(screen.getByText(/buscar/i)).toBeInTheDocument();
      // expect(screen.getByText(/autos/i)).toBeInTheDocument();
      // expect(screen.getByText(/buses/i)).toBeInTheDocument();
      // expect(screen.getByText(/motos/i)).toBeInTheDocument();
      // expect(screen.getByText(/bicicletas/i)).toBeInTheDocument();
      // expect(screen.getByText(/clasico/i)).toBeInTheDocument();
      // expect(screen.getByText(/doble/i)).toBeInTheDocument();
      // expect(screen.getByText(/chiva/i)).toBeInTheDocument();
      // expect(screen.getByText(/osorio/i)).toBeInTheDocument();
      
    });
    

    describe("App component", () => {
      test("Debe contener texto en la pagina", () => {
        const texto = "el auto que necesitas";
        const component = render(<App />);
        //=====1a manera de verificar texto:=======
        //component.getByText(textoBuscado);
        //=====2a manera de verificar texto:=======
        //const texto = screen.getByText(textoBuscado);
        //expect(texto).toBeInTheDocument();
        //=====3a manera:==========
         expect(component.container).toHaveTextContent(texto);
      });
      // test('Debe contener boton crear cuenta', ()=>{
      //   const boton = 
      // })

    
});


