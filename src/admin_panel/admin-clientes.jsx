import axios from "axios";
import './admin-clientes.css'
import { useEffect, useState } from "react";


export function Clientes() {

    const [numero, setNumero] = useState('')
    const [numeroEliminar, setNumeroEliminar] = useState('')
    const [clientes, setClientes] = useState([])
    const [popup, setPopUp] = useState(false)
    const [numeroBool, setNumeroBool] = useState(false)
    const [buttonFlag, setButtonFlag] = useState(false)
    const [mensajeServidor, setMensajeServidor] = useState('')

    const handleDelete = async () => {
        try {
            const resultado = await axios.delete(`http://localhost:3000/usuario/${numeroEliminar}`);
            const mensaje = resultado.data.message;
            setMensajeServidor(mensaje);
            setNumeroEliminar('');
            setPopUp(true); // Volvés a mostrar el popup con el mensaje del servidor
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Cargar los clientes
        axios.get("http://localhost:3000/admin/clientes", { withCredentials: true })
            .then(res => {
                setClientes(res.data.clientes)
            })
            .catch(err => console.error(err));
    }, []);

    const handlePopupOpen = () => {
    if (numeroEliminar === '') {
        setPopUp(true);
        setButtonFlag(true);
        setMensajeServidor(''); 
    } else {
        setPopUp(true);
        setButtonFlag(false);
        setMensajeServidor('');
    }
}

    return (
        <div className="clientes_container">

            {popup && (
                <div className="eliminar_popup">
                    <div className="eliminar_container">
                        
                        {mensajeServidor !== "" ? (
                            <>
                                <label>{mensajeServidor}</label>
                                <div className="popup_button_container">
                                    <button onClick={() => {
                                        setPopUp(false);
                                        setMensajeServidor('');
                                    }}>Cerrar</button>
                                </div>
                            </>
                        ) : buttonFlag ? (
                            <>
                                <label>No ha ingresado un número de teléfono.</label>
                                <div className="popup_button_container">
                                    <button onClick={() => setPopUp(false)}>Cerrar</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <label>Estas por eliminar un usuario registrado.<br /><br />¿Deseas continuar?</label>
                                <div className="popup_button_container">
                                    <button onClick={handleDelete}>Eliminar</button>
                                    <button onClick={() => setPopUp(false)}>Cancelar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}



            {/* Filtro de clientes y eliminación */}
            <div className="clientes_options_container">
                <div className="clientes_filtro_container">
                    <label>Filtrar cliente</label>
                    <input type="text" value={numero} placeholder="Número" onChange={(e) => { setNumero(e.target.value) }} />

                    <div>
                        <label className="label_eliminar">Eliminar usuario</label>
                        <input type="text" value={numeroEliminar} placeholder="Número" onChange={(e) => {
                            setNumeroEliminar(e.target.value);
                            if (e.target.value !== '') {
                                setNumeroBool(true)
                            }
                        }} />
                        <button className="eliminar_usuario_button" onClick={handlePopupOpen}>Eliminar</button>
                    </div>
                </div>

                {/* Tabla de clientes */}
                <div className="clientes_section">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Número</th>
                                <th>Tipo de usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => {
                                if (cliente.numero.includes(numero))
                                    return (
                                        <tr key={cliente.nombre}>
                                            <td className="td_name">{cliente.nombre}</td>
                                            <td className={(!cliente.email) ? "td_email" : undefined}>
                                                {cliente.email ? cliente.email : "email no encontrado"}
                                            </td>
                                            <td>{cliente.numero}</td>
                                            <td>{cliente.registrado ? "Registrado" : "No registrado"}</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
