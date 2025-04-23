import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import Header from "../components/header.jsx";
import { FaUser, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { FaMoneyBillWave, FaMobileAlt, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Checkout.css";

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    const {
        carrito,
        quitarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        borrarCarrito,
        totalCarrito,
    } = useCarrito();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    const navigate = useNavigate();
    const cancelarCompra = () => {
        borrarCarrito();
        navigate('/');
      };

    return (
        <>
            <Header />
            <motion.div
    className="payment-info"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.5 }}
>
    <h2>Metodos de Pago</h2>
    <div className="payment-methods">
        <div className="payment-method">
            <FaMoneyBillWave className="payment-icon" />
            <span>Efectivo</span>
        </div>
        <div className="payment-method">
            <FaMobileAlt className="payment-icon" />
            <span>Transferencia</span>
        </div>
        <div className="payment-method">
            <FaCreditCard className="payment-icon" />
            <span>Débito</span>
        </div>
    </div>
</motion.div>

            <motion.div
                className="checkout-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Formulario */}
                <motion.div
                    className="checkout-form"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >   
                    <h2>
                        <FaUser style={{ marginRight: "10px" }} />
                        Información de Contacto
                    </h2>
                    <div className="login-links">
                        ¿Ya estás registrado? <a href="/login">Inicia sesión</a>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <div className="input-icon-wrapper">
                                <FaUser />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Ej: Juan Pérez"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Número de Teléfono:</label>
                            <div className="input-icon-wrapper">
                                <FaPhoneAlt />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Ej: 3624567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            className="submit-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Finalizar Compra
                        </motion.button>
                    </form>
                </motion.div>

                {/* Carrito */}
                <motion.div
                    className="checkout-cart"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <h2>
                        <FaShoppingCart style={{ marginRight: "10px" }} />
                        Resumen del Carrito
                    </h2>

                    {carrito.length === 0 ? (
                        <p style={{ marginTop: "20px", color: "var(--text-gray)" }}>
                            Tu carrito está vacío.
                        </p>
                    ) : (
                        <>
                            <ul className="cart-list">
                                {carrito.map((item) => (
                                    <li key={item.ID_Producto} className="cart-item">
                                        <div className="cart-item-info">
                                            <strong>{item.nombre}</strong>
                                            <span>${item.precio} c/u</span>
                                            <span>Cantidad: {item.cantidad} {item.cantidad ===1?(<span>unidad</span>) : (<span>unidades</span>)} (${(item.cantidad * item.precio).toFixed(2)})</span>
                                        </div>
                                        <div className="cart-actions">
                                            <button onClick={() => disminuirCantidad(item.ID_Producto)}>-</button>
                                            <button onClick={() => aumentarCantidad(item.ID_Producto)}>+</button>
                                            <button onClick={() => quitarDelCarrito(item.ID_Producto)}>Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <h3>Total a pagar: ${totalCarrito.toFixed(2)}</h3>
                            <div className="cart-options">
                                <a href="/catalogo" className="cart-link">Agregar más productos</a>
                                <button onClick={cancelarCompra} className="cart-link cancel">Cancelar compra</button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
};

export default Checkout;
