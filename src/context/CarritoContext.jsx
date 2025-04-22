// CarritoContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(item => item.ID_Producto === producto.ID_Producto);
      if (existe) {
        return prev.map(item =>
          item.ID_Producto === producto.ID_Producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.ID_Producto !== id));
  };

  const aumentarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.ID_Producto === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.ID_Producto === id
          ? { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : 1 }
          : item
      )
    );
  };

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, aumentarCantidad, disminuirCantidad, totalCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
