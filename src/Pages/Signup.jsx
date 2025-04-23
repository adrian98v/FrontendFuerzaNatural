import './signup.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


 export function Signup() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [contrasenia, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); 

    try {
      await axios.post('http://localhost:3000/signup', {
        nombre: nombre,
        email: email,
        is_admin: false,
        contrasenia: contrasenia,
        numero: numero
        
      }, {withCredentials: true});


      navigate('/'); // redirige al home
      
    } catch (error) {
      const message = error.response.data.message;
      setMessage(message)

    }
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSignup}>
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <h2 className="title">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

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

        <input
          type="number"
          placeholder="Número"
          className="input"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
        
        {message.length > 0 && <label className='label_message'>{message}</label>}
        

        <button type="submit" className="btn" >
          Crear cuenta
        </button>

        
      </form>

      
    </div>
  );
}
