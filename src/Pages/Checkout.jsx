import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import Header from "../components/header.jsx";
import { FaUser, FaPhoneAlt, FaShoppingCart, FaMoneyBillWave, FaMobileAlt, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Checkout.css";
import { DataContext } from "../App.jsx";

const Checkout = () => {
    const { user, setUser } = useContext(DataContext);
    const [isLocked, setIsLocked] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState(""); // retiro o envio

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const {
        carrito,
        quitarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        borrarCarrito,
        totalCarrito,
    } = useCarrito();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.nombre || "",
                phone: user.numero || "",
                address: "",
            });
            setIsLocked(true);
        }
    }, [user]);

    function obtenerFechaHoraLocal() {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');
        return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }

    

    const enviarPedidoPorWhatsApp = () => {
    const numeroWhatsApp = "5493625293546";
    let mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;
    
    carrito.forEach((item) => {
        mensaje += `- ${item.cantidad} x ${item.nombre} ($${item.precio} c/u)\n`;
    });

    mensaje += `\nTotal: $${totalCarrito.toFixed(2)}\n\n`;
    mensaje += `Nombre: ${formData.name}\n`;
    mensaje += `Teléfono: ${formData.phone}\n`;
    mensaje += `Método de entrega: ${deliveryOption === "retiro" ? "Retiro en el local" : "Envío a domicilio"}\n`;

    if (deliveryOption === "envio") {
        mensaje += `Dirección: ${formData.address}\n`;
    }

    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // ✅ Abrir WhatsApp inmediatamente tras la acción del usuario
    window.open(url, "_blank");

    // ✅ Mostrar el mensaje después de abrir WhatsApp
    alert("¡Gracias por tu compra! Te redirigiremos al inicio...");

    borrarCarrito();
    navigate("/");
};
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            alert("Por favor, completá tu nombre y teléfono.");
            return;
        }

        if (!deliveryOption) {
            alert("Por favor, seleccioná si retirás en el local o si es con envío.");
            return;
        }

        if (deliveryOption === "envio" && !formData.address.trim()) {
            alert("Por favor, completá la dirección para el envío.");
            return;
        }

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        // Enviar solo los datos necesarios al backend, sin el tipo de entrega
        const pedidoData = {
            carrito: carrito,
            estado: "pendiente",
            fecha: obtenerFechaHoraLocal(),
            numero: formData.phone,
            nombre: formData.name,
            direccion: formData.address,
        };

        try {
            const response = await fetch("https://backendfuerzanatural.onrender.com/checkout/finalizarCompra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedidoData),
            });

            const data = await response.json();

            if (response.ok) {
                enviarPedidoPorWhatsApp();
            } else {
                alert("Error al finalizar la compra en el servidor: " + data.error);
            }
        } catch (error) {
            console.error("Error en finalizarCompra:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const cancelarCompra = () => {
        borrarCarrito();
        navigate('/');
    };

    return (
        <>
            <Header />
            <motion.div className="payment-info" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <h2>Métodos de Pago</h2>
                <div className="payment-methods">
                    <div className="payment-method"><FaMoneyBillWave className="payment-icon" /><span>Efectivo</span></div>
                    <div className="payment-method"><FaMobileAlt className="payment-icon" /><span>Transferencia</span></div>
                    <div className="payment-method"><FaCreditCard className="payment-icon" /><span>Débito</span></div>
                </div>
            </motion.div>

            <motion.div className="checkout-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <motion.div className="checkout-form" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                    <h2><FaUser style={{ marginRight: "10px" }} />Información de Contacto</h2>
                    {!user && <div className="login-links">¿Ya estás registrado? <a href="/login">Inicia sesión</a></div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <div className="input-icon-wrapper form-group">
                                <FaUser />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Ej: Juan Pérez"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isLocked}
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
                                    disabled={isLocked}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Método de entrega:</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        value="retiro"
                                        checked={deliveryOption === "retiro"}
                                        onChange={() => setDeliveryOption("retiro")}
                                    />
                                    <span>Retiro en el local</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        value="envio"
                                        checked={deliveryOption === "envio"}
                                        onChange={() => setDeliveryOption("envio")}
                                    />
                                    <span>Envío a domicilio </span>
                                </label>
                            </div>
                        </div>

                        {deliveryOption === "envio" && (
                            <div className="form-group">
                                <label htmlFor="address">Dirección:</label>
                                <div className="input-icon-wrapper">
                                    <FaMapMarkerAlt />
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Ej: Lopez y Planes 1234"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Finalizar Compra
                        </motion.button>
                    </form>
                </motion.div>

                <motion.div className="checkout-cart" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
                    <h2><FaShoppingCart style={{ marginRight: "10px" }} />Resumen del Carrito</h2>
                    {carrito.length === 0 ? (
                        <p style={{ marginTop: "20px", color: "var(--text-gray)" }}>Tu carrito está vacío.</p>
                    ) : (
                        <>
                            <ul className="cart-list">
                                {carrito.map((item) => (
                                    <li key={item.ID_Producto} className="cart-item">
                                        <div className="cart-item-info">
                                            <strong>{item.nombre}</strong>
                                            <span>${item.precio} c/u</span>
                                            <span>Cantidad: {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"} (${(item.cantidad * item.precio).toFixed(2)})</span>
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
