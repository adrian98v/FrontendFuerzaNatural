// src/pages/About.jsx
import React from "react";
import { FaCheck, FaThumbsUp, FaUtensils } from "react-icons/fa";
import "./about.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Fondo1 from "../assets/About-fondo.jpg";

const About = () => {
  return (
    <div className="App">
      {/* Hero reutilizando .fondo */}
      <div className="fondo about-fondo">
        <Header />
        <img src={Fondo1} alt="Fondo About" className="background-image" />

        {/* Nuevo wrapper para el título */}
        <div className="about-hero-content">
          <div className="about-hero-title">
            <hr />
            <h1>Conocenos</h1>
            <hr />
          </div>
          <h2 className="about-hero-subtitle">Conocenos un poco más .......</h2>
        </div>
      </div>
      {/* ————— Overview Section ————— */}
      <div className="overview-section">
        <div className="overview-header">
          <h2>Un poco acerca de nosotros</h2>
          <hr />
          <p>
            Sabemos que cuando combinamos gente increíble, comida excelente y un
            ambiente genial, tenemos la receta del éxito. ¡Únete a nuestro
            equipo y descubre por qué nos llaman la mejor panadería!
          </p>
        </div>

        <div className="overview-items">
          <div className="overview-item">
            <div className="icon-wrapper">
              <FaCheck />
            </div>
            <h3>Nuestra Mision</h3>
            <p>
              Utilizamos únicamente ingredientes de la mejor calidad que aportan
              a tu cuerpo fibra y nutrientes importantes.
            </p>
          </div>

          <div className="overview-item">
            <div className="icon-wrapper">
              <FaThumbsUp />
            </div>
            <h3>Nuestros Valores</h3>
            <p>
              Nos esforzamos por cuidar de usted y del medio ambiente en el que
              vivimos. Todas nuestras elaboraciones se consideran recomendables para
              una vida saludable.
            </p>
          </div>

          <div className="overview-item">
            <div className="icon-wrapper">
              <FaUtensils />
            </div>
            <h3>Servicio de Panaderia Catering</h3>
            <p>
              Realizamos arreglos para eventos añadiendo estilo y sabor a
              cualquier evento y están preparadas con la máxima atención al
              detalle.
            </p>
          </div>
        </div>
      </div>
      {/* ———————————————————————————— */}
      <Footer />
    </div>
  );
};

export default About;
