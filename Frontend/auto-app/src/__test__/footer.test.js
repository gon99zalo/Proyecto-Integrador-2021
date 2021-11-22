import React from "react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


describe("Footer", () => {
	it("Debe renderizar el texto", async () => {
		const component = render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);
        expect(component.container).toHaveTextContent(/©2021 Digital Cars/i);
	});
    
});