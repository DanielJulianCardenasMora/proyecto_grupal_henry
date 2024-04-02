import style from './UserProfile.module.css'
import fondo from '../../assets/Imagenes/UserProfile_fondo_aplicar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'


const UserProfile = () => {
  const URL_USUARIO = 'http://localhost:3001/findone/'
  const userLocalStorage = 'user'
  const [modoEdicion, setModoEdicion] = useState({ name: false, email: false, contraseña: false, lugar: false });
  // const [datosUsuario, setDatosUsuario] = useState(null);
  // se usa el estado comentado, este es para iniciar prueba.
  const [datosUsuario, setDatosUsuario] = useState({ name: false, email: false, contraseña: false, lugar: false });

  // useEffect( async () => {
  //   // peticion de findOne
  //   const obtenerDatosUsuario = async () => {
  //     try {
  //       const { data } = await axios.get(`${URL_USUARIO}${userLocalStorage}`);
  //       setDatosUsuario(data);
  //     } catch (error) {
  //       alert(error)
  //     }
  //   }
  //   obtenerDatosUsuario();
  // }, [])

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

      const respuesta = await axios.post('/api/actualizar-usuario', datosActualizados);

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
          <div className={style.edit1} onClick={() => manejarClicEditar('email')}></div>
          <div className={style.save1} onClick={() => manejarClicGuardar('email')}></div>
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
        <div className={style.name}>Primer nombre primer apellido
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
        <div className={style.email}>email
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
        <div className={style.password}>password
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
        <div className={style.place}>place
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