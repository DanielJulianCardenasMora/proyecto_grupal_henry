import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import ItemCount from './ItemCount';
import { useDispatch, useSelector } from 'react-redux';
import { enviarCarritoAlBackend, payment } from "../../redux/actions/actions";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import image from "../../assets/Imagenes/alejo3.png"


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
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
    getUserInfo();
    setTotalCompra(totalInicial);
  }, [carrito]);

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
    agregarProducto(updatedItems);

    const totalPrice = updatedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalCompra(totalPrice);
  };

  const vaciarCarrito = () => {
    agregarProducto([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order.userId) {
      setSnackbarSeverity('error');
      setSnackbarMessage('You must log in first. ');
      setSnackbarOpen(true);
      return;
    }

    if (!order.detalle) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill in the description field before placing the order.');
      setSnackbarOpen(true);
      return;
    }

    if (order.products.length === 0) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please add at least one product before placing the order.');
      setSnackbarOpen(true);
      return;
    }

    try {
      dispatch(payment(totalCompra));
      setOrder({
        ...order,
        detalle: order.comments
      });
      await dispatch(enviarCarritoAlBackend(order));
      agregarProducto([]);
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error creating order');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={style.boxCart}>
      <div className={style.content}>
        {carrito.length ? (
          <h3>Check your shopping</h3>
        ) : (
          <p>You haven't selected any products yet</p>
        )}
        {carrito.map((item, i) => (
          <div className={style.cards} key={i}>
            <div className={style.image}>
              {item.images[0] == null ? (
                <p>Image not available</p>
              ) : (
                <img src={item.images[0]} alt="" />
              )}
            </div>
            <div className={style.desc}>
              <h4>{item.name}</h4>
              <span>Size: {item.size}</span>
              <button
                className={style.dbtn}
                onClick={() => eliminarProducto(item)}
              >
                Delete
              </button>
            </div>

            <div className={style.count}>
              <ItemCount
                stock={item.stock}
                initial={1}
                item={item}
                agregarItem={() => agregarItem(item)}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(newQuantity, item)
                }
              />
            </div>
          </div>
        ))}

        {carrito.length ? (
          <div className={style.buy}>
            <div className={style.comments}>
              <label>Comments:</label>
              <textarea
                type="text"
                value={order.comments}
                onChange={onChange}
              />
            </div>
            <div className={style.total}>
              <span>Total: ${totalCompra}</span>
            </div>

            <form
              className={style.buttonsDiv}
              onSubmit={(e) => handleSubmit(e)}
            >
              <button className={style.back} type="submit">
                START SHOPPING
              </button>
              <button
                className={style.vaciar}
                type="button"
                onClick={() => vaciarCarrito(carrito)}
              >
                Empty cart
              </button>
            </form>
          </div>
        ) : (
          <div className={style.void}>
            <button className={style.back}>
              <Link className={style.link} to="/products">
                Check available products
              </Link>
            </button>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
<img className={style.background} src={image}></img>
    </div>
  );
};

export default Cart;
