import { useState } from "react";
import style from "./menu.module.css";





function Menu() {
  const [isHidden, setIsHidden] = useState(false);
  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <div className={ !isHidden ? style.boton: style.botton_hidden} onClick={toggleMenu}></div>
      <div className={ isHidden ? style.container: style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1>Man</h1>
            <h1>Women</h1>
            <h1>Unisex</h1>
          </div>
          <div className={style.columna2}>
            <h1>Jackets</h1>
            <h1>Coats</h1>
            <h1>Pants</h1>
            <h1>Skirts</h1>
            <h1>Shirts</h1>
            <h1>Tshirts</h1>
          </div>
          <div className={style.columna3}>
            <h1>Price order</h1>
            <h3>Lower to higher</h3>
            <h3>Higher to lower</h3>
            <h3 className={style.c3h3} onClick={toggleMenu}>back</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu