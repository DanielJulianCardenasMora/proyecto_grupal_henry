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

        <div className={style.qq}>
          <div className={style.ee}>
            <h1>{Nombre}</h1>
          </div>
        </div>


        {/* <div className={style.cardcontainer}>
          <div className={style.card}> */}

        {/*           
            {products.map(product => (
              <div key={product.id}>
                <p>Id: {product.id}</p>
                <p>Nombre: {product.name}</p> 
                <p>Imagen: {product.image}</p>
                <p>Stock: {product.stock}</p>
                <p>Precio: {product.price}</p>
                <p>Género: {product.genero}</p>
                <p>Categoría: {product.category}</p>
              </div>
            ))} */}

            
          {/* </div>
        </div> */}
      </div>

      </div>
  );
}


export default Card