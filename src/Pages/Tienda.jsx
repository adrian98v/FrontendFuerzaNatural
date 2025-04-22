// Tienda.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tienda.css';
import Header from '../components/header.jsx'; // Importa el componente Header
import Fondo from '../assets/PAN_RODAJAS2_VIVA.webp'; 

const Tienda = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/Categorias')
      .then(res => setCategorias(res.data));
  }, []);

  useEffect(() => {
    const url = categoriaSeleccionada
      ? `http://localhost:3000/ProductoPorCategoria/${categoriaSeleccionada}`
      : 'http://localhost:3000/Productos';

    axios.get(url)
      .then(res => setProductos(res.data));
  }, [categoriaSeleccionada]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
    alert(`${producto.nombre} agregado al carrito`);
  };

  return (
    <div className="tienda">
      <Header className= 'tienda-header'></Header>
      
    <div className="tienda-container">
      
      
      
      <div className="categorias">
      <h2 className="titulo-categorias">Categorías</h2>
        <button
          className={!categoriaSeleccionada ? 'activo' : ''}
          onClick={() => setCategoriaSeleccionada(null)}
        >
          Todas
        </button>
        
        {categorias.map(cat => (
          <button
            key={cat.ID_Categoria}
            className={categoriaSeleccionada === cat.ID_Categoria ? 'activo' : ''}
            onClick={() => setCategoriaSeleccionada(cat.ID_Categoria)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div className="productos-container">
      <h1 className="titulo-tienda">Tienda de Panadería</h1>
        <div className="productos">
          {productos.map(prod => (
            <div key={prod.ID_Producto} className="producto-card">
              <img src={prod.imagen} alt={prod.nombre} className="producto-imagen" />
              <div className="producto-info">
                <h3>{prod.nombre}</h3>
                <p className="descripcion">{prod.descripcion}</p>
                <p className="precio">${prod.precio}</p>
                <button
                  className="btn-agregar"
                  onClick={() => agregarAlCarrito(prod)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tienda;
