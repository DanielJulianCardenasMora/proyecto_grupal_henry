import React, { useState } from 'react';
import style from "./ItemCount.module.css";

const ItemCount = ({ stock, initial, item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initial);

  const addItem = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      onQuantityChange(quantity + 1);
    }
  };

  const deleteItem = () => {
    if (quantity > initial) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className={style.countContainter}>
      <div className={style.buttons}>
        <button onClick={deleteItem}>-</button>
        <p>{quantity}</p>
        <button onClick={addItem}>+</button>
      </div>
      <div className={style.price}>
        <p>${item.price * quantity}</p>
      </div>
    </div>
  );
};

export default ItemCount
