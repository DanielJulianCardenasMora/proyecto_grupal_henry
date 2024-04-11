import style from './css/HomeAdmin.module.css'


export default function HomeAdmin(){
    return (
        <div className={style.main}>
              
<div className={style.dashCont}>
<div className={style.boxes}>
    <div className={style.box}>Aca va la cantidad de clientes</div>
    <div className={style.box}>Aca va la cantidad de ordenes </div>
    <div className={style.box}>Aca van las ganancias semanales</div>
    <div className={style.box}>Aca va un calendario decorativo</div>

</div>

<div className={style.content}>
<div className={style.principal}>Aca se van a renderizar cards con las ordenes de compra</div>
<div className={style.side}>Aca se van a renderizar los clientes/usuarios</div>
</div>
</div>
        </div>
    )
} 