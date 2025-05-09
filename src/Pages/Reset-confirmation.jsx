import './login.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function ResetConfirmation() {

    const navigate = useNavigate()

  return (
    <div className="login-container">
      <form className="form">
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <h3 className="title">Hemos enviado un enlace a tu correo para restablecer tu contraseña</h3>

        <button type='button' className='signup_button' onClick={()=>{navigate('/')}}>Volver</button>

      </form>

      
    </div>
  );
}

