import React, { useEffect, useState } from 'react';
import style from './nav.module.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function Nav({ setUsuario }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const { logout, isAuthenticated, user } = useAuth0(); // Obtener user de useAuth0
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('usuario');
    const role = localStorage.getItem("role")


    if(role == 'admin'){
      setIsAdmin(true)
    }


    if (storedEmail !== null) {
      setShowLogout(true);
      setIsLoggedIn(true);
    } else {
      setShowLogout(false);
      setIsLoggedIn(false);
    }
  }, []);



  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    alert('Login required');
    navigate("/login");
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUsuario(null);
    setIsLoggedIn(false);
    setShowLogout(false);
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    if (isAuthenticated) {
      logout();
      navigate("/");
    }
  };

  // Manejar el almacenamiento del correo electrónico cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('usuario', user.email);
      setShowLogout(true);
      setIsLoggedIn(true);
    }
  }, [isAuthenticated, user]);

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
            <li>Products</li>
          </Link>
          <Link to="/about" className={style.link}>
            <li>About</li>
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
          
          {isAdmin ? (
            <Link to="/dashboard" className={style.link}>
              <li>Dashboard</li>
            </Link>
          ) : (
            <li></li>
          )}
        </ul>
      </div>

      {showLogout || isAuthenticated ? (
        <div className={style.logIn}>
          <button className={style.logInB} onClick={handleLogout}>
            Log out
          </button>
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
