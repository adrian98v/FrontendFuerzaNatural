//  Home.jsx

import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../components/header.jsx"; // Importa el componente Header
import Footer from "../components/footer.jsx";

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

        <div className="content">
          <h1 className="large-title">
            Panaderia Artesanal y Almacen Organico
          </h1>
          <h2 className="small-title">
            Alimentos 100% reales para una alimentacion conciente
          </h2>
          <div className="buttons">
            <a href="/catalogo">
              <button className="catalog-button">Ver Catálogo</button>
            </a>
            <a href="/about">
              <button className="about-button">Más Sobre Nosotros</button>
            </a>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="service-card">
            <img src={Imagen2} alt="Nuestros Productos" />
            <h4>Facturas</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="service-card">
            <img src={Imagen3} alt="Nuestros Procesos" />
            <h4>Los mejores ingredientes</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
      </div>
      <Footer />;
    </div>
  );
}

export default Home;
