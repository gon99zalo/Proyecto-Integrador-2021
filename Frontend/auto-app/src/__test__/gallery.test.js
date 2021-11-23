import React from "react";
import "@testing-library/jest-dom";
import Gallery from "../components/Gallery";
import { render, screen } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
import FsLightbox from "fslightbox-react";

Enzyme.configure({ adapter: new Adapter() });

let findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("<Gallery/>", () => {
  test("Debe renderizar", () => {
    const wrapper = shallow(<Gallery imagenes={[]} />);
    expect(wrapper.find("div").first().hasClass("gallery-container")).toBe(
      true
    );
    expect(wrapper.find(FsLightbox)).toBeDefined();
  });
  test('Renderiza div con el texto "Ver más"', () => {
    const wrapper = shallow(<Gallery imagenes={[]} />);
    expect(wrapper.find("div").first().text()).toEqual("Ver más<l />");
  });
});
