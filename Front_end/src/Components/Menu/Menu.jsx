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
    console.log('option handle', optionValue)
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

  const resetFilters = () => {
    setActiveOptions([]); // Resetear los filtros activos
    dispatch(updateGenderFilter('')); // Resetear filtro de género
    dispatch(updateCategoryFilter('')); // Resetear filtro de categoría
    dispatch(updatePriceFilter('')); // Resetear filtro de precio
  };


  return (
    <div className={style.box}>
      <div className={!isHidden ? style.boton : style.botton_hidden} onClick={toggleMenu}>MENU</div>
      <div className={isHidden ? style.container : style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 className={activeOptions.includes('Men') ? style.activeItem : ''} key='Men' onClick={() => handleGender("Men")}>Man</h1>
            <h1 className={activeOptions.includes('Women') ? style.activeItem : ''} key='Women' onClick={() => handleGender("Women")}>Women</h1>
            <h1 className={activeOptions.includes('Unisex') ? style.activeItem : ''} key='Unisex' onClick={() => handleGender("Unisex")} >Unisex</h1>
          </div>
          <div className={style.columna2}>
            <h1 className={activeOptions.includes('Jackets') ? style.activeItem : ''} key='Jackets' onClick={() => handleCategory("Jackets")}>Jackets</h1>
            <h1 className={activeOptions.includes('Divers') ? style.activeItem : ''} key='Divers' onClick={() => handleCategory("Divers")}>Coats</h1>
            <h1 className={activeOptions.includes('Pants') ? style.activeItem : ''} key='Pants' onClick={() => handleCategory("Pants")}>Pants</h1>
            <h1 className={activeOptions.includes('Skirts') ? style.activeItem : ''} key='Skirts' onClick={() => handleCategory("Skirts")}>Skirts</h1>
            <h1 className={activeOptions.includes('Shirts') ? style.activeItem : ''} key='Shirts' onClick={() => handleCategory("Shirts")}>Shirts</h1>
            <h1 className={activeOptions.includes('Tshirts') ? style.activeItem : ''} key='Tshirts' onClick={() => handleCategory("Tshirts")}>Tshirts</h1>
          </div>
          <div className={style.columna3}>
            <h2>Price order</h2>
            <h3 className={activeOptions.includes('asc') ? style.activeItem : ''} key='asc' onClick={() => handlePrice("asc")}>Lower to higher</h3>
            <h3 className={activeOptions.includes('desc') ? style.activeItem : ''} key='desc' onClick={() => handlePrice("desc")}>Higher to lower</h3>
            <h3 className={style.reset}  onClick={resetFilters}>Reset</h3> {/* Botón de reset */}
            <h3 className={style.c3h3} onClick={toggleMenu}>BACK</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;