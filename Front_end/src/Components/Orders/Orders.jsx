import React, { useEffect, useState } from 'react';
import style from "./Orders.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getOrderDetail } from "../../redux/actions/actions";



const Orders = () => {
  const ordersDetail= useSelector((state)=>state.orders)
  console.log(ordersDetail);

 const dispatch= useDispatch()

 useEffect(() => {
  dispatch(getOrders())

}, [])
  





  return (
    <div className={style.box}>

        {ordersDetail.map((item, i) => (
          <div>
                     <p key={i}>{item.detalle}</p>
         <p> {item.id}</p>
         <hr />
          </div>

      
        ))}
  
    </div>
  );
}; 

export default Orders