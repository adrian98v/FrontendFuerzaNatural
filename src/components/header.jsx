import React from 'react';
import './header.css'; // Import the CSS file
import logo from '../assets/Logo_SinFondo_MásChico.png';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logo" className="logo" />
            <nav>
                <a href="#home">Inicio</a>
                <a href="#home">Tienda</a>
                <a href="#about">Nosotros</a>
                <a href="#contact">Contacto</a>
                <a href="#home">Eventos</a>

            </nav>
            <a href="#signUp">Sing/UP</a>

        </header>
    );
};

export default Header;