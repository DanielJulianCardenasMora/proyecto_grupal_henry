import React, { useEffect, useState  } from 'react';
import axios from  'axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage, AboutPage, DetailPage, CreatePage, ProductsPage, HomeAdmin ,ProductsAdmin, Follow, CreateProducts, UserProfilePage, CaptureOrder } from './pages';
import {Clients, Orderdash, Statistics} from './pages/Dashboard'
import './App.css';
import Card from './Components/Card/card';
import Cart from './Components/Cart/Cart';
import { Nav } from './Components';
import Login from './pages/Loginpage/Loginpage';
import Dashboard from './pages/Dashboard/dashboard';
import Orders from './Components/Orders/Orders';


axios.defaults.baseURL='proyectogrupalhenry-production-e8a4.up.railway.app'

function App() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true); 
  const [carrito, agregarProducto] = useState(carritoGuardado);
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();


  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const hiddenPaths = ['/login', '/dashboard', '/dashboard/products', '/dashboard/products/follow-up', '/dashboard/products/create'];
    setShouldShowNavbar(!hiddenPaths.some(ruta => location.pathname.startsWith(ruta)));
  }, [location]);

  return (
    <>

      {shouldShowNavbar && <Nav setUsuario={setUsuario} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login usuario={usuario} setUsuario={setUsuario} />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/detail/:id"
          element={
            <DetailPage carrito={carrito} agregarProducto={agregarProducto} />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cards" element={<Card />} />
        <Route
          path="/myprofile"
          element={
            <UserProfilePage usuario={usuario} setUsuario={setUsuario} />
          }
        />
        <Route
          path="/cart"
          element={<Cart carrito={carrito} agregarProducto={agregarProducto} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/capture_order" element={<CaptureOrder />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<HomeAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/follow-up" element={<Follow />} />
          <Route path="products/create" element={<CreateProducts />} />
          <Route path="clients" element={<Clients />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="ordersdash" element={<Orderdash />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
