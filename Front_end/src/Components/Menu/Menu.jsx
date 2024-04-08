import React from "react";
import { useState } from "react";
import style from "./menu.module.css";
import { useDispatch } from "react-redux";
import { updateGenderFilter, updateCategoryFilter, updatePriceFilter } from '../../redux/actions/actions';


export const Menu = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [activeOptions, setActiveOptions] = useState([]);
  const dispatch = useDispatch()

  
  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  const handleOptionClick = (optionValue) => {
    const newActiveOptions = [...activeOptions];
    const index = newActiveOptions.indexOf(optionValue);
    if (index !== -1) {
      newActiveOptions.splice(index, 1);
    } else {
      newActiveOptions.push(optionValue);
    }
    setActiveOptions(newActiveOptions);
  };

  const handleGender = (gender) => {
    handleOptionClick(gender)
    dispatch(updateGenderFilter(gender))
  }
  const handleCategory = (category) => {
    handleOptionClick(category)
    dispatch(updateCategoryFilter(category))
  }
  const handlePrice = (sortOrder) => {
    console.log('sortOrder menu', sortOrder);
    handleOptionClick(sortOrder)
    dispatch(updatePriceFilter(sortOrder))
  }


  return (
    <div className={style.box}>
      <div className={!isHidden ? style.boton : style.botton_hidden} onClick={toggleMenu}></div>
      <div className={isHidden ? style.container : style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 className={activeOptions.includes('Masculino') ? style.activeItem : ''} key='Masculino' onClick={() => handleGender("Masculino")}>Man</h1>
            <h1 className={activeOptions.includes('Femenino') ? style.activeItem : ''} key='Femenino' onClick={() => handleGender("Femenino")}>Women</h1>
            <h1 className={activeOptions.includes('Unisex') ? style.activeItem : ''} key='Unisex' onClick={() => handleGender("Unisex")} >Unisex</h1>
          </div>
          <div className={style.columna2}>
            <h1 className={activeOptions.includes('Chaquetas') ? style.activeItem : ''} key='Chaquetas' onClick={() => handleCategory("Chaquetas")}>Jackets</h1>
            <h1 className={activeOptions.includes('Buzos') ? style.activeItem : ''} key='Buzos' onClick={() => handleCategory("Buzos")}>Coats</h1>
            <h1 className={activeOptions.includes('Pantalones') ? style.activeItem : ''} key='Pantalones' onClick={() => handleCategory("Pantalones")}>Pants</h1>
            <h1 className={activeOptions.includes('Faldas') ? style.activeItem : ''} key='Faldas' onClick={() => handleCategory("Faldas")}>Skirts</h1>
            <h1 className={activeOptions.includes('Camisas') ? style.activeItem : ''} key='Camisas' onClick={() => handleCategory("Camisas")}>Shirts</h1>
            <h1 className={activeOptions.includes('Remeras') ? style.activeItem : ''} key='Remeras' onClick={() => handleCategory("Remeras")}>Tshirts</h1>
          </div>
          <div className={style.columna3}>
            <h2>Price order</h2>
            <h3 className={activeOptions.includes('asc') ? style.activeItem : ''} key='asc' onClick={() => handlePrice("asc")}>Lower to higher</h3>
            <h3 className={activeOptions.includes('desc') ? style.activeItem : ''} key='desc' onClick={() => handlePrice("desc")}>Higher to lower</h3>
            <h3 className={style.c3h3} onClick={toggleMenu}>BACK</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;