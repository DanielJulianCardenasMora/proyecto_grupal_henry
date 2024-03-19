import React from "react";
import { Link } from "react-router-dom";
import style from './Navbar.module.css'

export const NavBar = () => {
    return (
      <div className={style.container}>
        <Link to="/">
          <button className={style.button}>Landing</button>
        </Link>

        <Link to="/home">
          <button className={style.button}>Home</button>
        </Link>

        <Link to="/detail/:id">
          <button className={style.button}>Detail</button>
        </Link>

        <Link to="/about">
          <button className={style.button}>About</button>
        </Link>
      </div>
    );
}