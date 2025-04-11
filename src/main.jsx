import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
=======
import Catalogo from './Pages/ADMIN-STOCK.jsx'
import Tienda from './Pages/Tienda.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Tienda/>
  </StrictMode>,
)
>>>>>>> c0a9497fc410867d766166557e5c550f790a9d16
