import Catalogo from './Pages/Catalogo.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import { Routes, Route } from 'react-router-dom'

function App(){
  return (
    <Routes>
      <Route path='/login' element={
        <><Login /></>} 
      />
      <Route path='/' element={
        <><Home /></>} 
      />

      <Route path='/catalogo' element={<Catalogo />} />
      
      {/* <Route path='/contacto' element={<Contacto />} /> */}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  )
}


export default App;

