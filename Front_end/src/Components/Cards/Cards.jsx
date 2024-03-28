import Card from '../Card/card';
import style from './Cards.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png';
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png';
import { getAll, render } from '../../redux/actions/actions';
import axios from 'axios';

export const Cards = () => {
  const api = useSelector((state) => state.Api);
  const URL = useSelector((state) => state.Filtrado)
  const productsScreen = useSelector((state) => state.ProductsScreen);
  const totalPages = useSelector((state) => state.TotalPages);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  //! Función para cargar los productos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(api);
        dispatch(getAll(data));
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchData();
  }, []);

  //! Funcion que actualiza las card con la nueva URL
  const updateCards = async () => {
    if(URL.length > 5){
      try {
      let url = `${URL}&page=${currentPage}`
      console.log(url)
      const {data} = await axios.get(url)
      dispatch(render(data.products))
    } catch (error) {
      console.log(error)
    }
  }}


  //! BOTONES
  const siguientePagina = () => {
    setCurrentPage(currentPage + 1);

  };
  
  const anteriorPagina = () => {
    setCurrentPage(currentPage - 1);
  };


  //! Efecto que ejecuta updateCards cada vez que currentPage cambie
  useEffect(() => {
    updateCards(); 
  }, [currentPage]);

  //! Efecto que ejecuta updateCards cada vez que URL (Filtrado) cambie
  useEffect(() => {
    updateCards()
  }, [URL])

  return (
    <div>
      <div>
        <div className={style.cardsContainer}>
          {productsScreen !== undefined && productsScreen.length > 0 ? (
            productsScreen.map(product => (
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
            <h1>Loading...</h1>
          )}
        </div>
      </div>  

      <div className={style.btnNav}>
        <button
          onClick={anteriorPagina}
          disabled={currentPage === 1}>
          <img src={izquierda} alt="Anterior"/>
        </button>

        <button
          onClick={siguientePagina}
          disabled={currentPage >= totalPages}>
          <img src={derecha} alt="Siguiente"/>
        </button>
      </div>
    </div>
  );
};
