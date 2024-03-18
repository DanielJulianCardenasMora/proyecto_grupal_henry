import React from 'react'
import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo_aplicar.png'




function Detail() {



  return (
    <div className={style.container}>

      <h1 className={style.texto1}>wer</h1>
      <h1 className={style.texto2}>werwer</h1>
      <h1 className={style.texto3}>erter</h1>

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
        <button>hola</button>
      </div>



    </div>


  )
}

export default Detail