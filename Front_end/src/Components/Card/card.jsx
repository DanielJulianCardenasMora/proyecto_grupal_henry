import style from "./card.module.css";










export const Card = ( {Id, Nombre, Imagen, Stock, Precio, Genero, Categoria}) => {

  return (
    <div className={style.box}>
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

      </div>
    </div>
  );
}


export default Card