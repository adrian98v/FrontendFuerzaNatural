import './login.css';
import logo from '../assets/Logo_SinFondo_MásChico.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export function ResetPassword() {
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

  const [message, setMessage] = useState('')
  const [tokenValido, setTokenValido] = useState(false);
  const [tokenMessage, setTokenMessage] = useState('')
  const {token} = useParams()
  const navigate = useNavigate();


  const handlePasswordCreation = async (e) => {
    e.preventDefault(); 

    if(contrasenia == confirmarContrasenia){
        try {

            const response = await axios.post('http://localhost:3000/reset/generatePassword', {contrasenia, token});

        } catch (error) {
            const message = error.response.data.message;
            setMessage(message)
        }
    }else{
        
    }
    
  };
  

  useEffect(()=>{

    const controlarToken = async ()=>{
        const respuesta = await axios.post('http://localhost:3000/reset/tokenCheck', {token});
        
        if(respuesta.success) {setTokenValido(true)}
        else {setTokenMessage(respuesta.message)}
    }

    controlarToken()

  }, [])


  return (
    
    <div className="login-container">
        {tokenValido ?
            <form className="form" onSubmit={handlePasswordCreation}>
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <h2 className="title">Ingrese su nueva contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="input"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Repita su nueva contraseña"
          className="input"
          value={confirmarContrasenia}
          onChange={(e) => setConfirmarContrasenia(e.target.value)}
          required
        />

        {message.length > 0 && <label className='login_label_message'>{message}</label>}
        {contrasenia !== confirmarContrasenia && <label className='login_label_message'>Las contraseñas ingresadas no coinciden</label>}


        <button type="submit" className="btn">
          Solicitar nueva contraseña
        </button>

      </form>

        :   // si no vuelve un token valido

        <form className="form" onSubmit={handlePasswordCreation}>
        <a className="a_logo" href="/">
          <img src={logo} alt="Logo" className="Logo" />
        </a>

        <div className='token_invalid_container'>
            <h3 className="token_invalid_title">Su token no existe o ya no es válido</h3>
            <label className="token_invalid_title_2">Solicite una generación de contraseña nuevamente</label>
        </div>

        <button type='button' className='signup_button' onClick={()=>{navigate('/password_request')}}>Volver</button>

      </form>
        
        }

      
    </div>
  );
}


