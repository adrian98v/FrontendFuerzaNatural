//  Home.jsx

import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../components/header.jsx"; // Importa el componente Header
import Footer from "../components/footer.jsx";
import { Link } from "react-router-dom";
import Fondo1 from "../assets/FONDO-PRUEBA-HOME.jpeg";
import Imagen1 from "../assets/MASA_CRUDA.jpg";
import Imagen2 from "../assets/MEDIALUNA_MITAD.jpg";
import Imagen3 from "../assets/PUBLI.jpg";

function Home() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [Imagen1, Imagen2, Imagen3];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="App">
      <div className="fondo">
        <Header />

        <img src={Fondo1} alt="Fondo" className="background-image" />

        {/* —— SVG Wave dentro de .fondo —— */}
        <div className="wave-container">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 C360,180 720,-40 1440,40 L1440,100 L0,100 Z"
              fill="#b28e6d"
            />
          </svg>
        </div>
        {/* ————————————— */}

        <div className="content_div">
          <h1 className="large-title">
            Panaderia Artesanal y Almacen Orgánico
          </h1>
          <h2 className="small-title">
            Alimentos 100% reales para una alimentación conciente
          </h2>
          <div className="buttons">
            <Link to="/catalogo">
              <button className="catalog-button">Ver Catálogo</button>
            </Link>
            <Link to="/about">
              <button className="about-button">Más Sobre Nosotros</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Sección de servicios en 3 columnas */}
      <div className="services-section">
        {/* Header centrado */}
        <div className="services-header">
          <h2>Algunas de nuestras creaciones estrellas</h2>
          <hr />
        </div>

        {/* 3 columnas */}
        <div className="services-container">
          {/* Tarjeta 1 */}
          <div className="service-card">
            <img src={Imagen1} alt="Nuestra Materia Prima" />
            <h4>Pan de Campo </h4>
            <p>
              Elaborado con masa madre propia y harinas orgánicas libres de
              pesticidas, nuestro pan de campo ofrece una miga esponjosa y
              corteza crujiente. Cada hogaza conserva intactos los nutrientes
              del cereal gracias a nuestra molienda artesanal, garantizando una
              experiencia saludable y auténtica.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="service-card">
            <img src={Imagen2} alt="Nuestros Productos" />
            <h4>Facturas</h4>
            <p>
              Nuestras facturas se hornean con manteca de primera calidad y
              azúcares naturales, sin recurrir a aditivos ni conservantes. El
              resultado es un bocado suave y delicado que respeta la tradición
              panadera y cuida tu salud.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="service-card">
            <img src={Imagen3} alt="Nuestros Procesos" />
            <h4>Los mejores ingredientes</h4>
            <p>
              Seleccionamos granos y semillas de cultivo responsable, molidos de
              forma artesanal para preservar sus propiedades. De esta manera,
              cada creación refleja nuestro compromiso con la sostenibilidad, el
              sabor y tu bienestar.
            </p>
          </div>
        </div>
      </div>
      <Footer />;
    </div>
  );
}

export default Home;
