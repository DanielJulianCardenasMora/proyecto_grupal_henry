import React, { useEffect, useState } from 'react';
import style from './nav.module.css';
import { Link, useLocation } from 'react-router-dom';

function Nav({ setUsuario }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('usuario');

    if(storedEmail !== null){
      console.log("storedemail es diferente a null")
      setShowLogout(true)
      setIsLoggedIn(true)
    }else{
      console.log("storedemail es null")
      setShowLogout(false)
      setIsLoggedIn(false)
    }
  }, []); // Asegúrate de que este efecto se ejecute solo una vez al montar el componente

  const handleLogout = () => {
    setUsuario(null);
    setIsLoggedIn(false);
    setShowLogout(false);
    localStorage.removeItem('usuario'); // Asegúrate de limpiar el usuario del almacenamiento local al cerrar sesión
  };

  const handleLogin = () => {
    alert('Por favor accede al Log in primero');
  };

  return (
    <nav className={style.nav}>
      <div className={style.boxLogo}>
        <Link to="/" className={style.link}>
          WF
        </Link>
      </div>
      <div className={style.boxList}>
        <ul>
          <Link to="/products" className={style.link}>
            {" "}
            <li>Products</li>
          </Link>
          <Link to="/about" className={style.link}>
            {" "}
            <li>About</li>
          </Link>
          <Link to="/create" className={style.link}>
            <li>Create</li>
          </Link>
          {isLoggedIn ? (
            <Link to="/myprofile" className={style.link}>
              <li>My Profile</li>
            </Link>
          ) : (
            <li className={style.link} onClick={handleLogin}>
              My Profile
            </li>
          )}
          <Link to="/cart" className={style.link}>
            <li>Cart</li>
          </Link>
        </ul>
      </div>

      {showLogout ? (
        <div className={style.logIn}>
          <button className={style.logInB} onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div className={style.logIn}>
          <Link to="/login" className={style.link}>
            <button className={style.logInB}>Log In</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
