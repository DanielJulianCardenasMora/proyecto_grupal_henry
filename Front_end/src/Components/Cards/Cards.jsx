import Card from '../Card/card';
import style from './Cards.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png'
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png'
import { getAllProducts } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos de flecha izquierda y derecha

export const Cards = () => {
  const productsScreen = useSelector((state) => state.Products);
  const totalPages = useSelector((state) => state.TotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [currentFilters, setCurrentFilters] = useState({});
  const filters = useSelector((state) => state.filters);
  
  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(currentFilters)) {
      setCurrentPage(1);
      setCurrentFilters(filters);
    }
  }, [filters, currentFilters]);
  useEffect(() => {
    
    dispatch(getAllProducts(currentPage, filters));
  }, [currentPage, filters, dispatch]);

  const siguientePagina = () => {
    setCurrentPage(currentPage + 1)
  };

  const anteriorPagina = () => {
    setCurrentPage(currentPage - 1);
  };

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
                Imagen={product.images}
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
          onClick={anteriorPagina}
          disabled={currentPage === 1}
          className={style.arrow}
        >
          <FontAwesomeIcon icon={faArrowLeft} size='2x'/>
        </button>

        <button
          onClick={siguientePagina}
          disabled={currentPage == totalPages}
          className={style.arrow}
        >
          <FontAwesomeIcon icon={faArrowRight} size='2x'/>
        </button>
      </div>
    </div>
  );
};
