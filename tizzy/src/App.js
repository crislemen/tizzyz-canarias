import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { NotFound } from './Components/NotFound';
import {AddProducts} from './Components/AddProducts'
import { Cart } from './Components/Cart';
import { Contacto } from './Components/Contacto';

export const App = () => {
  return (

   <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home/>}/> 
      <Route path="/signup" element= {<Signup/>}/> 
      <Route path="/login" element= {<Login/>}/> 
      <Route path="/add-productos" element= {<AddProducts/>}/>
      <Route path="/carrito" element= {<Cart/>}/>
      <Route path="/contacto" element= {<Contacto/>}/>
      <Route element= {<NotFound/>}/> 
    </Routes>
   </BrowserRouter>
     
  )
}

export default App;
