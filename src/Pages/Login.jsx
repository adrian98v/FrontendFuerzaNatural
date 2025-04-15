import './login.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasenia, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        contrasenia
      });

      sessionStorage.setItem("currentUser", JSON.stringify(response.data.user));


      console.log('Login exitoso:', response.data);
      navigate('/'); // redirige al home

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <h2 className="title">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="input"
          value={contrasenia}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
