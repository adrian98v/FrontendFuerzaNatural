// src/pages/Eventos.jsx
import React from "react";
import "./Eventos.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Contacto from "../components/Contacto.jsx";
import Fondo1 from "../assets/Home_Fondo reducida.jpg";

const Eventos = () => {
  return (
    <div className="App">
      {/* Hero igual que en Home */}
      <div className="fondo eventos-fondo">
        <Header />
        <img src={Fondo1} alt="Fondo Eventos" className="background-image" />

        <div className="content eventos-content">
          <h1>Programemos un Evento Juntos!!!</h1>
          <p>
            Contactate con nosotros para programar actividades, degustaciones y
            más.
          </p>
        </div>
      </div>

      {/* Sección de contacto */}
      <div className="container eventos-contact">
        <Contacto />
      </div>

      <Footer />
    </div>
  );
};

export default Eventos;
