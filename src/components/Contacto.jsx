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
        "service_nwhuvwo", // --> aca reemplazar con SERVICE_ID
        "template_os2vx0q", // ---> aca reemplazar con TEMPLATE_ID
        form.current,
        "jBnTZTm65NDjEj3ZO" // ---> aca reemplazar con PUBLIC_KEY
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
      <div className="col-lg-4 contacto-info">
        <div
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <i className="bi bi-geo-alt flex-shrink-0"></i>
          <div>
            <h3>Ubicación</h3>
            <p>Lopez y Planes 717, Resistencia, Chaco, Argentina </p>
          </div>
        </div>

        <div
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <i className="bi bi-clock flex-shrink-0"></i>
          <div>
            <h3>Horarios</h3>
            <p>
              Lunes a Domingo:
              <br />
              08:00 AM - 13:00 PM y 16:00 AM - 21:00 PM
            </p>
          </div>
        </div>

        <div
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <i className="bi bi-telephone flex-shrink-0"></i>
          <div>
            <h3>Teléfono</h3>
            <p>+54 9 3624 696969</p>
          </div>
        </div>

        <div
          className="info-item d-flex"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <i className="bi bi-envelope flex-shrink-0"></i>
          <div>
            <h3>Email</h3>
            <p>panaderiafuerzanatural@gmail.com</p>
          </div>
        </div>
      </div>

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

export default Contacto;
