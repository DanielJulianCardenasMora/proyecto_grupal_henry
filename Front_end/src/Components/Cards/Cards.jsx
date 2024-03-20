import Card from '../Card/card';
import style from './Cards.module.css'
import { useEffect, useState } from "react";
import axios from "axios";





export const Cards = () => {

  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    axios.get('https://wearfashion-947fb-default-rtdb.firebaseio.com/products/products.json')
    .then(response => {
        setProducts(response.data);
    })
    .catch(error => {
        console.log('error en traerlo', error);
    });
    }, []);


    console.log(products, "estos son los productos"); 

  return (
    <div>
      <div>

        <div className={style.cardsContainer}>
          {products.map(product => (
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
    </div>
  )
}
