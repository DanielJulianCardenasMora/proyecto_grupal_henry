import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage, AboutPage, DetailPage, CreatePage, ProductsPage } from './pages';
import './App.css';
import Card from './Components/Card/card';
import Cart from './Components/Cart/Cart';
import { Nav } from './Components';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import Login from './pages/Loginpage/Loginpage';

function App() {
  const location = useLocation(); // Obtener la ubicación actual

  // Función para determinar si se debe mostrar la barra de navegación
  const shouldShowNavbar = () => {
    return location.pathname !== '/login'; // Mostrar la barra de navegación si la ruta no es /login
  };

  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
  const [carrito, agregarProducto] = useState(carritoGuardado);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
  }, [carrito]);

  // Renderizar la barra de navegación solo si la ruta no es /login
  const renderNavbar = shouldShowNavbar() && <Nav />;

  return (
    <>
      {renderNavbar}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/detail/:id" element={<DetailPage carrito={carrito} agregarProducto={agregarProducto} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cards" element={<Card />} />
        <Route path="/cart" element={<Cart carrito={carrito} agregarProducto={agregarProducto} />} />
      </Routes>
    </>
  );
}

export default App;
