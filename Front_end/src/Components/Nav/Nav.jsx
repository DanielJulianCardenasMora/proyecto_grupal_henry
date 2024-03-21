import style from './nav.module.css'
import { Link } from 'react-router-dom'





function Nav() {



  return (
    <nav className={style.nav}>
    <div className={style.boxLogo}>WF</div>
     <div  className={style.boxList}><ul>
     <Link to='/products' className={style.link}> <li>Products</li></Link>
     <Link to='/about' className={style.link} > <li>About</li></Link>
     <li>Contact</li>
      <li>Cart</li>
     </ul></div>

     <div className={style.logIn}>
           <button className={style.logInB} >Log In</button>
     </div>
     

    </nav>


  )
}

export default Nav