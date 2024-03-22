import React from 'react'
import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo_aplicar.png'
import boton from '../../assets/Imagenes/Boton_seguirViendo.png'
import hover from '../../assets/Imagenes/Boton_seguirViendo_hover.png'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { getProductDetail } from '../../redux/actions/actions'

function Detail() {
  const dispatch = useDispatch()
  const {id} = useParams()

  //Caracteristicas del producto con el ID correspondiente
  const {description, name, image, price, stock, genero} = useSelector((state) => state.Detail)


  useEffect(() => {
    dispatch(getProductDetail(id))
  }, [id])

  return (
    <div className={style.container}>

      <h1 className={style.texto2}>DETALLE</h1>
      <h1 className={style.texto3}>TIENDA</h1>
      <h1 className={style.texto4}>EN</h1>
      <div className={style.texto5_cont}>
        <h1 className={style.texto5}>C</h1>
        <h1 className={style.texto5}>O</h1>
        <h1 className={style.texto5}>L</h1>
        <h1 className={style.texto5}>E</h1>
        <h1 className={style.texto5}>C</h1>
        <h1 className={style.texto5}>C</h1>
        <h1 className={style.texto5}>I</h1>
        <h1 className={style.texto5}>O</h1>
        <h1 className={style.texto5}>N</h1>
      </div>


      <div className={style.box_fondo}>
        <img className={style.fondo} src={fondo} />
      </div>

      <div className={style.producto}>
        <img src={image} alt="" />  
      </div>

      <div className={style.box2}>
        <div className={style.difuminado2}>{description}</div>
      </div>
      

      <div className={style.box_derecha}>
        <h1 className={style.name}>{name}</h1>
        <div className={style.boxDetalle}>
          <h1 className={style.detalle1}>Categoria</h1>
          <h1 className={style.detalle2}>{genero}</h1>
          <h1 className={style.detalle3}>${price}</h1>
        </div>
        <div className={style.boton}>
          {/* <img className={style.boton1} src={hover} /> */}
          <img className={style.boton2} src={boton} />
        </div>
        
      </div>



    </div>


  )
}

export default Detail