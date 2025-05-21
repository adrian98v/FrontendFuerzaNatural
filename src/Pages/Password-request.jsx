import './login.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/material/Button';



function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [flagButton, setFlagButton] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault(); 

    setFlagButton(true)

    try {

      const response = await axios.post('https://backendfuerzanatural.onrender.com/reset/password', {email});

      navigate('/email-confirmation'); // redirige a la pagina de confirmación de envio de email

    } catch (error) {
      const message = error.response.data.message;
      setFlagButton(false)
      setMessage(message)
    }
  };
  


  return (
    <div className="login-container">
      <form className="form" onSubmit={handleRequest}>
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <h2 className="title">Generación de contraseña</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        

        {message.length > 0 && <label className='login_label_message'>{message}</label>}

        {flagButton ? 
        <LoadingButton
          loading={flagButton}
          size="large"
          className='loading_button'
          variant="contained"
          color="black"
          fullWidth
        ></LoadingButton>
        
        :

        <button type="submit" className="btn">
          Solicitar nueva contraseña
        </button>

      }
        
      </form>

      
    </div>
  );
}

export default PasswordRequest;
