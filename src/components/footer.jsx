import React from "react";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección central: Copyright */}
        <div className="footer-center">
          <p>
            © {new Date().getFullYear()} Desarrollado por Burgos, Veppo y
            Villacorta. Todos los derechos reservados.
          </p>
        </div>

        {/* Sección derecha: iconos sociales */}
        <div className="footer-right">
         
          <a
            href="https://www.instagram.com/fuerzanatural.rcia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
