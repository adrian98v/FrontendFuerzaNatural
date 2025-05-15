import React, { useEffect, useState, useContext} from "react";
import "./header.css";
import logo from "../assets/LOGO COLOR ALTERNATIVO- MAS CHICO.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App.jsx";
import { useCarrito } from "../context/CarritoContext";

const Header = () => {
  const { user, setUser } = useContext(DataContext);
  const [menuLateralAbierto, setMenuLateralAbierto] = useState(false);
  const [menuResponsive, setMenuResponsive] = useState(true)

  const [anchoPantalla, setAnchoPantalla] = useState(0);


  const toggleMenuLateral = () => {
    setMenuLateralAbierto(!menuLateralAbierto);
  };
  
  const irAPedidos = () => {
    navigate("/pedidos-user");
    setMenuLateralAbierto(false);
  };
  
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const result = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      navigate("/");
      setMenuLateralAbierto(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }


  function handleResponsiveMenu(){
  
    setMenuResponsive(!menuResponsive)
    
  }


  useEffect(() => {
    async function verificarSesion() {
      const result = await axios.get("http://localhost:3000/userCheck", {
        withCredentials: true,
      });

      if (result.data.user) {
        setUser(result.data.user);
      }
    }

    verificarSesion();


  }, []);


  useEffect(()=>{
    document.querySelector(".nav_container").classList.toggle("visible")
  }, [menuResponsive])

 

  useEffect(() => {
    const manejarResize = () => {
      const width = window.innerWidth
      setAnchoPantalla(width);

      if(width > 800)setMenuResponsive(true);
    };

    window.addEventListener("resize", manejarResize);


  }, []);



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
      {!user && (
        <div className="topbar">
          <p>
            ¡Registrate y obtené un 10% de descuento en tu primera compra!!!{" "}
            <a href="/login">Registrate ahora</a>
          </p>
        </div>
      )}

      <header>
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        
      
        <div className="btn_login_carrito_container">

         
          <div className='nav_container'>

            
            <nav className={`header_options ${menuResponsive ? 'activo' : ''}`}>
            <a href="/">Inicio</a>
            <a href="/catalogo">Tienda</a>
            <a href="/About">Nosotros</a>
            <a href="/reventa">Reventa</a>
            <a href="/eventos">Eventos</a>
          </nav>
            

            
          </div>
          
          
    

          {!user && (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
        )}

        {anchoPantalla > 800 && user &&
          <button className="logout_button_header" onClick={handleLogout} >Cerrar sesión</button>
        }

        
        <button className="carrito-btn" onClick={toggleCarrito}>
          🛒 ({cantidadTotal})
        </button>

        {!user && 
          <button className="drop_down_menu_button" onClick={handleResponsiveMenu}>☰</button>
        }

        {user && (
        <button className="drop_down_menu_button" onClick={toggleMenuLateral}>
          ☰
        </button>)}

        </div>
        

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
                      <button
                        onClick={() => disminuirCantidad(prod.ID_Producto)}
                      >
                        -
                      </button>
                      <span>{prod.cantidad}</span>
                      <button
                        onClick={() => aumentarCantidad(prod.ID_Producto)}
                      >
                        +
                      </button>
                      <button
                        onClick={() => quitarDelCarrito(prod.ID_Producto)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              <a href="/checkout" className="carrito-controles">
                <button>Finalizar Compra</button>
              </a>
            </ul>
          )}
          <hr />
          <p>
            <strong>Total: ${totalCarrito.toFixed(2)}</strong>
          </p>
        </div>
      )}
      
      
  <div className={menuLateralAbierto ? "menu-lateral": "menu-lateral-oculto"}>
    <button className="cerrar-menu" onClick={toggleMenuLateral}>✕</button>
    
    <ul>
      <li>
        <div className='nav_container_menu_lateral'>
        <nav className={`header_options_menu_lateral ${menuResponsive ? 'activo' : ''}`}>
          <a href="/">Inicio</a>
          <a href="/catalogo">Tienda</a>
          <a href="/About">Nosotros</a>
          <a href="/reventa">Reventa</a>
          <a href="/eventos">Eventos</a>
        </nav>
    </div>
      </li>
      <li>
        <button onClick={irAPedidos}>📦 Historial de pedidos</button>
      </li>
      <li>
        <button onClick={handleLogout}>🚪 Cerrar sesión</button>
      </li>
    </ul>
  </div>
</>
  );
};

export default Header;
