import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Landing, HomePage, AboutPage, Detail, CreatePage } from './pages';
import './App.css'
import Menu from '../src/Components/Menu/Menu'





function App() {

  //Aca solo se van a renderizar las pages
  return (

    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/menutest" element={<Menu />} />

      </Routes>
    </>
  );

}

export default App
