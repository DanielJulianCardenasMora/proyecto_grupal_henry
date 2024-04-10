import style from './UserProfile.module.css'
import fondo from '../../assets/Imagenes/UserProfile_fondo_aplicar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'


const UserProfile = () => {
  const URL_USUARIO_FIND = 'https://proyectogrupalhenry-production-e8a4.up.railway.app'
  const userLocalStorage = localStorage.getItem('usuario')  || null
  const [modoEdicion, setModoEdicion] = useState({ email: false, phone: false, password: false, country: false });
  const [datosUsuario, setDatosUsuario] = useState(null);
  // const [datosUsuario, setDatosUsuario] = useState({ id: false, email: false, phone: false, password: false, country: false });
  

  const obtenerDatosUsuario = async () => {
    try {
      const { data } = await axios.get(`${URL_USUARIO_FIND}/admin/users-info/${userLocalStorage}`);
      setDatosUsuario(data);
    } catch (error) {
      alert(error)
    }
  }
  
  useEffect(() => {
    obtenerDatosUsuario();
    console.log(datosUsuario)
  }, [])

  const manejarClicEditar = (campo) => {
    setModoEdicion({ ...modoEdicion, [campo]: !modoEdicion[campo] });
  };

  const manejarCambioInput = (evento, campo) => {
    setDatosUsuario({ ...datosUsuario, [campo]: evento.target.value });
  };

  const manejarClicGuardar = async (campo) => {
    try {
      const datosActualizados = { ...datosUsuario };
      delete datosActualizados.modoEdicion; 
      console.log(datosUsuario)

      const respuesta = await axios.put(`${URL_USUARIO_FIND}/users/${datosUsuario.email}`, datosActualizados);

      console.log('Datos del usuario actualizados:', respuesta.data);
      setModoEdicion({ ...modoEdicion, [campo]: false });
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  }; 

  if (!datosUsuario) {
    return <div>Cargando datos del usuario...</div>;
  }



  return (
    <div className={style.container}>
      <div className={style.profilePic}></div>
      <img className={style.fondo} src={fondo} />
      <div className={style.iconos}>
        <div className={style.iconos_box}>
          <div className={style.edit1} onClick={() => manejarClicEditar('email')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('email')}></div>
        </div>
        <div className={style.iconos_box2}>
          <div className={style.edit1} onClick={() => manejarClicEditar('phone')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('phone')}></div>
        </div>
        <div className={style.iconos_box3}>
          <div className={style.edit1} onClick={() => manejarClicEditar('password')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('password')}></div>
        </div>
        <div className={style.iconos_box4}>
          <div className={style.edit1} onClick={() => manejarClicEditar('country')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('country')}></div>
        </div>
      </div>

      <div className={style.textos}>
        <div className={style.name}>
        {modoEdicion.email ? (
            <input
              type="text"
              value={datosUsuario.email}
              onChange={(e) => manejarCambioInput(e, 'email')}
            />
          ) : (
              <div>{datosUsuario.email}</div>
          )}
        </div>
        <div className={style.phone}>
        {modoEdicion.phone ? (
            <input
              type="text"
              value={datosUsuario.phone}
              onChange={(e) => manejarCambioInput(e, 'phone')}
            />
          ) : (
              <div>{datosUsuario.id}</div>
          )}
        </div>
        <div className={style.password}>
        {modoEdicion.password ? (
            <input
              type="text"
              value={datosUsuario.password}
              onChange={(e) => manejarCambioInput(e, 'password')}
            />
          ) : (
              <div>{datosUsuario.password}</div>
          )}
        </div>
        <div className={style.place}>
        {modoEdicion.country ? (
            <input
              type="text"
              value={datosUsuario.country}
              onChange={(e) => manejarCambioInput(e, 'country')}
            />
          ) : (
              <div>{datosUsuario.country}</div>
          )}
        </div>
      </div>

      <div className={style.historial}>
        <div className={style.arriba}>
          <div className={style.total}>{`$'{ }'compras en total`}</div>
        </div>
        <div className={style.abajo}>
          <div className={style.derecha}>
            <div className={style.numero}>
              <div>0</div>
              <div>1</div>
              <div>2</div>
            </div>
            <div className={style.letra}>
              <div>Shirts</div>
              <div>Pants</div>
              <div>Skirts</div>
            </div>
          </div>
          <div className={style.izquierda}>
            <div className={style.numero}>
              <div>0</div>
              <div>1</div>
              <div>2</div>
            </div>
            <div className={style.letra}>
              <div>T-shirts</div>
              <div>Coats</div>
              <div>Jackets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile