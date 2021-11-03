import App from "../container/App";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

describe("App component", () => {
	test("debe encontrar texto en la pÃ¡gina", () => {
		const textoBuscado = "auto";
		const component = render(<App />);
		//console.log(component);
		//=====1a maneira de verificar texto:=======
		//component.getByText(textoBuscado);
		//=====2a maneira de verificar texto:=======
		//const texto = screen.getByText(textoBuscado);
		//expect(texto).toBeInTheDocument();
		//=====3a maneira:==========
		expect(component.container).toHaveTextContent(textoBuscado);
	});
});