import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Landing, HomePage, AboutPage, Detail } from './pages';
import './App.css'





function App() {

  //Aca solo se van a renderizar las pages
  return (

    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<Landing/>} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );

}

export default App
