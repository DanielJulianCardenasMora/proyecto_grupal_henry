import { Link } from "react-router-dom";
import style from "./card.module.css";



export const Card = ( {Id, Nombre, Imagen, Stock, Precio, Genero, Categoria}) => {
  return (
    <div className={style.box}>
      <Link to={`/detail/${Id}`}>
      
      <div className={style.container}>
        <div className={style.imgRow}>
          <div className={style.imgContainer}>
            <img className='imgCard'src={Imagen} alt='image' />
          </div>
        </div>
          
        <div className={style.texto}>
          <div className={style.nombre}>
            <h1>{Nombre}</h1>
          </div>
        </div>
          

        <div className={style.texto2}>
          <div className={style.precio}>
            <h1>{`$${Precio}`}</h1>
          </div>
        </div>

        {/* <div className={style.texto3}>
          <div className={style.comprar}>
            <h1>COMPRAR</h1>
          </div>
        </div> */}

      </div>
      </Link>
    </div>
  );
}


export default Card