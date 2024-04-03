import React, { useState } from 'react';
import style from "./ItemCount.module.css";

const ItemCount = ({ stock, initial, item, onQuantityChange }) => {
  

  const addItem = () => {
    if (item.quantity < stock) {
      item.quantity + 1;
      onQuantityChange(item.quantity + 1);
    }
  };

  const deleteItem = () => {
    if (item.quantity > initial) {
      item.quantity - 1;
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className={style.countContainter}>
      <div className={style.buttons}>
        <button onClick={deleteItem}>-</button>
        <p>{item.quantity}</p>
        <button onClick={addItem}>+</button>
      </div>
      <div className={style.price}>
        <p>${item.price * item.quantity}</p>
      </div>
    </div>
  );
};

export default ItemCount
