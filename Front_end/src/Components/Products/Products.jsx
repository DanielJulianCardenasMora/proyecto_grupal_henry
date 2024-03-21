import style from './Products.module.css'
import imagen from '../../assets/Imagenes/Products_fondo_aplicar.png'
import { getAllProducts } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';






export const Products = () => {
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
      </div>
    </div>
  )
}

