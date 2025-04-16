import Catalogo from "./Pages/Tienda.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Tienda from "./Pages/Tienda.jsx";
import Eventos from "./Pages/Eventos.jsx";

<<<<<<< HEAD
function App() {
=======
function App(){
  console.log("corriendo en app")
>>>>>>> 9f954110ac1fd0ba0823a8e44f026076da71d015
  return (
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

      <Route path="/catalogo" element={<Tienda />} />

      <Route path="/eventos" element={<Eventos />} />

      {/* <Route path='/contacto' element={<Contacto />} /> */}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
