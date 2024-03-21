import Card from '../Card/card';
import style from './Cards.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png'
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png'




export const Cards = () => {
  const productsScreen = useSelector((state) => state.ProductsScreen);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const startIndex = (currentPage - 1) * itemsPerPage;


  const getProductsShow = () => {
    return productsScreen.slice(startIndex, startIndex + itemsPerPage);
  };
  const productsShow = getProductsShow();


  return (
    <div>
      <div>

        <div className={style.cardsContainer}>
          {productsShow.map(product => (
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
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          <img src={izquierda}/>
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(productsScreen.length / itemsPerPage)}>
          <img src={derecha}/>
        </button>
        </div>
    </div>
  )
}
