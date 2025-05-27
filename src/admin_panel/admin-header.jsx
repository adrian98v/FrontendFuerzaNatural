import "./admin-header.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo_SinFondo_MásChico.png";
import React, { useEffect, useState, useContext } from "react";
import { DataContext } from '../App.jsx'


export const AdminHeader = () => {

    const navigate = useNavigate()

    const {user, setUser} = useContext(DataContext)

    function handleLogout() {
        try {
      
          setUser(null);
          navigate("/")
          
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      }



    return(<div className="admin_header">
        

        <div className="admin_stock_container">
            <Link to="/admin-stock">Stock</Link>
        </div>

        <div className="admin_clientes_container">
            <Link to="/admin-clientes">Clientes</Link>
        </div>

        <div className="admin_pedidos_container">
            <Link to="/admin-pedidos">Pedidos</Link>
        </div>

        <button className="admin_account_button" onClick={()=>{navigate("/admin-signup")}}>
        Nueva cuenta
        </button>

        <button className="admin-login-btn" onClick={user ? handleLogout : () => navigate("/login")}>
        Cerrar Sesión
        </button>

    </div>)
}