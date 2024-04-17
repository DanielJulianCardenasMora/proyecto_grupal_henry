import style from './Products.module.css'
import { getAllProducts } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import imagen from '../../assets/Imagenes/alejo3.png'





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

