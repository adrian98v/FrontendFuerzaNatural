import axios from "axios";
import './admin-clientes.css'
import { useEffect, useState } from "react";


export function Clientes(){

    const [numero, setNumero] = useState('')
    const [numeroEliminar, setNumeroEliminar] = useState('')
    const [clientes, setClientes] = useState([])
  

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/usuario/${numeroEliminar}`)

        } catch (error) {
            console.log(error)
        }
        
    }



    useEffect(() => {
        axios.get("http://localhost:3000/admin/clientes", { withCredentials: true })
          .then(res => {setClientes(res.data.clientes)

          })
          .catch(err => console.error(err));
        
        
    }, []);



    return(<div className="clientes_container">
        <div className="clientes_options_container">
            <div className="clientes_filtro_container">
                <label>Filtrar cliente</label>
                <input type="text" value={numero} placeholder="Número" onChange={(e)=>{setNumero(e.target.value)}}></input>

                <div>
                    <label className="label_eliminar">Eliminar usuario</label>
                    <input type="text" value={numeroEliminar} placeholder="Número" onChange={(e)=>{setNumeroEliminar(e.target.value)}}></input>
                    <button className="eliminar_usuario_button" onClick={handleDelete}>Eliminar</button>
                </div>
            </div>

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
                            if(cliente.numero.includes(numero))
                                return <tr key={cliente.id}>
                                    
                                    <td className="td_name">{cliente.nombre}</td>
                                    <td className={(!cliente.email) ? "td_email": undefined}>{cliente.email ? cliente.email : "email no encontrado"}</td>
                                    <td>{cliente.numero}</td>
                                    <td>{cliente.registrado ? "Registrado" : "No registrado"}</td>
                                    
                                </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>

        
    </div>)
}