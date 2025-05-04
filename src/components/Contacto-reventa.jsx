// src/components/Contacto.jsx
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./contacto-reventa.css";
import emailjs from "@emailjs/browser";

const Contactoreventa = () => {
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
    <div className="contacto-container row gy-4">
      {/* Columna Izquierda */}

      {/* Columna Derecha (Formulario) */}
      <div className="col-lg-8">
        <form ref={form} onSubmit={sendEmail} className="contacto-form">
          <div className="row">
            <div className="col-md-6">
              <input type="text" name="name" placeholder="Tu Nombre" required />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="user_email"
                placeholder="Tu Email"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <input type="text" name="asunto" placeholder="Asunto" required />
          </div>
          <div className="mt-3">
            <textarea
              name="message"
              rows="5"
              placeholder="Mensaje"
              required
            ></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn-enviar">
              Enviar Mensaje
            </button>
          </div>
          {enviado && (
            <p className="mt-3" style={{ color: "#28a745" }}>
              ¡Mensaje enviado con éxito!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contactoreventa;
