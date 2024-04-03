import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import {GoogleLogin} from 'react-google-login';
import  {  GoogleLogout  }  from  'react-google-login' ; 
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


    const responseGoogle = (response) => {
      console.log(response)
    }

    const logout = (response) => {
      console.log(response)
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
          <Password
            name="password"
            onChange={handleChangePassword}
            value={credentials.password}
          />
          <Submit onClick={onClick}>Login</Submit>
          <Footer>
            Not a member? <a href="#">Sign up now</a>
          </Footer>

          <GoogleLogin
            clientId="176152433694-bc1rlakjm6s73r0fg0cct7tbgg2esgfm.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
      <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>

        </LoginPage>
      </div>
    );
} 

export default Login;
