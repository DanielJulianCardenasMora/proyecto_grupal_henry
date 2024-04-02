import style from './UserProfile.module.css'
import fondo from '../../assets/Imagenes/UserProfile_fondo_aplicar.png'
import lapiz from '../../assets/Imagenes/icono_lapiz.png'
import check from '../../assets/Imagenes/icono_check.png'

const UserProfile = () => {
  return (
    <div className={style.container}>
      <div>
        <img className={style.fondo} src={fondo} />
        <div className={style.iconos}>
          <div className={style.iconos_box}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserProfile