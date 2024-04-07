import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import  ItemCount  from './ItemCount';
import { useDispatch, useSelector } from 'react-redux';
import { enviarCarritoAlBackend, getOrders, getOrderDetail } from "../../redux/actions/actions";



const Cart = ({ carrito, agregarProducto }) => {
  const dispatch = useDispatch();
  const userId='da0503b5-0b65-4ba9-ac9e-bef59a30eeff'
  const totalInicial = carrito.reduce((total, item) => total + item.price * item.quantity, 0);
  const [totalCompra, setTotalCompra] = useState(totalInicial);



const [order, setOrder]= useState({
  userId: userId,
  products: carrito.map(item => ({
    productId: item.id,
    quantity: item.quantity
  })),
  detalle: "Este es un nuevo detalle de compra"
})

  console.log(order);


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


  const handleSubmit = (e) => {

    dispatch(enviarCarritoAlBackend(order));
    setOrder({})
 alert('Orden de compra creada')
     agregarProducto([])
   };

   useEffect(() => {
    dispatch(getOrders())
    dispatch(getOrderDetail())
      setTotalCompra(totalInicial)
      setOrder({
        userId: userId,
        products: carrito.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        detalle: "Este es un nuevo detalle de compra"
      })
      }, [carrito])

  return (
    <div className={style.boxCart}>
      <div className={style.content} >
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
            <form className={style.buttonsDiv} onSubmit={e=>handleSubmit(e)}  >
              <button className={style.back} type='submit'>INICIAR COMPRA</button>
              <button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>
                Vaciar Carrito
              </button>
            </form>
          </div>
        ) : (
    <div>          <button className={style.back}>
    <Link className={style.link} to="/products">
      Ver productos disponibles
    </Link>
  </button>
  <button className={style.orders}>
  <Link className={style.link} to="/orders">
      Ver ordenes de compra
    </Link>
  </button></div>
        )}
      </div>
    </div>
  );
}; 

export default Cart


