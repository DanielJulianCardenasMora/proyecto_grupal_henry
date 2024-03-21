import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./menu.module.css";
import { priceFilter } from "../../redux/actions/actions";
import { genderFilter } from '../../redux/actions/actions';




export const Menu = () => {
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch()
  const productsScreen = useSelector((state) => state.ProductsScreen)

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  const handlePrice = (value) => {
    dispatch(priceFilter(value))
  }

  const clickMan = () => {
    dispatch(genderFilter('Masculino'))
  }

  return (
    <div className={style.box}>
      <div className={ !isHidden ? style.boton: style.botton_hidden} onClick={toggleMenu}></div>
      <div className={ isHidden ? style.container: style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 onClick={clickMan}>Man</h1>
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
            <h3 onClick={() => handlePrice("asc")}>Lower to higher</h3>
            <h3 onClick={() => handlePrice("des")}>Higher to lower</h3>
            <h3 className={style.c3h3} onClick={toggleMenu}>back</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu