import './login.css'
import logo from '../assets/Logo_SinFondo_MásChico.png';


function Login() {

    return (
      <div className="login-container">
        <form className="form">
        <a className='a_logo' href="/"><img src={logo} alt="Logo" className="Logo" /></a>

          <h2 className="title">Iniciar Sesión</h2>
  
          
          <input
            type="email"
            placeholder="Email"
            className="input"
          />
  
          <input
            type="password"
            placeholder="Contraseña"
            className="input"
          />
  
          <button type="submit" className="btn">
            Ingresar
          </button>
        </form>
      </div>
    );
  }
  
  export default Login;
  