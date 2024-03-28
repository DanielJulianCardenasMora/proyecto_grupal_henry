import React from "react";
import { useState } from "react";
import style from "./menu.module.css";
import { useSelector, useDispatch } from "react-redux";
import { genderFilter ,priceFilter,categoriesFilter } from '../../redux/actions/actions';


export const Menu = () => {
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch()
  const productsScreen = useSelector((state) => state.ProductsScreen)
  const [actualFilters,setActualFilters] =useState([])

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  const handlePrice = (value) => {
    dispatch(priceFilter(value))
  }

  const handleGender = (gender) => {
    dispatch(genderFilter(gender))
  }

  const handleCategory = (category) => {
    dispatch(categoriesFilter(category))
  }

  const handleCategoryClick = (e) => {
    const filter=e.target.name
    if(!actualFilters.includes(filter)){
      handleCategory([...actualFilters,filter])
      setActualFilters([...actualFilters,filter])
    }else{
      const cleanFilter = actualFilters.filter(f=>f!==filter)
      handleCategory(cleanFilter)
      setActualFilters(cleanFilter)
    }
  };

  const handleGenderClick = (e) => {
    const filter=e.target.dataset.name
    if(!actualFilters.includes(filter)){
      handleGender(filter)
      setActualFilters([...actualFilters,filter])
    }else{
      const cleanFilter = actualFilters.filter(f=>f!==filter)
      handleGender(cleanFilter)
      setActualFilters(cleanFilter)
    }
  };

  const handlePriceClick = (e) => {
    const filter=e.target.dataset.name
    if(!actualFilters.includes(filter)){
      handlePrice(filter)
      setActualFilters([...actualFilters,filter])
    }else{
      const cleanFilter = actualFilters.filter(f=>f!==filter)
      handlePrice(cleanFilter)
      setActualFilters(cleanFilter)
    }
  };



  const selectedButton = (option) => actualFilters.includes(option) ? style.optionSelected : ''
  

  return (
    <div className={style.box}>
      <div className={ !isHidden ? style.boton: style.botton_hidden} onClick={toggleMenu}></div>
      <div className={ isHidden ? style.container: style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 data-name="Masculino" className={selectedButton("Masculino")} onClick={handleGenderClick}>Man</h1>
            <h1 data-name="Femenino" className={selectedButton("Femenino")} onClick={handleGenderClick}>Women</h1>
            <h1 data-name="Unisex" className={selectedButton("Unisex")} onClick={handleGenderClick}>Unisex</h1>
          </div>
          <div className={style.columna2}>
            <button name="Chaquetas" className={selectedButton("Chaquetas")} onClick={handleCategoryClick}>Jackets</button>
            <button name="Buzos" className={selectedButton("Buzos")} onClick={handleCategoryClick}>Coats</button>
            <button name="Pantalones" className={selectedButton("Pantalones")}onClick={handleCategoryClick}>Pants</button>
            <button name="Faldas" className={selectedButton("Faldas")} onClick={handleCategoryClick}>Skirts</button>
            <button name="Camisas" className={selectedButton("Camisas")} onClick={handleCategoryClick}>Shirts</button>
            <button name="Remeras" className={selectedButton("Remeras")} onClick={handleCategoryClick}>Tshirts</button>
          </div>
          <div className={style.columna3}>
            <h1>Price order</h1>
            <h3 data-name="des" className={selectedButton("des")} onClick={handlePriceClick}>Lower to higher</h3>
            <h3 data-name="asc" className={selectedButton("asc")} onClick={handlePriceClick}>Higher to lower</h3>
            <h2 className={style.c3h3} onClick={toggleMenu}>back</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu