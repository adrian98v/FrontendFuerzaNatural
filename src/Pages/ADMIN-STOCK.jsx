// Catalogo.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./ADMIN-STOCK.css";

export default function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
    ID_Categoria: "",
  });

  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [showModalProducto, setShowModalProducto] = useState(false);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      obtenerProductosPorCategoria(categoriaSeleccionada);
    } else {
      setProductos([]);
    }
  }, [categoriaSeleccionada]);

  const obtenerCategorias = async () => {
    const res = await axios.get("http://localhost:3000/api/categorias");
    setCategorias(res.data);
  };

  const obtenerProductosPorCategoria = async (idCategoria) => {
    const res = await axios.get(`http://localhost:3000/api/productos/categoria/${idCategoria}`);
    setProductos(res.data);
  };

  const agregarCategoria = async () => {
    await axios.post("http://localhost:3000/api/categorias", { nombre: nuevaCategoria });
    setNuevaCategoria("");
    setShowModalCategoria(false);
    obtenerCategorias();
  };

  const agregarProducto = async () => {
    await axios.post("http://localhost:3000/api/productos", nuevoProducto);
    setNuevoProducto({ nombre: "", precio: "", stock: "", imagen: "", descripcion: "", ID_Categoria: "" });
    setShowModalProducto(false);
    if (categoriaSeleccionada) obtenerProductosPorCategoria(categoriaSeleccionada);
  };

  return (
    <div className="catalogo-container">
      <h1 className="titulo">Catálogo de Productos</h1>

      <div className="acciones">
        <button onClick={() => setShowModalCategoria(true)} className="btn btn-verde">+ Categoría</button>
        <button onClick={() => setShowModalProducto(true)} className="btn btn-azul">+ Producto</button>
      </div>

      <div className="catalogo-layout">
        <div className="categorias-lista">
          <h3>Categorías</h3>
          <ul>
            {categorias.map((cat) => (
              <li
                key={cat.ID_Categoria}
                className={categoriaSeleccionada === cat.ID_Categoria ? "categoria activa" : "categoria"}
                onClick={() => setCategoriaSeleccionada(cat.ID_Categoria)}
              >
                {cat.nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="productos-grid">
          {productos.map((prod) => (
            <div key={prod.ID_Producto} className="producto-card">
              <img src={prod.imagen} alt={prod.nombre} className="producto-img" />
              <h2 className="producto-nombre">{prod.nombre}</h2>
              <p className="producto-desc">{prod.descripcion}</p>
              <p className="producto-precio">${prod.precio}</p>
              <p className="producto-stock">Stock: {prod.stock}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Categoría */}
      {showModalCategoria && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nueva Categoría</h2>
            <input
              type="text"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              className="input"
              placeholder="Nombre de categoría"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModalCategoria(false)} className="btn btn-gris">Cancelar</button>
              <button onClick={agregarCategoria} className="btn btn-verde">Agregar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Producto */}
      {showModalProducto && (
        <div className="modal-overlay">
          <div className="modal modal-producto">
            <h2>Nuevo Producto</h2>
            <input type="text" placeholder="Nombre" className="input" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
            <input type="number" placeholder="Precio" className="input" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} />
            <input type="number" placeholder="Stock" className="input" value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} />
            <input type="text" placeholder="Imagen (URL)" className="input" value={nuevoProducto.imagen} onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })} />
            <textarea placeholder="Descripción" className="input" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
            <select className="input" value={nuevoProducto.ID_Categoria} onChange={(e) => setNuevoProducto({ ...nuevoProducto, ID_Categoria: e.target.value })}>
              <option value="">Seleccionar Categoría</option>
              {categorias.map((cat) => (
                <option key={cat.ID_Categoria} value={cat.ID_Categoria}>{cat.nombre}</option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={() => setShowModalProducto(false)} className="btn btn-gris">Cancelar</button>
              <button onClick={agregarProducto} className="btn btn-azul">Agregar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
