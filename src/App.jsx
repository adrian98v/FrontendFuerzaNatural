import Catalogo from './Pages/Tienda.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import { Routes, Route } from 'react-router-dom'
import Tienda from './Pages/Tienda.jsx';

function App(){
  console.log("corriendo en app")
  return (
    <Routes>
      <Route path='/login' element={
        <><Login /></>} 
      />
      <Route path='/' element={
        <><Home /></>} 
      />

      <Route path='/catalogo' element=
      {<Tienda />} 
      />
      
      {/* <Route path='/contacto' element={<Contacto />} /> */}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  )
}


export default App;

