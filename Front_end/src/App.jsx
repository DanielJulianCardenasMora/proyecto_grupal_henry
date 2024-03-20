import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { LandingPage, HomePage, AboutPage, DetailPage, CreatePage } from './pages';
import './App.css'
import Menu from '../src/Components/Menu/Menu'
import Card from './Components/Card/card';





function App() {

  //Aca solo se van a renderizar las pages
  return (

    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/menutest" element={<Menu />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cards" element={<Card />} />
      </Routes>
    </>
  );

}

export default App
