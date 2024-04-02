import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import ItemCount from './ItemCount'



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
<ItemCount stock={item.stock} initial={1} item={item}/>
</div>
     
  </div>)
  })}

{ carrito.length 
   ?  <div className={style.buy}> <button  className={style.back}>Continuar con la compra</button><button className={style.vaciar} type="button" onClick={() => vaciarCarrito(carrito)}>Vaciar Carrito</button></div>
   : <button className={style.back}><Link className={style.link} to='/products'>Ver productos disponibles</Link> </button>
   }

    </div>
 
    </div>
  );
}


export default Cart