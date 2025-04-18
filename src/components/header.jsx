import React from "react";
import "./header.css";
import logo from "../assets/Logo_SinFondo_MásChico.png";

const Header = () => {
  return (
    <>
      <div className="topbar">
        <p>
          ¡Registrate y obtené un 20% de descuento en tu primera compra!!!{" "}
          <a href="/login">Registrate ahora</a>
        </p>
      </div>
      <header>
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <nav>
          <a href="/">Inicio</a>
          <a href="/catalogo">Tienda</a>
          <a href="/about">Nosotros</a>
          <a href="/contacto">Contacto</a>
          <a href="/eventos">Eventos</a>
        </nav>

        <a className="login-btn" href="/login">
          {" "}
          Iniciar sesión{" "}
        </a>
      </header>
    </>
  );
};

export default Header;
