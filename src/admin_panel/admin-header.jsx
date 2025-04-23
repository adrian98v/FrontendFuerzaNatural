import "./admin-header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo_SinFondo_MásChico.png";


export const AdminHeader = () => {

    return(<div className="admin_header">
        <div className="admin_stock_container">
            <a href="/admin-stock">Stock</a>
        </div>

        <div className="admin_clientes_container">
            <a href="/admin-clientes">Clientes</a>
        </div>

        <div className="admin_pedidos_container">
            <a href="/admin-pedidos">Pedidos</a>
        </div> 
    </div>)
}