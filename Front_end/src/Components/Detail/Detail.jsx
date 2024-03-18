import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo_aplicar.png'
import boton from '../../assets/Imagenes/Boton_seguirViendo.png'
import hover from '../../assets/Imagenes/Boton_seguirViendo_hover.png'




function Detail() {



  return (
    <div className={style.container}>

      <h1 className={style.texto1}>Fecha de lanzamiento:</h1>
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
        <img src="" alt="" />  
      </div>

      <div className={style.box2}>
        <div className={style.difuminado2}>asd</div>
      </div>
      

      <div className={style.box_derecha}>
        <div className={style.boton}>
          {/* <img className={style.boton1} src={hover} /> */}
          <img className={style.boton2} src={boton} />
        </div>
        
      </div>



    </div>


  )
}

export default Detail