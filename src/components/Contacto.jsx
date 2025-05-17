// src/components/Contacto.jsx
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Contacto.css";
import emailjs from "@emailjs/browser";

const Contacto = () => {
  const form = useRef();
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_nwhuvwo", // -->  SERVICE_ID
        "template_os2vx0q", // ---> TEMPLATE_ID
        form.current,
        "jBnTZTm65NDjEj3ZO" // --->  PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setEnviado(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contacto_info" className="contacto-container row gy-4">
      {/* Columna Izquierda */}
      <div id="contacto_info_container" className="col-lg-4 contacto-info">
        <div 
          id="contacto_info_container_box"
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <i className="bi bi-geo-alt flex-shrink-0"></i>
          <div id="div_contacto_id">
            <h3>Ubicación</h3>
            <p>Lopez y Planes 717, Resistencia, Chaco, Argentina </p>
          </div>
        </div>

        <div
        id="contacto_info_container_box"
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="350"
        >
          <i className="bi bi-clock flex-shrink-0"></i>
          <div id="div_contacto_id">
            <h3>Horarios</h3>
            <p>
              Lunes a Domingo:
              <br />
              08:00 AM - 13:00 PM y 16:00 AM - 21:00 PM
            </p>
          </div>
        </div>

        <div
        id="contacto_info_container_box"
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <i className="bi bi-telephone flex-shrink-0"></i>
          <div id="div_contacto_id">
            <h3>Teléfono</h3>
            <p>+54 9 3624 696969</p>
          </div>
        </div>

        <div
        id="contacto_info_container_box"
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <i className="bi bi-envelope flex-shrink-0"></i>
          <div id="div_contacto_id">
            <h3>Email</h3>
            <p>panaderiafuerzanatural@gmail.com</p>
          </div>
        </div>


         <form id="contacto_info_container_form" ref={form} onSubmit={sendEmail} className="contacto-form">
          
            
              <input id="nombre" type="text" name="name" placeholder="Nombre" required />
            
            
              <input
                id="email"
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
            
           
              <input id="asunto" type="text" name="asunto" placeholder="Asunto" required />
         
            
              <textarea
                 id="text-area"
                name="message"
                rows="5"
                placeholder="Mensaje"
                required> </textarea>
            
        
            <button type="submit" className="btn-enviar">
              Enviar Mensaje
            </button>
          
          {enviado && (
            <p className="mt-3" style={{ color: "#fffff" }}>
              ¡Mensaje enviado con éxito!
            </p>
          )}
        </form>


      </div>
      
    </div>
  );
};

export default Contacto;
