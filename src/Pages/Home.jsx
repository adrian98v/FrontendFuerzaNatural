import React, { useEffect, useState } from 'react';
import './home.css';
import Header from '../components/Header.jsx'; // Importa el componente Header
import Fondo from "../assets/ROLLS_CANELA_VIVO.jpg";
import Imagen1 from "../assets/MASA_CRUDA.jpg";
import Imagen2 from "../assets/MEDIALUNA_MITAD.jpg";
import Imagen3 from "../assets/PUBLICIDAD.jpg";

function Home() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  

  const images = [Imagen1, Imagen2, Imagen3];

  const texts = [
    {
      title: "¿Qué es la masa madre?",
      text: "La masa madre es un fermento natural hecho a base de harina y agua, sin aditivos. Gracias a una fermentación lenta y controlada, da origen a panes más sabrosos, nutritivos y duraderos."
    },
    {
      title: "¿Qué aporta a la panadería?",
      text: "La masa madre mejora la textura, el aroma y el sabor del pan. Además, hace que sea más fácil de digerir, con una miga suave, una corteza crujiente y un perfil nutricional superior."
    },
    {
      title: "¿Quiénes somos?",
      text: "En Fuerza Natural elaboramos cada pan con dedicación y respeto por los procesos artesanales. Creemos en la fuerza de lo natural, en los ingredientes simples y en el sabor real del pan tradicional."
    }
  ];

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

      {/* Carrusel con texto */}
      <div className="carousel-text-container">
        <div
          className="carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="carousel">
            {images.map((img, i) => (
              <div className={`slide ${index === i ? "active" : ""}`} key={i}>
                <img src={img} alt={`Slide ${i}`} />
              </div>
            ))}
            <div className="carousel-buttons">
              <button className="prev" onClick={handlePrev}>‹</button>
              <button className="next" onClick={handleNext}>›</button>
            </div>
          </div>

        
          
        </div>

        <div className="carousel-text">
          <h2>{texts[index].title}</h2>
          <p>{texts[index].text}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
