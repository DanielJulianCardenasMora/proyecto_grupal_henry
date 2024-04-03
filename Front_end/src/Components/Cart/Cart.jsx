import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import  ItemCount  from './ItemCount';



const Cart = ({ carrito, agregarProducto }) => {
  const totalInicial = carrito.reduce((total, item) => total + item.price * item.quantity, 0);
  const [totalCompra, setTotalCompra] = useState(totalInicial);

  useEffect(() => {
  setTotalCompra(totalInicial)
  }, [carrito])
  

  const agregarItem = (item) => {
    agregarProducto([...carrito, { ...item, quantity: 1 }]);
  };


  const eliminarProducto = (item) => {
    const filtrados = carrito.filter((p) => p.id !== item.id);
    console.log(filtrados);
    agregarProducto(filtrados);

  };

  const handleQuantityChange = (newQuantity, item) => {
    const updatedItems = carrito.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    agregarProducto(updatedItems)
 
    // Actualiza el total de la compra restando el precio del artículo eliminado
    const totalPrice = updatedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalCompra(totalPrice);
  };

  const vaciarCarrito = () => {
    agregarProducto([]);

  };

  return (
    <div className={style.boxCart}>
      <div className={style.content}>
        {carrito.length ? (
          <h3>Revisa tus compras!</h3>
        ) : (
          <p>No has seleccionado productos aún</p>
        )}
        {carrito.map((item, i) => (
          <div className={style.cards} key={i}>
            <div className={style.image}>
              {item.images[0] == null ? <p>Imagen no disponible</p> :   <img src={ item.images[0]} alt="" />}
            </div>
            <div className={style.desc}>
              <h4>{item.name}</h4>
              <button onClick={() => eliminarProducto(item)}>Delete</button>
            </div>
          
            <div className={style.count}>
              <ItemCount
                stock={item.stock}
                initial={1}
                item={item}
                agregarItem={() => agregarItem(item)}
                onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity, item)}
              />
            </div>
          </div>
        ))}
        {carrito.length ? (
          <div className={style.buy}>
            <div className={style.total}>
              <span>Total: ${totalCompra}</span>
            </div>
            <div className={style.buttonsDiv}>
              <button className={style.back}>INICIAR COMPRA</button>
              <button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        ) : (
          <button className={style.back}>
            <Link className={style.link} to="/products">
              Ver productos disponibles
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}; 

export default Cart

// const Cart = ({ carrito, agregarProducto }) => {

//   const [carritoItems, setCarritoItems] = useState(carrito.map(item => ({ ...item, quantity: 1 })));
//   const totalInicial = carrito.reduce((total, item) => total + item.price * item.quantity, 0);
//   const [totalCompra, setTotalCompra] = useState(totalInicial);

//   console.log('carrito:', carrito);
//   console.log('carritoItems:' , carritoItems);


//   const agregarItem = (item) => {
//     agregarProducto([...carrito, { ...item, quantity: 1 }]);
//   };

//   const handleQuantityChange = (newQuantity, item) => {
//     const updatedItems = carrito.map((cartItem) => {
//       if (cartItem.id === item.id) {
//         return { ...cartItem, quantity: newQuantity };
//       }
//       return cartItem;
//     });
//     agregarProducto(updatedItems)
//     setCarritoItems(updatedItems);
//     // Actualiza el total de la compra restando el precio del artículo eliminado
//     const totalPrice = updatedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
//     setTotalCompra(totalPrice);
//   };

//   const eliminarProducto = (item) => {
//     const filtrados = carrito.filter((p) => p.id !== item.id);
//     console.log(filtrados);
//     agregarProducto(filtrados);
//     setCarritoItems(filtrados)
//   };

//   const vaciarCarrito = () => {
//     agregarProducto([]);
//     setCarritoItems([])
//   };

//   return (
//     <div className={style.boxCart}>
//       <div className={style.content}>
//         {carrito.length ? (
//           <h3>Revisa tus compras!</h3>
//         ) : (
//           <p>No has seleccionado productos aún</p>
//         )}
//         {carrito.map((item, i) => (
//           <div className={style.cards} key={i}>
//             <div className={style.image}>
//               {item.image == null ? <p>Imagen no disponible</p> : item.image}
//             </div>
//             <div className={style.desc}>
//               <h4>{item.name}</h4>
//               <button onClick={() => eliminarProducto(item)}>Delete</button>
//             </div>
//             <div className={style.count}>
//               <ItemCount
//                 stock={item.stock}
//                 initial={1}
//                 item={item}
//                 agregarItem={() => agregarItem(item)}
//                 onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity, item)}
//               />
//             </div>
//           </div>
//         ))}
//         {carrito.length ? (
//           <div className={style.buy}>
//             <div className={style.total}>
//               <span>Total: ${totalCompra}</span>
//             </div>
//             <div className={style.buttonsDiv}>
//               <button className={style.back}>INICIAR COMPRA</button>
//               <button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>
//                 Vaciar Carrito
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button className={style.back}>
//             <Link className={style.link} to="/products">
//               Ver productos disponibles
//             </Link>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }; 

