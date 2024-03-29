import { useState, useEffect } from 'react';
import style from "./ItemCount.module.css";


const Count =({ stock, initial, item })=>{
const [rate, setRate] = useState(0);  

useEffect(() => {
  setRate(initial);
},[]);


const addItem = () => {
rate< stock
  ?setRate(rate + 1)
  :setRate(stock)
}

const deleteItem = () => {
  rate > initial
  ?setRate(rate - 1)
  :setRate(0)
  }



return(
  <div className={style.countContainter}>
        
       <div className={style.buttons}>
       <button onClick={addItem}>+</button><p>{rate}</p><button onClick={deleteItem}>-</button>
       </div>
       <div className={style.price}><p>${item.price * rate}</p></div>
      
  </div>
)

}

export default Count;
