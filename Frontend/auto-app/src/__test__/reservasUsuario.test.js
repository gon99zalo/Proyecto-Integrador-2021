//@ts-nocheck
import ReservaUsuario from '../components/ReservasUsuario';
import useFetchReservasUsuario from '../hooks/useFetchReservasUsuario';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("../hooks/useFetchReservasUsuario");

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

describe("Testeando Creacion producto", () => {

  beforeEach( () => {
    window.sessionStorage.clear();
    jest.clearAllMocks();

    window.sessionStorage.setItem(
      "infoUsuario",
      JSON.stringify({
        nombre: "Jo",
        apellido: "Gonz",
        email: "jo@gonz.com",
        rol: 2, //1 o 2
        token: "T0k3n",
      })
    );
  });

  test("Renderiza componente sin haber hecho reserva", () => {

    useFetchReservasUsuario.mockReturnValue({
      data: [],
      loading: true,
      tieneError: false,
    });

    const wrapper = shallow(
      <ReservaUsuario />
    );
    
    // Comprueba que se haya renderizado el resultado cuando no hay reservas hechas
    const tituloSinReserva = wrapper.find('.reserva-container h1');
    expect( tituloSinReserva.text() ).toBe("No hiciste ninguna reserva todavia");
  });

  test('Renderiza componente con reservas', () => {
    const reservasMockeadas = [
      {
        fechaFinal: "25/02/2022",
        fechaInicial: "26/02/2022",
        hora: "10:00 AM",
        producto: {
          caracteristicas: [
            {
              icono: "fa-users",
              nombre: "4",
            },
            {
              icono: "fa-car-side",
              nombre: "Vehiculo",
            },
          ],
          categoria: {
            titulo: "Autos",
          },
          ciudad: {
            nombre: "San Juan de Pasto",
            pais: "Colombia",
          },
          id: 4,
          imagenes: [
            {
              url: "https://honda.com/carrito.jpg",
              titulo: "Honda",
            }
          ],
          nombre: "Honda Rojo",
        },
      },
    ];
    
    useFetchReservasUsuario.mockReturnValue({
      data: reservasMockeadas,
      loading: true,
      tieneError: false,
    });

    const wrapper = shallow(
      <ReservaUsuario />
    );
    
    // Comprueba que la existencia de la card 
    const productCard = wrapper.find('div.product-card');
    expect( productCard ).toBeTruthy();

    // Comprobando la existencia de algunas características
    const imagenDelProducto = productCard.find('img.product');
    const nombreCategoria = productCard.find('div.product-star-rating h4');
    const nombreProducto = productCard.find('div.product-data h1');
    const lugarProducto = productCard.find('p.product-location').props().children[2];

    expect( imagenDelProducto.props().src ).toBe("https://honda.com/carrito.jpg");
    expect( imagenDelProducto.props().alt ).toBe("Honda");
    expect( nombreCategoria.text() ).toBe("Autos");
    expect( nombreProducto.text() ).toBe("Honda Rojo");
    expect( lugarProducto ).toBe("San Juan de Pasto, Colombia");
  });

  test('Renderiza más de una reserva', () => {
    const reservasMockeadas = [
      {
        fechaFinal: "25/02/2022",
        fechaInicial: "26/02/2022",
        hora: "10:00 AM",
        producto: {
          caracteristicas: [
            {
              icono: "fa-users",
              nombre: "4",
            },
            {
              icono: "fa-car-side",
              nombre: "Vehiculo",
            },
          ],
          categoria: {
            titulo: "Autos",
          },
          ciudad: {
            nombre: "San Juan de Pasto",
            pais: "Colombia",
          },
          id: 4,
          imagenes: [
            {
              url: "https://honda.com/carrito.jpg",
              titulo: "Honda",
            }
          ],
          nombre: "Honda Rojo",
        },
      },
      {
        fechaFinal: "27/02/2022",
        fechaInicial: "29/02/2022",
        hora: "12:00 AM",
        producto: {
          caracteristicas: [
            {
              icono: "fa-users",
              nombre: "4",
            },
            {
              icono: "fa-car-side",
              nombre: "Vehiculo",
            },
          ],
          categoria: {
            titulo: "Motos",
          },
          ciudad: {
            nombre: "Buenos Aires",
            pais: "Argentina",
          },
          id: 15,
          imagenes: [
            {
              url: "https://moto.com/motito.jpg",
              titulo: "Suzuki",
            }
          ],
          nombre: "Suzuki ninja",
        },
      },
    ];
    
    useFetchReservasUsuario.mockReturnValue({
      data: reservasMockeadas,
      loading: true,
      tieneError: false,
    });

    const wrapper = shallow(
      <ReservaUsuario />
    );

    // Comprueba que existen 2 cards
    const productCard = wrapper.find('div.product-card');
    expect( productCard.length ).toBe(2);

  });
  test('Renderiza error', () => {
    useFetchReservasUsuario.mockReturnValue({
      data: {
        message: "Este es un error",
      },
      loading: true,
      tieneError: true,
    });

    const wrapper = shallow(
      <ReservaUsuario />
    );

    // Comprueba que se renderizo el mensaje de error
    const divConMensajeDeError = wrapper.find('div').at(4);
    expect( divConMensajeDeError.text() ).toBe("Error: Este es un error");
  });
});
