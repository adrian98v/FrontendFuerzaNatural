import React, { useEffect, useState } from "react";
import "./header.css";
import logo from "../assets/Logo_SinFondo_MásChico.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useCarrito } from "../context/CarritoContext";


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

  const {
    carrito,
    quitarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    totalCarrito,
  } = useCarrito();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

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


        <button className="carrito-btn" onClick={toggleCarrito}>
          🛒 ({cantidadTotal})
        </button>
      </header>

      {mostrarCarrito && (
        <div className="carrito-popup">
          <h3>Carrito</h3>
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {carrito.map((prod) => (
                <li key={prod.ID_Producto} className="carrito-item">
                  <div>
                    <strong>{prod.nombre}</strong> - ${prod.precio}
                    <div className="carrito-controles">
                      <button onClick={() => disminuirCantidad(prod.ID_Producto)}>-</button>
                      <span>{prod.cantidad}</span>
                      <button onClick={() => aumentarCantidad(prod.ID_Producto)}>+</button>
                      <button onClick={() => quitarDelCarrito(prod.ID_Producto)}>❌</button>
                    </div>
                  </div>
                </li>
                
              ))}
              
              <a href="#Checkout" className="carrito-controles">
                <button >Finalizar Compra</button>
              </a>
              
            </ul>
          )}
          <hr />
          <p><strong>Total: ${totalCarrito.toFixed(2)}</strong></p>
        </div>
      )}

    </>
  );
};

export default Header;
