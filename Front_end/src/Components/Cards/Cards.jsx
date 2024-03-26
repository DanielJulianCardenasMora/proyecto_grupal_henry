import Card from '../Card/card';
import style from './Cards.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png'
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png'
import { getAllProducts, getIndex } from '../../redux/actions/actions';




export const Cards = () => {
  const productsScreen = useSelector((state) => state.ProductsScreen);
  const index = useSelector((state) => state.Index);
  const dispatch = useDispatch()
  const totalPages = 7

  
  const siguientePagina = () => {
    dispatch(getIndex('as'))
    dispatch(getAllProducts(index))
  }
  const anteriorPagina = () => {
    dispatch(getIndex('de'))
    dispatch(getAllProducts(index))
  }
  console.log(index)

  
  
  return (
    <div>
      <div>

        <div className={style.cardsContainer}>
          {productsScreen.map(product => (
            <Card
              key={product.id}
              Id={product.id}
              Nombre={product.name}
              Imagen={product.image}
              Stock={product.stock}
              Precio={product.price}
              Genero={product.genero}
              Categoria={product.category}
            />
          ))}
        </div>
      </div>  
      <div className={style.btnNav}>
        <button
          onClick={() => anteriorPagina()}
        disabled={index === 0}
        >
          <img src={izquierda}/>
        </button>
        <button
          onClick={() => siguientePagina() }
          disabled={index > 8}>
          <img src={derecha}/>
        </button>
        </div>
    </div>
  )
}
