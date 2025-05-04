import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin-pedidos.css";

const PedidosList = () => {
  const [pedidosPorFecha, setPedidosPorFecha] = useState({});
  const [expandedPedido, setExpandedPedido] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pedidos/detalles");
 
        // Ordenamos los pedidos por fecha descendente
        const pedidosOrdenados = response.data.sort((a, b) => {
          return new Date(b.fecha_pedido) - new Date(a.fecha_pedido);
        });

        // Agrupamos por fecha (YYYY-MM-DD)
        const agrupados = {};
        pedidosOrdenados.forEach((pedido) => {
          const fechaObj = new Date(pedido.fecha_pedido);
          const fechaClave = fechaObj.toISOString().split("T")[0]; // clave para agrupación (YYYY-MM-DD)

          if (!agrupados[fechaClave]) {
            agrupados[fechaClave] = [];
          }
          agrupados[fechaClave].push(pedido);
        });

        setPedidosPorFecha(agrupados);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const toggleExpand = (id) => {
    setExpandedPedido(expandedPedido === id ? null : id);
  };

  const marcarComoEntregado = async (id) => {
    try {
      await axios.put(`http://localhost:3000/pedidos/${id}/entregado`);
      setPedidosPorFecha((prev) => {
        const actualizado = { ...prev };
        for (const fecha in actualizado) {
          actualizado[fecha] = actualizado[fecha].map((pedido) =>
            pedido.ID_Pedido === id ? { ...pedido, estado_pedido: "Entregado" } : pedido
          );
        }
        return actualizado;
      });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="pedido-container">
      <h1 className="titulo">Listado de Pedidos</h1>
      {Object.entries(pedidosPorFecha).map(([fecha, pedidos]) => (
        <div key={fecha} className="grupo-fecha">
          <h2 className="fecha-titulo">📅 {formatearFecha(fecha)}</h2>
          {pedidos.map((pedido) => (
            <div key={pedido.ID_Pedido} className="pedido-card">
              <div className="pedido-header">
                <div>
                  <p className="nombre"><strong>Usuario: {pedido.nombre_usuario}</strong></p>
                  <p className="numero">Número telefónico: 📞 {pedido.numero_usuario}</p>
                  <p className="fecha">Fecha: {fecha}</p>
                  <p className={`estado ${pedido.estado_pedido === "entregado" ? "entregado" : "pendiente"}`}>
                    Estado: {pedido.estado_pedido}
                  </p>
                </div>
                <div className="acciones">
                  <button onClick={() => toggleExpand(pedido.ID_Pedido)} className="boton">
                    {expandedPedido === pedido.ID_Pedido ? "Ocultar Detalles" : "Ver Detalles"}
                  </button>
                  {(pedido.estado_pedido !== "entregado" && pedido.estado_pedido !== "Entregado") && (
                    <button onClick={() => marcarComoEntregado(pedido.ID_Pedido)} className="boton-entregado">
                      Marcar como Entregado
                    </button>
                  )}
                </div>
              </div>

              {expandedPedido === pedido.ID_Pedido && (
                <div className="productos-list">
                  <h3>🛒 Productos:</h3>
                  <ul>
                    {pedido.productos.map((prod, index) => (
                      <li key={index}>
                        <p className="producto-item">
                        {prod.nombre} | Cantidad: {prod.cantidad}   {prod.cantidad ===1?(<p>unidad</p>) : (<p>unidades</p>)} <p> </p> |  ${(prod.precio)}

                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="precio-final">💰 Precio Final: ${pedido.Precio_Final}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PedidosList;
