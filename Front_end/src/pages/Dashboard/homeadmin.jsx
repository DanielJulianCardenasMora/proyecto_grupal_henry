import style from './css/HomeAdmin.module.css'
import { getUsers, getOrders } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';



export default function HomeAdmin(){
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const users= useSelector((s)=>s.users)
  const orders = useSelector((s)=>s.orders)
  const actualUser= localStorage.getItem('usuario')

  const [email, setEmail] = useState({
    user: "",
    mensaje: "",
    titulo: ""
  })

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    setEmail({ ...email, user: e.target.value });
  };

  useEffect(() => {
  const rol = localStorage.getItem("role")
  if(rol === 'user' || rol === null){
      navigate("/")
  }
  dispatch(getOrders())
    dispatch(getUsers());
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();


    try {
      const data = await axios.post('https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/send-email', email)
      if(data.status === 200){
        setEmail({
          user: "",
          mensaje: "",
          titulo: ""
        })
      }
      setSnackbarSeverity("success");
      setSnackbarMessage('Correo enviado con exito')
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error)
      setSnackbarSeverity("error");
      setSnackbarMessage('Error al enviar el correo')
      setSnackbarOpen(true);
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
            <div className={style.box}>
              <p>Ordenes de comra:</p>
              <h1>{orders.length}</h1>
               </div>
          
            <div className={style.box}>
           <p>Usiario actual:</p>
           <h3>{actualUser}</h3>

            </div>
          </div>

          <div className={style.content}>
            <div className={style.principal}>
              <p>Enviar mensaje a usuarios</p>

              <form onSubmit={onSubmit}>


                <div className={style.formContent}>
                <label>Titutlo: </label>
                <input type="text" name="titulo" value={email.titulo} onChange={onChange} />
                </div>
                <div className={style.formContent}>
                <label>Para: </label>
                <select >
                  <option value="all">Select user</option>
                  {users.map((user, index) => (
                    <option key={index} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
                </div>
                <div className={style.formArea}>
                <label>Mensaje: </label>
                <textarea type="text" name="mensaje" value={email.mensaje} onChange={onChange} />

                </div>




    

              
              <button className={style.emailB} type='submit'>Enviar correo</button>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    );
} 