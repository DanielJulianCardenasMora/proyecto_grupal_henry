import style from "./menu.module.css";

function Menu() {
  return (
    <div className={style.container}>
      <div className={style.columnas}>
        <div className={style.columna1}>
          <h1>Man</h1>
          <h1>Women</h1>
          <h1>Unisex</h1>
        </div>
        <div className={style.columna2}>
          h1
        </div>
        <div className={style.columna3}></div>
      </div>
    </div>
  )
}

export default Menu