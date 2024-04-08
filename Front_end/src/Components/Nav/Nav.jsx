import React, { useEffect, useState } from 'react';
import style from './nav.module.css';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('usuario');
    if (storedEmail) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setShowLogin(true); // Mostrar el botón de login cuando el usuario cierre sesión
    }
  }, []);

  const handleLogin = () => {
    alert('Porfavor accede al Log in primero');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    setShowLogin(false);
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

      {showLogin ? (
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
