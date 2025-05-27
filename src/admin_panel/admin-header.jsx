import "./admin-header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
            <a href="/admin-stock">Stock</a>
        </div>

        <div className="admin_clientes_container">
            <a href="/admin-clientes">Clientes</a>
        </div>

        <div className="admin_pedidos_container">
            <a href="/admin-pedidos">Pedidos</a>
        </div>

        <button className="admin_account_button" onClick={()=>{navigate("/admin-signup")}}>
        Nueva cuenta
        </button>

        <button className="admin-login-btn" onClick={user ? handleLogout : () => navigate("/login")}>
        Cerrar Sesión
        </button>

    </div>)
}