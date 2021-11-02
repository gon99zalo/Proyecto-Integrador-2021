import Buscador from "./Buscador";
import Footer from "./Footer";
import Header from "./Header";
import Categories from './Categories';
import Listado from './Listado';
import Producto from './Producto';

export default function Home() {
  return (
    <>
      <Header />
      {/* <Buscador />
      <Categories />
      <Listado /> */}
      <Producto />
      <Footer />
    </>
  );
};
