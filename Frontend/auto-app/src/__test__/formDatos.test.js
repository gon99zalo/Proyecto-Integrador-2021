import React from "react";
import FormDatos from "../components/FormDatos";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Footer", () => {
	it("Debe renderizar el texto", async () => {
		const component = render(
			<BrowserRouter>
				<FormDatos />
			</BrowserRouter>
		);
        //screen.debug()
        expect(component.container).toHaveTextContent(/Nombre/i);
        expect(component.container).toHaveTextContent(/Apellido/i);
        expect(component.container).toHaveTextContent(/Email/i);
        expect(component.container).toHaveTextContent(/Ciudad/i);
	});
    
});