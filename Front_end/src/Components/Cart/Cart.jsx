import { Link } from "react-router-dom";
import style from "./Cart.module.css";










export const Cart = ( ) => {

  return (
    <div className={style.boxCart}>
    <div className={style.content}>
        <div className={style.cards}>
            <div className={style.image}></div>
            <div className={style.desc}>
              <h4>Nombre del producto</h4>
              <button>Delete</button>
            </div>
            <div className={style.count}>
             <div className={style.buttons}>
             <button>+</button><p>0</p><button>-</button>
             </div>
            </div>
            <div className={style.price}><p>$10</p></div>
        </div>
        <div className={style.cards}></div>
        <div className={style.cards}></div>
        <div className={style.cards}></div>
        <div className={style.cards}></div>
    </div>
 
    </div>
  );
}


export default Cart