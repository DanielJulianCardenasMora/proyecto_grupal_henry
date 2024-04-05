import style from './UserProfile.module.css'
import fondo from '../../assets/Imagenes/UserProfile_fondo_aplicar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'


const UserProfile = () => {
  const URL_USUARIO_EDIT = 'http://localhost:3001/users/'
  const URL_USUARIO_FIND = 'http://localhost:3001/users/'
  const userLocalStorage = 'mail@mail'
  const ID_USER = 'c9d5ab10-7182-4d5d-b16e-4a8aebd31df4'
  const [modoEdicion, setModoEdicion] = useState({ name: false, phone: false, contraseña: false, lugar: false });
  // const [datosUsuario, setDatosUsuario] = useState(null);
  // se usa el estado comentado, este es para iniciar prueba.
  const [datosUsuario, setDatosUsuario] = useState({ name: false, phone: false, password: false, city: false });
  

  const obtenerDatosUsuario = async () => {
    try {
      const { data } = await axios.get(`${URL_USUARIO_FIND}${userLocalStorage}`);
      setDatosUsuario(data);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    obtenerDatosUsuario();
  }, [])

  const editarUsuario = async () => {
    try {
      const { data } = await axios.put(`${URL_USUARIO_EDIT}${ID_USER}, {...datosUsuario}`);
      setDatosUsuario(data);
    } catch (error) {
      alert(error)
    }
  }



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

      const respuesta = await axios.put(`${URL_USUARIO_EDIT}${ID_USER}`, datosActualizados);

      console.log('Datos del usuario actualizados:', respuesta.data);
      setModoEdicion({ ...modoEdicion, [campo]: false });
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  }; 

  // if (!datosUsuario) {
  //   return <div>Cargando datos del usuario...</div>;
  // }



  return (
    <div className={style.container}>
      <div className={style.profilePic}></div>
      <img className={style.fondo} src={fondo} />
      <div className={style.iconos}>
        <div className={style.iconos_box}>
          <div className={style.edit1} onClick={() => manejarClicEditar('name')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('name')}></div>
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
          <div className={style.edit1} onClick={() => manejarClicEditar('city')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('city')}></div>
        </div>
      </div>

      <div className={style.textos}>
        <div className={style.name}>
        {modoEdicion.name ? (
            <input
              type="text"
              value={datosUsuario.name}
              onChange={(e) => manejarCambioInput(e, 'name')}
            />
          ) : (
              <div>{datosUsuario.name}</div>
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
        {modoEdicion.city ? (
            <input
              type="text"
              value={datosUsuario.city}
              onChange={(e) => manejarCambioInput(e, 'city')}
            />
          ) : (
              <div>{datosUsuario.city}</div>
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