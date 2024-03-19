import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { LandingPage, HomePage, AboutPage, DetailPage } from './pages';
import './App.css'



function App() {

  //Aca solo se van a renderizar las pages
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App
