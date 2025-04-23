import STOCK from "./Pages/ADMIN-STOCK.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Tienda from "./Pages/Tienda.jsx";
import Eventos from "./Pages/Eventos.jsx";
import { CarritoProvider } from "./context/CarritoContext";
import {AdminHeader} from "./admin_panel/admin-header.jsx"
import Checkout from "./Pages/Checkout.jsx";


function App() {
  console.log("corriendo en app");
  return (
    <CarritoProvider>
    <Routes>
      <Route path="/login" element={<><Login /></>}/>
      
      <Route path="/"element={<><Home /></>}/>

      <Route path="/catalogo" element={<Tienda />} />

      <Route path="/eventos" element={<Eventos />} />


      <Route path="/admin" element={<><AdminHeader></AdminHeader></>} />

      {/* <Route path='/contacto' element={<Contacto />} /> */}
      {/* <Route path='*' element={<NotFound />} /> */}

        <Route path='/Checkout' element={<><Checkout/></>}/> 
        
      <Route path='/Admin-Stock' element={<>< STOCK/></>}/>
    </Routes>
    </CarritoProvider>
  );
}

export default App;
