import style from './Products.module.css'
import imagen from '../../assets/Imagenes/Products_fondo_aplicar.png'
import derecha from '../../assets/Imagenes/Products_flechaDer_aplicar.png'
import izquierda from '../../assets/Imagenes/Products_flechaIzq_aplicar.png'
import { getAllProducts } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';






export const Products = () => {
  const gamesDB = useSelector((state) => state.gamesCreated)
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])
  const dispatch = useDispatch()


  



  return (
    <div className={style.container}>
      <div className={style.bg}>
        <div className={style.imagen}>
          <img className={style.imagen} src={imagen} />
        </div>
        {/* <div className={style.btnNav}>
          <img src={izquierda} />
          <img src={derecha} />
        </div> */}
      </div>
    </div>
  )
}

