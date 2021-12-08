import React from 'react';
import ReactDOM from 'react-dom';
import App from '../container/App';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

describe('Index', () => {
    test('Debe renderizar App', () => {
        const component = render(
            <App />
        )
        expect(component.container).toBeDefined();
        //screen.debug()
    })
    test('Debe contener', () => {
        const texto1 = /Busca el auto que necesitas/i;
        const texto2 = /Elige donde quieres retirar el auto/i;
        const texto3 = /Check in - Check out/i;
        const texto4 = /Buscar/i;
        const texto5 = /Loading/i;
        const texto6 = /©2021 Digital Cars/i;

        const component = render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
            
        )
        expect(component.container).toHaveTextContent(texto1);
        expect(component.container).toHaveTextContent(texto2);
        expect(component.container).toHaveTextContent(texto3);
        expect(component.container).toHaveTextContent(texto4);
        expect(component.container).toHaveTextContent(texto5);
        expect(component.container).toHaveTextContent(texto6);
    })
})