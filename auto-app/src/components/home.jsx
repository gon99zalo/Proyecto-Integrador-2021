import Buscador from "./buscador";
import Footer from "./footer";
import Header from "./header";
import Categories from '../components/Categories';
import Listado from '../components/Listado';

export default function Home() {
  return (
    <>
      <Header />
      <Buscador />
      <Categories />
      <Listado />
      <Footer />
    </>
  );
}
