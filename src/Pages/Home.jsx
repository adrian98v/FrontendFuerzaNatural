import './home.css';
import Fondo from "../assets/Home_Fondo.jpg";
import Header from "../components/header.jsx";


function Home() {
    return (
      <div className="App">
        <div className="fondo">
        <Header />
          <img src={Fondo} alt="Fondo" className="background-image" />
          <div className="content">
            <h1 className="small-title">PANIFICADOS DELICIOSOS</h1>
            <h2 className="large-title">El rey de los desayunos y merienda</h2>
            <div className="buttons">
              <button className="catalog-button">Ver Catálogo</button>
              <button className="about-button">Más Sobre Nosotros</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Home