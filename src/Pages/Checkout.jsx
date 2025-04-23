import React, { useState } from "react";

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    const cartItems = [
        { id: 1, name: "Producto 1", price: 100 },
        { id: 2, name: "Producto 2", price: 200 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
            {/* Formulario */}
            <div style={{ width: "45%" }}>
                <h2>Datos de Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="phone">Número de Teléfono:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}>
                        Enviar
                    </button>
                </form>
            </div>

            {/* Carrito */}
            <div style={{ width: "45%" }}>
                <h2>Carrito</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} style={{ marginBottom: "10px" }}>
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${total}</h3>
            </div>
        </div>
    );
};

export default Checkout;