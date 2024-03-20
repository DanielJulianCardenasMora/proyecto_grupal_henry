import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { LandingPage, AboutPage, DetailPage, CreatePage, ProductsPage } from './pages';
import './App.css'
import Card from './Components/Card/card';





function App() {

  //Aca solo se van a renderizar las pages
  return (

    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cards" element={<Card />} />
      </Routes>
    </>
  );

}

export default App
