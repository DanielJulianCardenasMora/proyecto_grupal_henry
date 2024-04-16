import React, { useEffect, useState } from 'react';
import { Link, resolvePath } from "react-router-dom";
import style from "./Cart.module.css";
import ItemCount from './ItemCount';
import { useDispatch, useSelector } from 'react-redux';
import { enviarCarritoAlBackend, getOrders, payment } from "../../redux/actions/actions";
import axios from "axios"

const Cart = ({ carrito, agregarProducto }) => {
  const dispatch = useDispatch();

  const totalInicial = carrito.reduce((total, item) => total + item.price * item.quantity, 0);
  const [totalCompra, setTotalCompra] = useState(totalInicial);
  const [order, setOrder] = useState({
    userId: '',
    email: '',
    nameUser: '',
    products: carrito.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      size: item.size
    })),
    detalle: ''
  })



  const onChange = (e) => {
    setOrder({ ...order, detalle: e.target.value });
  };

  async function getUserInfo() {
    try {

      const userInfo = localStorage.getItem('usuario')
      const url = `https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/users-info/${userInfo}`;
      const response = (await axios.get(url)).data

      setOrder(prevOrder => ({
        ...prevOrder,
        userId: response.id,
        email: response.email,
        nameUser: response.name,
        products: carrito.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          size: item.size
        })),

      }))


    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  }




  useEffect(() => {
    getUserInfo()
    setTotalCompra(totalInicial)
  }, [carrito])



  const agregarItem = (item) => {
    agregarProducto([...carrito, { ...item, quantity: 1 }]);
  };


  const eliminarProducto = (item) => {
    const filtrados = carrito.filter((p) => !(p.id === item.id && p.size === item.size));
    agregarProducto(filtrados);
  };


  const handleQuantityChange = (newQuantity, item) => {
    const updatedItems = carrito.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.size === item.size) {
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




  const handleSubmit = async (e) => {
    dispatch(payment(totalCompra))
    setOrder({
      ...order,
      detalle: order.comments

    })
    dispatch(enviarCarritoAlBackend(order));
    agregarProducto([])
  };




  return (
    <div className={style.boxCart}>
      <div className={style.content} >
        {carrito.length ? (
          <h3>Check your shopping</h3>
        ) : (
          <p>You haven't selected any products yet</p>
        )}
        {carrito.map((item, i) => (
          <div className={style.cards} key={i}>
            <div className={style.image}>
              {item.images[0] == null ? <p>Imagen no disponible</p> : <img src={item.images[0]} alt="" />}
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
            <div className={style.comments}>
              <label >Comments:</label>
              <textarea type="text" value={order.comments} onChange={onChange} />
            </div>
            <div className={style.total}>
              <span>Total: ${totalCompra}</span>
            </div>

            <form className={style.buttonsDiv} onSubmit={e => handleSubmit(e)}  >

              <button className={style.back} type='submit'>START SHOPING</button>
              <button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>
                Empty cart
              </button>
            </form>
          </div>
        ) : (
          <div>          <button className={style.back}>
            <Link className={style.link} to="/products">
              Check available products
            </Link>
          </button>
            <button className={style.orders}>
              <Link className={style.link} to="/orders">
                Check the bill
              </Link>
            </button></div>
        )}
      </div>
    </div>
  );
};

export default Cart




