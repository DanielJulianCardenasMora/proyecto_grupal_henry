import style from './UserProfile.module.css';
import fondo from '../../assets/Imagenes/alejo3.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const URL_USUARIO_FIND = 'https://proyectogrupalhenry-production-e8a4.up.railway.app';
  const userLocalStorage = localStorage.getItem('usuario') || null;
  const [modoEdicion, setModoEdicion] = useState({ email: false, phone: false, password: false, country: false });
  const [datosUsuario, setDatosUsuario] = useState(null);

  const obtenerDatosUsuario = async () => {
    try {
      const { data } = await axios.get(`${URL_USUARIO_FIND}/admin/users-info/${userLocalStorage}`);
      setDatosUsuario(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

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

      const respuesta = await axios.put(`${URL_USUARIO_FIND}/users/${datosUsuario.email}`, datosActualizados);

      // Después de guardar, cambia el estado de modoEdicion al campo correspondiente a falso
      setModoEdicion({ ...modoEdicion, [campo]: false });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!datosUsuario) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <div className={style.container}>
      <img className={style.fondo} src={fondo} alt="Fondo" />
      <div className={style.content}>
        <h2 className={style.h2}>Edit your profile</h2>
        <div className={style.email}>
          <label htmlFor="">Email:</label>
          <span className={style.span}> {datosUsuario.email}</span>
        </div>
        <div className={style.propertyContainer}>
          <label className={style.text}>Name:</label>
          <div>
            {modoEdicion.name ? (
              <input
                type="text"
                value={datosUsuario.name}
                onChange={(e) => manejarCambioInput(e, 'name')}
              />
            ) : (
              <div>{datosUsuario.name}</div>
            )}
            <button className={style.Ub} onClick={() => manejarClicEditar('name')}>Editar</button>
            <button onClick={() => manejarClicGuardar('name')}>Guardar</button>
          </div>
        </div>

        <div className={style.propertyContainer}>
          <label className={style.text}>Phone:</label>
          <div>
            {modoEdicion.phone ? (
              <input
                type="text"
                value={datosUsuario.phone}
                onChange={(e) => manejarCambioInput(e, 'phone')}
              />
            ) : (
              <div>{datosUsuario.phone}</div>
            )}
            <button onClick={() => manejarClicEditar('phone')}>Editar</button>
            <button onClick={() => manejarClicGuardar('phone')}>Guardar</button>
          </div>
        </div>

        <div className={style.propertyContainer}>
          <label className={style.text}>Password:</label>
          <div>
            {modoEdicion.password ? (
              <input
                type="text"
                value={datosUsuario.password}
                onChange={(e) => manejarCambioInput(e, 'password')}
              />
            ) : (
              <div>{'********'}</div>
            )}
            <button onClick={() => manejarClicEditar('password')}>Editar</button>
            <button onClick={() => manejarClicGuardar('password')}>Guardar</button>
          </div>
        </div>

        <div className={style.propertyContainer}>
          <label className={style.text}>Country:</label>
          <div>
            {modoEdicion.country ? (
              <input
                type="text"
                value={datosUsuario.country}
                onChange={(e) => manejarCambioInput(e, 'country')}
              />
            ) : (
              <div>{datosUsuario.country}</div>
            )}
            <button onClick={() => manejarClicEditar('country')}>Editar</button>
            <button onClick={() => manejarClicGuardar('country')}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
