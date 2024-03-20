//import { Link } from "react-router-dom";
import React from "react";
import style from "./card.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  // Inicializar el estado de products como un array vacío
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

  console.log(products, "estos son los productos"); // Colocar la consola dentro del componente

  return (
    <div className={style.cardcontainer}>
      {/* Renderizar la data de products */}
      {products.map(product => (
        <div key={product.id}> {/* Asegúrate de proporcionar una clave única */}
          <p>Id: {product.id}</p>
          <p>Nombre: {product.name}</p> {/* Ajusta esto según la estructura de tu objeto product */}
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
