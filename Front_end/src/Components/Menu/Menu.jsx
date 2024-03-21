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

  //para probar el filtro: categoria
  //es con click, despues ver si se hacen de a dos quizas
  const handleCategoryClick = (e) => {
    const filter=e.target.name
    // Ocultar el menú después de seleccionar una categoría
    if(!actualFilters.includes(filter)){
      console.log([...actualFilters,filter],"filters log")
      handleCategory([...actualFilters,filter])
      setActualFilters([...actualFilters,filter])
    }else{
      const cleanFilter = actualFilters.filter(f=>f!==filter)
      handleCategory(cleanFilter)
      setActualFilters(cleanFilter)
    }
    setIsHidden(true);
  };
  // const handlePrice = (value) => {
  //   dispatch(priceFilter(value))
  // }


  // const handleGender = (gender) => {
  //   dispatch(genderFilter(gender))
  // }


  const selectedButton = (option)=> actualFilters.includes(option)&& style.optionSelected
  return (
    <div className={style.box}>
      <div className={ !isHidden ? style.boton: style.botton_hidden} onClick={toggleMenu}></div>
      <div className={ isHidden ? style.container: style.hidden}>
        <div className={style.columnas}>
          <div className={style.columna1}>
            <h1 onClick={() => handleGender("Masculino")}>Man</h1>
            <h1 onClick={() => handleGender("Femenino")}>Women</h1>
            <h1 onClick={() => handleGender("Unisex")}>Unisex</h1>
          </div>
          <div className={style.columna2}>
            <button name="Chaquetas" className={selectedButton("Chaquetas")}  onClick={handleCategoryClick}>Jackets</button>
            <button name="Buzos" className={selectedButton("Buzos")} onClick={handleCategoryClick}>Coats</button>
            <button name="Pantalones" className={selectedButton("Pantalones")} onClick={handleCategoryClick}>Pants</button>
            <button name="Faldas" className={selectedButton("Faldas")} onClick={handleCategoryClick}>Skirts</button>
            <button name="Camisas" className={selectedButton("Camisas")} onClick={handleCategoryClick}>Shirts</button>
            <button name="Remeras" className={selectedButton("Remeras")} onClick={handleCategoryClick}>Tshirts</button>
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