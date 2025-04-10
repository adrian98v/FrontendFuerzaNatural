import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Catalogo from './Pages/ADMIN-STOCK.jsx'
import Tienda from './Pages/Tienda.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Tienda/>
  </StrictMode>,
)
