import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import styles from './loginpage.module.css';
function Login () {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()


    const onClick = () => {
        // Verificar credenciales aquí

        if(credentials.email && credentials.password){
            navigate("/landing");
        }else{
            alert("Debes ingresar un Email y Contraseña Valido")
        }
    }

    const handleChangeEmail = (evento) => {
        const valor = evento.target.value
        setCredentials({...credentials, email: valor} )
    }

    const handleChangePassword = (evento) => {
        const valor = evento.target.value
        setCredentials({...credentials, password: valor })
    }

    return (
      <div className={styles.div}>
        <LoginPage style={{ height: 480 }}>

          <Logo>
            <LoginLogo />
          </Logo>

          <Input
            name="email"
            index={1}
            placeholder="Email"
            value={credentials.email}
            onChange={handleChangeEmail}
          />

          <Password name='password' onChange={handleChangePassword} value={credentials.password} />

          <Submit onClick={onClick}>Login</Submit>

          <Footer>
            Not a member? <a href="#">Sign up now</a>
          </Footer>

        </LoginPage>
      </div>
    );
} 

export default Login;
