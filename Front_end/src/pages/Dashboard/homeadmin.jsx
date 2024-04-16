import style from './css/HomeAdmin.module.css'
import { getUsers } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function HomeAdmin(){
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const users= useSelector((s)=>s.users)
    const [email, setEmail] = useState({
      user: "",
      mensaje: "",
      titulo: ""
    })

    const onChange = (e) => {
      setEmail({ ...email, [e.target.name]: e.target.value });
    };


    let mailUsers= users.map(u=> u.email)

    useEffect(() => {
    const rol = localStorage.getItem("role")
    if(rol === 'user' || rol === null){
        navigate("/")
    }
      dispatch(getUsers());
    }, []);


    const onSubmit = async (e) => {
      e.preventDefault();

      try {
        const data = await axios.post('https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/send-email', email)
        console.log("enviado", data)
      } catch (error) {
        console.log(error)
      }

    }
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
            <div className={style.principal}>

              <h3>
                Enviar mensaje a usuarios
              </h3>

              <form onSubmit={onSubmit}>
                <label>Titutlo: </label>
                <input type="text" name="titulo" value={email.titulo} onChange={onChange} />


                <label>Mensaje: </label>
                <input type="text" name="mensaje" value={email.mensaje} onChange={onChange} />


                <label>Email: </label>
                <input type="text" name="user" value={email.user} onChange={onChange} />
              
              <button type='submit'>Enviar correo</button>
              </form>
            </div>
            <div className={style.side}>
              <h4>Recent clients</h4>
              {users.map((u, i) => (
                <div key={u.id}>
                  <p> {u.email}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
} 