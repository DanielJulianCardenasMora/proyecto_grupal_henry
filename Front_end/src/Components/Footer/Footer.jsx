import style from './Footer.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp, faEnvelope, faFile, faLocationDot, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';



function Footer() {



    return (

        <footer className={style.footer} >

            <div className={style.ubi}>
                <h2>Location</h2>
                <p><FontAwesomeIcon  className={style.stylosIcons}icon={faLocationDot} />Argentina</p>

                <li><Link className={style.liLinks} to="/products">Products</Link></li>
                <li><Link className={style.liLinks} to="/about">About</Link></li>
                <li><Link className={style.liLinks} to="/myprofile">My Profile</Link></li>
                <li><Link className={style.liLinks} to="/login">Log In</Link></li>
            </div>
            <div className={style.list}>
                <h3>Networks</h3>
                <ul className={style.redes}>
                    <li>
                        <a target="_blank" href="#" ><FontAwesomeIcon className={style.stylosIcons} icon={faFacebook} />Facebook</a>
                    </li>
                    <li>
                        <a target="_blank" href="#" ><FontAwesomeIcon icon={faInstagram} className={style.stylosIcons} />Instagram</a>
                    </li>
                    <li>
                        <a target="_blank" href="#" ><FontAwesomeIcon className={style.stylosIcons} icon={faEnvelope} />Gmail</a>
                    </li>
                </ul>
            </div>


        </footer>






    )
}

export default Footer