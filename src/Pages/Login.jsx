import './login.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from "../App.jsx";

function Login() {

  const [email, setEmail] = useState('');
  const [contrasenia, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const {user, setUser} = useContext(DataContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('https://backendfuerzanatural.onrender.com/login', {
        email,
        contrasenia
      });


      if (response.data.user) {
        const loginUser = response.data.user
        setUser(loginUser);
      }
      
      navigate('/'); // redirige al home

    } catch (error) {
      const message = error.response.data.message;
      setMessage(message)
    }
  };


  


  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <Link className="a_logo" to="/">
          <img src={logo} alt="Logo" className="Logo" />
        </Link>

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

        {message.length > 0 && <label className='login_label_message'>{message}</label>}

        <button type="submit" className="btn">
          Ingresar
        </button>

        <button type='button' className='login_button_reset_password' onClick={()=>{navigate('/password_request')}}>Olvidé mi contraseña</button>

        <button type='button' className='signup_button' onClick={()=>{navigate('/signup')}}>Registrarse</button>
      </form>

      
    </div>
  );
}

export default Login;
