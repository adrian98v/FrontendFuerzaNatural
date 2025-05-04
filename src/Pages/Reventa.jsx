// src/pages/Reventa.jsx
import React from "react";
import "./reventa.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Contacto from "../components/Contacto-reventa.jsx";
import Fondo1 from "../assets/fondo-reventa.jpg";

const Reventa = () => {
  return (
    <div className="App">
      {/* Hero igual que en Home */}
      <div className="fondo reventa-fondo">
        <Header />
        <img src={Fondo1} alt="Fondo Eventos" className="background-image" />

        <div className="content reventa-content">
          <h1>Queres re-vender nuestros productos??</h1>
          <p>
            Queremos asesorarte de la mejor manera para comercializar nuestros
            productos!!!!!
          </p>
        </div>
      </div>

      {/* Sección de contacto */}
      <div className="container reventa-contact">
        <Contacto />
      </div>

      <Footer />
    </div>
  );
};

export default Reventa;
