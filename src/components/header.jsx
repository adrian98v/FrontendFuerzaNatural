import React from 'react';
import './header.css'; // Import the CSS file
import logo from '../assets/Logo_SinFondo_MásChico.png';

const Header = () => {
    return (
        <header>
            <a href=""><img src={logo} alt="Logo" className="logo" /></a>
            <nav>
                <a href="">Inicio</a>
                <a href="tienda">Tienda</a>
                <a href="about">Nosotros</a>
                <a href="contacto">Contacto</a>
                <a href="eventos">Eventos</a>

            </nav>
            <a className='login-btn' href="login">Iniciar sesión</a>

        </header>
    );
};

export default Header;