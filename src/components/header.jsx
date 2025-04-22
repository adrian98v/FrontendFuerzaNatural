import React, { useEffect, useState } from "react";
import "./header.css";
import logo from "../assets/Logo_SinFondo_MásChico.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [user, setUser] = useState(null)
  const navigate = useNavigate(); 

  async function handleLogout() {
    try {
      const result = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      
      console.log(result)
      navigate("/")
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }
  


  useEffect(()=>{

    async function verificarSesion(){

      const result = await axios.get('http://localhost:3000/userCheck', {withCredentials: true})

      if(result.data.user){setUser(result.data.user)}


    }

    verificarSesion()
    
  }, [])


  return (
    <>
    {!user && <div className="topbar">
        <p>
          ¡Registrate y obtené un 20% de descuento en tu primera compra!!!{" "}
          <a href="/login">Registrate ahora</a>
        </p>
      </div>}
      
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

        
        <button className="login-btn" onClick={user ? handleLogout : () => navigate("/login")}>
        {user ? "Cerrar Sesión" : "Iniciar Sesión"}
        </button>

      </header>
    </>
  );
};

export default Header;
