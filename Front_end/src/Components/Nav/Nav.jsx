import React, { useEffect, useState } from 'react'
import style from './nav.module.css'
import { Link } from 'react-router-dom'




function Nav() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    setUsuario(storedUsuario);
  }, []);

  const handleProfileClick = () => {
    if (!usuario) {
      alert("Necesitas logearte primero");
    }
  };

  return (
    <nav className={style.nav}>
    <div className={style.boxLogo}><Link to='/' className={style.link} >WF</Link></div>
     <div  className={style.boxList}><ul>
     <Link to='/products' className={style.link}> <li>Products</li></Link>
     <Link to='/about' className={style.link} > <li>About</li></Link>
     <Link to='/create' className={style.link} ><li>Create</li></Link>
     {usuario ? (
        <Link to="/myprofile" className={style.link}>
          <li>My Profile</li>
        </Link>
      ) : (
        <li onClick={handleProfileClick} className={style.link}>
          My Profile
        </li>
      )}
     <Link to='/cart' className={style.link}><li>Cart</li></Link>
      
     </ul></div>

     <div className={style.logIn}>
           <button className={style.logInB} >Log In</button>
     </div>
     

    </nav>


  )
}

export default Nav