import React from "react";
import { useState } from "react";
import style from "./menu.module.css";
import { useDispatch } from "react-redux";
import { genderFilter, filterByCategory, priceFilter, updateGenderFilter, updateCategoryFilter, updatePriceFilter } from '../../redux/actions/actions';


export const Menu = () => {
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  // const handleGender = (gender) => {
  //   dispatch(genderFilter(gender))
  // }

  // const handleCategory = (category) => {
  //   dispatch(filterByCategory(category))
  // }
  // const handlePrice = (sortOrder) => {
  //   dispatch(priceFilter(sortOrder))
  // }
  const handleGender = (gender) => {
    dispatch(updateGenderFilter(gender))
  }

  const handleCategory = (category) => {
    dispatch(updateCategoryFilter(category))
  }
  const handlePrice = (sortOrder) => {
    console.log('sortOrder menu', sortOrder);
    dispatch(updatePriceFilter(sortOrder))
  }


  return (
    <div className={style.box}>
      <div className={!isHidden ? style.boton : style.botton_hidden} onClick={toggleMenu}></div>
      <div className={isHidden ? style.container : style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 onClick={() => handleGender("Masculino")}>Man</h1>
            <h1 onClick={() => handleGender("Femenino")}>Women</h1>
            <h1 onClick={() => handleGender("Unisex")} >Unisex</h1>
          </div>
          <div className={style.columna2}>
            <button onClick={() => handleCategory("Chaquetas")}>Jackets</button>
            <button onClick={() => handleCategory("Buzos")}>Coats</button>
            <button onClick={() => handleCategory("Pantalones")}>Pants</button>
            <button onClick={() => handleCategory("Faldas")}>Skirts</button>
            <button onClick={() => handleCategory("Remeras")}>Tshirts</button>
            <button onClick={() => handleCategory("Camisas")}>Shirts</button>
          </div>
          <div className={style.columna3}>
            <h1>Price order</h1>
            <h3 onClick={() => handlePrice("asc")}>Lower to higher</h3>
            <h3 onClick={() => handlePrice("desc")}>Higher to lower</h3>
            <h2 className={style.c3h3} onClick={toggleMenu}>back</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;