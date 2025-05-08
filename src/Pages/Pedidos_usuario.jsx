import React, { useState, useContext, useEffect } from "react";
import "./PedidosUsuario.css";
import Header from "../components/header.jsx";
import { DataContext } from "../App.jsx";

const PedidosUsuario = () => {
    const [numero, setNumero] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");
    const [detallesVisibles, setDetallesVisibles] = useState({});
    const { user } = useContext(DataContext);

    useEffect(() => {
        if (user && user.numero) {
            setNumero(user.numero);
        }
    }, [user]);

    useEffect(() => {
        if (numero) {
            fetchPedidos();
        }
    }, [numero]);

    const fetchPedidos = async () => {
        try {
            const res = await fetch(`http://localhost:3000/pedidos/usuario/${numero}`);
            if (!res.ok) throw new Error("No se pudieron obtener los pedidos");
            const data = await res.json();
            setPedidos(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setPedidos([]);
        }
    };

    const toggleDetalles = (id) => {
        setDetallesVisibles(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="pedidos-usuario">
            <Header />
            <div className="pedidos-container">
                <h2>Mis Pedidos</h2>

                {error && <p className="error">{error}</p>}

                {pedidos.length > 0 ? (
                    <div className="lista-pedidos">
                        {pedidos.map((pedido) => (
                            <div key={pedido.ID_Pedido} className="pedido-card">
                                <p><strong>Fecha:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}</p>
                                <p><strong>Estado:</strong> {pedido.estado_pedido}</p>
                                <p><strong>Monto Total:</strong> ${pedido.Precio_Final}</p>

                                <button onClick={() => toggleDetalles(pedido.ID_Pedido)}>
                                    {detallesVisibles[pedido.ID_Pedido] ? "Ocultar detalles" : "Mostrar más detalles"}
                                </button>

                                {detallesVisibles[pedido.ID_Pedido] && (
                                    <div className="productos">
                                        <h4>Productos:</h4>
                                        <ul>
                                            {pedido.productos.map((producto, i) => (
                                                <li key={i}>
                                                    {producto.nombre} - {producto.cantidad} x ${producto.precio}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="info">No hay pedidos para mostrar</p>
                )}
            </div>
        </div>
    );
};

export default PedidosUsuario;
