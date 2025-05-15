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
