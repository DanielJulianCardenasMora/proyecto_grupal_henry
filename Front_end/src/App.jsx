import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { LandingPage, AboutPage, DetailPage, CreatePage, ProductsPage } from './pages';
import './App.css'
import Card from './Components/Card/card';
import Cart from './Components/Cart/Cart';
import { Nav } from './Components';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react'
import Login from './pages/Loginpage/Loginpage';







function App() {

const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
const [carrito, agregarProducto] = useState(carritoGuardado);

useEffect(() => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(carrito);
}, [carrito])


  //Aca solo se van a renderizar las pages
  return (

    <>
    <Nav/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/detail/:id" element={<DetailPage carrito={carrito} agregarProducto={ agregarProducto }  />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cards" element={<Card />} />
        <Route path="/cart" element={<Cart carrito={carrito} agregarProducto={agregarProducto} />} />
      </Routes>
      
    </>
  );

}

export default App
