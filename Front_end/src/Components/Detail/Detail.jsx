import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo_aplicar.png'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getProductDetail } from '../../redux/actions/actions'
import shape from '../../assets/Imagenes/Detail_shape_aplicar.png'

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate();
  const [buttonClass, setButtonClass] = useState(true);
  const {description, name, images, price, stock, genero} = useSelector((state) => state.Detail)

  useEffect(() => {
    dispatch(getProductDetail(id))
  }, [id])

  const handleMouseEnter = () => {
    setButtonClass(!buttonClass);
  };

  const handleMouseLeave = () => {
    setButtonClass('default');
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className={style.container}>

      <h1 className={style.texto2}>DETAIL</h1>
      <h1 className={style.texto3}>STORE</h1>
      <h1 className={style.texto4}>IN</h1>

      <div className={style.box_fondo}>
        <img className={style.fondo} src={fondo} />
      </div>

      <div className={style.producto}>
        <img src={images} alt="" />  
        <div className={style.shape}>
          <img className={style.shape} src={shape} alt="" />  
        </div>
        <div className={style.texto5_cont}>
          <h1 className={style.texto5}>C</h1>
          <h1 className={style.texto5}>O</h1>
          <h1 className={style.texto5}>L</h1>
          <h1 className={style.texto5}>E</h1>
          <h1 className={style.texto5}>C</h1>
          <h1 className={style.texto5}>T</h1>
          <h1 className={style.texto5}>I</h1>
          <h1 className={style.texto5}>O</h1>
          <h1 className={style.texto5}>N</h1>
        </div>
      </div>


      <div className={style.box2}>
        <div className={style.difuminado2}>{description}</div>
      </div>

      <div className={style.box_derecha}>
        <h1 className={style.name}>{name}</h1>
        <div className={style.boxDetalle}>
          <h1 className={style.detalle1}>Category</h1>
          <h1 className={style.detalle2}>{genero}</h1>
          <h1 className={style.detalle3}>${price}</h1>
        </div>
        
        <div className={style.boton}>
          <div className={buttonClass ? style.boton_img : style.boton_img_hover }></div>
          <div className={style.action} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleBackClick}></div>
        </div>
      </div>
    </div>
  )
}

export default Detail