import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PedidosUsuario.css";
import Header from "../components/header.jsx";
import { DataContext } from "../App.jsx";
import { useCarrito } from "../context/CarritoContext.jsx"; // Asegúrate de tener la ruta correcta

const PedidosUsuario = () => {
    const [numero, setNumero] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");
    const [mensajeErrorStock, setMensajeErrorStock] = useState("");
    const [detallesVisibles, setDetallesVisibles] = useState({});
    const { user } = useContext(DataContext);
    const { agregarAlCarrito, borrarCarrito } = useCarrito();
    const {VolverAPedirCarrito} = useCarrito();
    const navigate = useNavigate();

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

        // Ordenar por fecha descendente (más recientes primero)
        const pedidosOrdenados = data.sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido));
        setPedidos(pedidosOrdenados);

        setError("");
        console.log(pedidosOrdenados);
    } catch (err) {
        setError(err.message);
        setPedidos([]);
    }
};

    const toggleDetalles = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const volverAPedir = async (productosPedido) => {
    setMensajeErrorStock("");
    borrarCarrito(); // Limpia el carrito

    try {
        // 1. Traer todos los productos desde la base de datos
        const res = await fetch("http://localhost:3000/Productos");
        if (!res.ok) throw new Error("No se pudieron obtener los productos");
        const productosBD = await res.json(); // Lista de todos los productos

        let hayError = false;

        // 2. Recorrer productos del pedido anterior
        for (let productoPedido of productosPedido) {
            const productoBD = productosBD.find(p => p.ID_Producto === productoPedido.ID_Producto);

            if (!productoBD) {
                setMensajeErrorStock(`El producto "${productoPedido.nombre}" ya no está disponible.`);
                hayError = true;
                break;
            }

            if (productoBD.stock < productoPedido.cantidad) {
                setMensajeErrorStock(`El producto "${productoBD.nombre}" no tiene stock suficiente.`);
                hayError = true;
                break;
            }

            // 3. Agregar al carrito con precio actualizado y datos correctos
            VolverAPedirCarrito({
                ID_Producto: productoBD.ID_Producto,
                nombre: productoBD.nombre,
                precio: productoBD.precio,
                cantidad: productoPedido.cantidad, // ✅ CORREGIDO
                imagen: productoBD.imagen, // si usás imágenes
                descripcion: productoBD.descripcion, // si tenés más datos
            });
        }

        // 4. Si no hubo errores, redirigir
        if (!hayError) {
            navigate("/checkout");
        }

    } catch (error) {
        console.error(error);
        setMensajeErrorStock("Error al verificar los productos.");
    }
};


    return (
        <div className="pedidos-usuario">
            <Header />
            <div className="pedidos-container">
                <h2>Mis Pedidos</h2>

                {error && <p className="error">{error}</p>}
                {mensajeErrorStock && <p className="error">{mensajeErrorStock}</p>}

                {pedidos.length > 0 ? (
                    <div className="lista-pedidos">
                        {pedidos.map((pedido) => (
                            <div key={pedido.ID_Pedido} className="pedido-card">
                                <p><strong>Fecha:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}</p>
                                <p><strong>Estado:</strong> {pedido.estado_pedido}</p>
                                <p><strong>Monto Total:</strong> ${pedido.Precio_Final}</p>

                                <button className="detalles" onClick={() => toggleDetalles(pedido.ID_Pedido)}>
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
                                        <button
                                            className="btn_volverPedir"
                                            onClick={() => volverAPedir(pedido.productos)}
                                        >
                                            Volver a pedir
                                        </button>
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
