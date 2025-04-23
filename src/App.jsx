import STOCK from "./Pages/ADMIN-STOCK.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Tienda from "./Pages/Tienda.jsx";
import Eventos from "./Pages/Eventos.jsx";
import { CarritoProvider } from "./context/CarritoContext";
import {AdminHeader} from "./admin_panel/admin-header.jsx"
import Checkout from "./Pages/Checkout.jsx";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Signup } from "./Pages/Signup.jsx";
import { AdminSignup } from "./Pages/admin-signup.jsx";

export const DataContext = createContext()



function App() {
  
  console.log("corriendo en app");

  const [user, setUser] = useState(null)

  useEffect(()=>{

    async function verificarSesion(){

      const result = await axios.get('http://localhost:3000/userCheck', {withCredentials: true})

      if(result.data.user){setUser(result.data.user)}
      console.log(result.data.user)
    }

    verificarSesion()
    
    
  }, [])



  return (
    <DataContext.Provider value={{user, setUser}}>
      {user && user.is_admin === 1 ? 
      
      <Routes>

      <Route path="/admin-signup" element={
        <AdminSignup></AdminSignup>
          
      }></Route>

      <Route path='/' element={
        <><AdminHeader></AdminHeader>
        < STOCK/></>}
      />

      <Route path='/admin-stock' element={
        <><AdminHeader></AdminHeader>
        < STOCK/></>}
      />


        <Route
          path="/login" element={
          <>
            <Login />
          </>
        }
        />
    </Routes> 
    
    :   // si el usuario no es admin entonces aparece lo siguiente
  

    <CarritoProvider>
    <Routes>
      <Route path="/login" element={<><Login /></>}/>
      
      <Route path="/"element={<><Home /></>}/>

      <Route path="/catalogo" element={<Tienda />} />

      <Route path="/eventos" element={<Eventos />} />

      <Route path="/signup" element={<Signup />} />
     

      {/* <Route path='/contacto' element={<Contacto />} /> */}
      {/* <Route path='*' element={<NotFound />} /> */}

        <Route path='/Checkout' element={<><Checkout/></>}/> 
        
      
    </Routes>
    </CarritoProvider>
    
    }

    </DataContext.Provider>
    
  );
}

export default App;
