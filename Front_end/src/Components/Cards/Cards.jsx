import Card from '../Card/card';
import style from './Cards.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png'
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png'
import { getAllProducts, priceFilterAsc, priceFilterDes } from '../../redux/actions/actions';



export const Cards = () => {
  const productsScreen = useSelector((state) => state.ProductsScreen);
  const filtroActivo = useSelector((state) => state.FiltroActivo);
  const totalPages = useSelector((state) => state.TotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()
  const urlActual = useSelector((state) => state.UrlActual)

  
  console.log(urlActual)
  console.log(filtroActivo)



  useEffect(() => {
    if (filtroActivo.includes('priceAsc')) {
      dispatch(priceFilterAsc(currentPage));
    } else if (filtroActivo.includes('priceDes')) {
      dispatch(priceFilterDes(currentPage));
    } else {
      dispatch(getAllProducts(currentPage));
    }
  }, [currentPage]);


  const siguientePagina = () => {
    setCurrentPage(currentPage + 1);
  }
  const anteriorPagina = () => {
    setCurrentPage(currentPage - 1);
  }

 
  
  return (
    <div>
      <div>
        <div className={style.cardsContainer}>
          {productsScreen.length > 0 ? (
            productsScreen.map((product) => (
            <Card
              key={product.id}
              Id={product.id}
              Nombre={product.name}
              Imagen={product.images[0]}
              Stock={product.stock}
              Precio={product.price}
              Genero={product.genero}
              Categoria={product.category}
            />
            ))
          ) : (
            <p>cargando productos</p>  
          )}
        </div>
      </div>  

      <div className={style.btnNav}>
        <button
          onClick={() => anteriorPagina()}
          disabled={currentPage === 1}>
        <img src={izquierda}/>
        </button>

        <button
          onClick={() => siguientePagina() }
          disabled={currentPage >= totalPages}>
        <img src={derecha}/>
        </button>
      </div>
    </div>
  )
}
