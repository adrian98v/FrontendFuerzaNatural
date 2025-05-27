import STOCK from "./Pages/ADMIN-STOCK.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Tienda from "./Pages/Tienda.jsx";
import Eventos from "./Pages/Eventos.jsx";
import About from "./Pages/About.jsx";
import Reventa from "./Pages/Reventa.jsx";
import { CarritoProvider } from "./context/CarritoContext";
import { AdminHeader } from "./admin_panel/admin-header.jsx";
import Checkout from "./Pages/Checkout.jsx";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { Signup } from "./Pages/Signup.jsx";
import { AdminSignup } from "./Pages/Admin-signup.jsx";
import { Clientes } from "./admin_panel/admin-clientes.jsx";
import PedidosList from "./admin_panel/admin-pedidos.jsx";
import PedidosUsuario from "./Pages/Pedidos_usuario.jsx";
import PasswordRequest from "./Pages/Password-request.jsx"
import {ResetPassword} from "./Pages/Reset-password.jsx"
import {ResetConfirmation} from "./Pages/Reset-confirmation.jsx"
import {NewPasswordConfirmation} from "./Pages/NewPassword-Confirmation.jsx"


export const DataContext = createContext();

export const useUserContext = () => useContext(DataContext);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function verificarSesion() {

      if(user){
        const result = await axios.post("https://backendfuerzanatural.onrender.com/userCheck", user);

      if (result.data.user) {
        setUser(result.data.user);
      }else{
        setUser(null)
      }
      }
      
    }

    verificarSesion();
  }, []);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {user && user.is_admin == 1 ? (
        <Routes>
          <Route
            path="/admin-clientes"
            element={
              <>
                <AdminHeader></AdminHeader>
                <Clientes></Clientes>
              </>
            }
          ></Route>

          <Route
            path="/admin-signup"
            element={<AdminSignup></AdminSignup>}
          ></Route>

          <Route
            path="/"
            element={
              <>
                <AdminHeader></AdminHeader>
                <STOCK />
              </>
            }
          />

          <Route
            path="/admin-stock"
            element={
              <>
                <AdminHeader></AdminHeader>
                <STOCK />
              </>
            }
          />

          <Route
            path="/admin-pedidos"
            element={
              <>
                <AdminHeader></AdminHeader>
                <PedidosList></PedidosList>
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
        </Routes>
      ) : (
        // si el usuario no es admin entonces aparece lo siguiente

        <CarritoProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            {user &&(<Route path="/pedidos-user" element={<PedidosUsuario/>}></Route>) }
            <Route path="/catalogo" element={<Tienda />} />

            <Route path="/eventos" element={<Eventos />} />

            <Route path="/about" element={<About />} />

            <Route path="/reventa" element={<Reventa />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/password_confirmation" element={<NewPasswordConfirmation/>} />

            <Route path="/password_request" element={<PasswordRequest />} />
            
            <Route path="/email-confirmation" element={<ResetConfirmation />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />


            {/* <Route path='/contacto' element={<Contacto />} /> */}
            {/* <Route path='*' element={<NotFound />} /> */}

            <Route
              path="/Checkout"
              element={
                <>
                  <Checkout />
                </>
              }
            />
          </Routes>
        </CarritoProvider>
      )}
    </DataContext.Provider>
  );
}

export default App;
