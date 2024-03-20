//import { Link } from "react-router-dom";
import style from "./card.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  
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


  //para traer la url de la imagen
  return (
    <div className={style.cardcontainer}>
      
      {products.map(product => (
        <div key={product.id}> 
          <p>Id: {product.id}</p>
          <p>Nombre: {product.name}</p> 
          <p>Imagen: {product.image}</p>
          <p>Stock: {product.stock}</p>
          <p>Precio: {product.price}</p>
          <p>Género: {product.genero}</p>
          <p>Categoría: {product.category}</p>
        </div>
      ))}
    </div>
  );
}
