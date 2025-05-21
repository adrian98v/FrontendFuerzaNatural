import React, { useEffect, useState } from 'react';
import './ADMIN-STOCK.css';
import axios from 'axios';

const API = 'https://backendfuerzanatural.onrender.com';

export default function AdminStock() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
  }, []);

  const fetchCategorias = async () => {
    const res = await axios.get(`${API}/Categorias`);
    setCategorias(res.data);
  };

  const fetchProductos = async () => {
    const res = await axios.get(`${API}/Productos`);
    setProductos(res.data);
  };

  const abrirModal = (tipo, entidad, datos = {}) => {
    setModal({ tipo, entidad, datos });
  };

  const cerrarModal = () => setModal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    try {
      if (modal.entidad === 'categoria') {
        if (modal.tipo === 'crear') await axios.post(`${API}/AgregarCategoria`, data);
        else await axios.put(`${API}/ActualizarCategoria/${modal.datos.ID_Categoria}`, data);
        fetchCategorias();
      } else {
        if (modal.tipo === 'crear') await axios.post(`${API}/AgregarProducto`, data);
        else await axios.put(`${API}/ActualizarProducto/${modal.datos.ID_Producto}`, data);
        fetchProductos();
      }
    } catch (err) {
      console.error(err);
    } finally {
      cerrarModal();
    }
  };

  const handleEliminar = async () => {
    try {
      if (modal.entidad === 'categoria') {
        await axios.delete(`${API}/EliminarCategoria/${modal.datos.ID_Categoria}`);
        fetchCategorias();
      } else {
        await axios.delete(`${API}/EliminarProducto/${modal.datos.ID_Producto}`);
        fetchProductos();
      }
    } catch (err) {
      console.error(err);
    } finally {
      cerrarModal();
    }
  };

  // Filtrar productos por nombre de categoría
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(prod => {
        const categoria = categorias.find(c => c.ID_Categoria === prod.ID_Categoria);
        return categoria && categoria.nombre.toLowerCase().includes(categoriaSeleccionada.toLowerCase());
      })
    : productos;

  return (
    <div className="admin-container">
      <section>
        <h2>Categorías <button onClick={() => abrirModal('crear', 'categoria')}>Añadir</button></h2>
        <ul>
          {categorias.map(cat => (
            <li key={cat.ID_Categoria}>
              <div className="product-item">
                <div className="product-attributes">
                  <div><strong>Nombre:</strong> {cat.nombre}</div>
                </div>
                <span className="actions">
                  <button onClick={() => abrirModal('editar', 'categoria', cat)}>Editar</button>
                  <button onClick={() => abrirModal('eliminar', 'categoria', cat)}>Eliminar</button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Buscar por Categoría</h2>
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        />

        <h2>Productos <button onClick={() => abrirModal('crear', 'producto')}>Añadir</button></h2>
        <ul>
          {productosFiltrados.map(prod => (
            <li key={prod.ID_Producto}>
              <div className="product-item">
                <div className="product-attributes">
                  <div><strong>Nombre:</strong> {prod.nombre}</div>
                  <div><strong>Categoría:</strong> {categorias.find(c => c.ID_Categoria === prod.ID_Categoria)?.nombre || 'Sin categoría'}</div>
                  <div><strong>Precio:</strong> ${prod.precio}</div>
                  <div><strong>Stock:</strong> {prod.stock}</div>
                  <div><strong>Descripción:</strong> {prod.descripcion}</div> {/* Descripción añadida */}
                </div>
                <span className="actions">
                  <button onClick={() => abrirModal('editar', 'producto', prod)}>Editar</button>
                  <button onClick={() => abrirModal('eliminar', 'producto', prod)}>Eliminar</button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={cerrarModal}>X</button>
            {modal.tipo === 'eliminar' ? (
              <div>
                <h3>¿Estás seguro que quieres eliminar esta {modal.entidad}?</h3>
                <button className="btn-confirm" onClick={handleEliminar}>Confirmar</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>{modal.tipo === 'crear' ? 'Añadir' : 'Editar'} {modal.entidad}</h3>
                {modal.entidad === 'categoria' ? (
                  <input
                    name="nombre"
                    defaultValue={modal.datos.nombre || ''}
                    placeholder="Nombre de la categoría"
                    required
                  />
                ) : (
                  <>
                    <input name="nombre" defaultValue={modal.datos.nombre || ''} placeholder="Nombre" required />
                    <input name="precio" defaultValue={modal.datos.precio || ''} placeholder="Precio" type="number" step="0.01" required />
                    <input name="stock" defaultValue={modal.datos.stock || ''} placeholder="Stock" type="number" required />
                    <input name="imagen" defaultValue={modal.datos.imagen || ''} placeholder="URL de imagen" />
                    <textarea name="descripcion" defaultValue={modal.datos.descripcion || ''} placeholder="Descripción"></textarea>
                    <select name="ID_Categoria" defaultValue={modal.datos.ID_Categoria || ''} required>
                      <option value="">Seleccionar categoría</option>
                      {categorias.map(c => (
                        <option key={c.ID_Categoria} value={c.ID_Categoria}>{c.nombre}</option>
                      ))}
                    </select>
                  </>
                )}
                <button type="submit">Guardar</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
