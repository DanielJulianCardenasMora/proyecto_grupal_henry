import React, { useEffect, useState } from 'react'
import style from './nav.module.css'
import { Link, useLocation } from 'react-router-dom'





function Nav() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedEmail = localStorage.getItem('usuario');
    setIsLoggedIn(storedEmail !== null);
  }, []);

  const handleLogin = () => {
    alert('Porfavor accede al Log in primero');
  };

  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    setUsuario(storedUsuario);
  }, []);



  return (
    <nav className={style.nav}>
    <div className={style.boxLogo}><Link to='/' className={style.link} >WF</Link></div>
     <div  className={style.boxList}><ul>
     <Link to='/products' className={style.link}> <li>Products</li></Link>
     <Link to='/about' className={style.link} > <li>About</li></Link>
     <Link to='/create' className={style.link} ><li>Create</li></Link>
     {isLoggedIn ? (
            <Link to='/myprofile' className={style.link}>
              <li>My Profile</li>
            </Link>
          ) : (
            <li className={style.link} onClick={handleLogin}>
              My Profile
            </li>
          )}
     <Link to='/cart' className={style.link}><li>Cart</li></Link>
      
     </ul></div>

     <div className={style.logIn}>
           <Link to='/login' className={style.link}><button className={style.logInB}>Log In</button></Link>
     </div>
     

    </nav>


  )
}

export default Nav