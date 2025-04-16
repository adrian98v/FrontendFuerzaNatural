// src/Pages/Eventos.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Contacto from "../components/Contacto.jsx";
import "./Eventos.css";

const Eventos = () => {
  return (
    <div className="eventos-container">
      <Header />
      <section className="eventos-hero">
        <h1>Programemos un Evento Juntos!!!</h1>
        <p>
          Contactate con nosotros para programar actividades, degustaciones y
          más.
        </p>
      </section>

      <div className="container my-5">
        <Contacto />
      </div>
    </div>
  );
};

export default Eventos;
