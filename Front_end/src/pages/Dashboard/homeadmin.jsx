import style from './css/HomeAdmin.module.css'
import { getUsers } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function HomeAdmin(){

    const dispatch=useDispatch()
    const users= useSelector((s)=>s.users)
    
    let mailUsers= users.map(u=> u.email)

    useEffect(() => {
  dispatch(getUsers())     
          }, [])


    return (
        <div className={style.main}>
              
<div className={style.dashCont}>
<div className={style.boxes}>
    <div className={style.box}>
        <p>Clientes activos:</p>
<h1> {users.length}</h1>
    </div>
    <div className={style.box}>Aca va la cantidad de ordenes </div>
    <div className={style.box}>Aca van las ganancias semanales</div>
    <div className={style.box}>Aca va un calendario decorativo</div>

</div>

<div className={style.content}>
<div className={style.principal}>Aca se van a renderizar cards con las ordenes de compra</div>
<div className={style.side}>
    <h4>Recent clients</h4>
    {users.map((u, i) => (
          <div>
         <p> {u.email}</p>
         <hr />
          </div>

      
        ))}
</div>
</div>
</div>
        </div>
    )
} 