import style from './nav.module.css'





function Nav() {



  return (
    <nav className={style.nav}>
    <div className={style.boxLogo}>WF</div>
     <div  className={style.boxList}><ul>
         <li>Products</li>
         <li>About</li>
         <li>Contact</li>
         <li>Cart</li>
     </ul></div>

     <div className={style.logIn}>
             Log In
     </div>
     

    </nav>


  )
}

export default Nav