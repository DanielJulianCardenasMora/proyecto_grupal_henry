import React, { useEffect, useState } from 'react';
import axios from  'axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage, AboutPage, DetailPage, CreatePage, ProductsPage, HomeAdmin ,ProductsAdmin, Follow, CreateProducts, UserProfilePage } from './pages';
import './App.css';
import Card from './Components/Card/card';
import Cart from './Components/Cart/Cart';
import { Nav } from './Components';
import Login from './pages/Loginpage/Loginpage';
import Dashboard from './pages/Dashboard/dashboard';
import Orders from './Components/Orders/Orders';

axios.defaults.baseURL='proyectogrupalhenry-production-e8a4.up.railway.app'

function App() {
  //estas variables van encima del useState
  const usuarioLogeado = JSON.parse(localStorage.getItem('usuario')) || [];
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
  //====
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true); 
  const [carrito, agregarProducto] = useState(carritoGuardado);
  const [usuario, setUsuario] = useState(usuarioLogeado);
  const location = useLocation();


  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // useEffect(() => {
  //   localStorage.setItem('usuario', JSON.stringify(usuario));
  // }, [usuario]);
    console.log(localStorage.getItem('usuario'))
  useEffect(() => {
    const hiddenPaths = ['/dashboard', '/dashboard/products', '/dashboard/products/follow-up', '/dashboard/products/create'];
    setShouldShowNavbar(!hiddenPaths.includes(location.pathname));
  }, [location]);

 useEffect(() => {
  if(location.pathname !== '/login'){
    setShouldShowNavbar(true)
  }else{
    setShouldShowNavbar(false)
  }
 }, [location.pathname])

  return (
    <>
    {shouldShowNavbar && <Nav />} 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login usuario={usuario} setUsuario={setUsuario} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/detail/:id" element={<DetailPage carrito={carrito} agregarProducto={agregarProducto} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cards" element={<Card />} />
        <Route path="/myprofile" element={<UserProfilePage usuario={usuario} setUsuario={setUsuario} />} />
        <Route path="/cart" element={<Cart carrito={carrito} agregarProducto={agregarProducto} />} />
        <Route path="/orders" element={<Orders />} />
    

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<HomeAdmin />}/>  
          <Route path="products" element={<ProductsAdmin />}/>  
          <Route path="products/follow-up" element={<Follow />}/>  
          <Route path="products/create" element={<CreateProducts />}/>  
        </Route>

      </Routes>
    </>
  );
}

export default App;
