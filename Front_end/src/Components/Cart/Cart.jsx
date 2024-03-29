import { Link } from "react-router-dom";
import style from "./Cart.module.css";










export const Cart = ({carrito, agregarProducto} ) => {
const eliminarProducto=(item)=>{

const filtrados= carrito.filter((p)=> {return p.id !== item.id})
console.log(filtrados)

agregarProducto(filtrados)

}
  const vaciarCarrito  = () => {
    agregarProducto([])
}
console.log(carrito);

  return (
    <div className={style.boxCart}>
    
    <div className={style.content}>
   { carrito.length 
   ?  <h3>Revisa tus compras!</h3>
   : <p>No has seleccionado productos aún</p>
   }
  {carrito.map((item, i)=>{
 return (    <div className={style.cards} key={i}>
  <div className={style.image}>{item.image == null ? <p>Imagen no disponible</p>:item.image }</div>
      <div className={style.desc}>
        <h4>{item.name}</h4>
        <button onClick={()=> {eliminarProducto(item)}}>Delete</button>
      </div>
      <div className={style.count}>
       <div className={style.buttons}>
       <button>+</button><p>0</p><button>-</button>
       </div>
      </div>
      <div className={style.price}><p>{item.price}</p></div>
  </div>)
  })}

{ carrito.length 
   ?     <button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>Vaciar Carrito</button>
   : <button className={style.back}><Link className={style.link} to='/products'>Ver productos disponibles</Link> </button>
   }

    </div>
 
    </div>
  );
}


export default Cart