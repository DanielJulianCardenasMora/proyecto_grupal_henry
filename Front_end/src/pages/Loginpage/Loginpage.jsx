import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LoginPage, { Logo, Password, Footer, Title, Button } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';
import { RegisterDialog } from '../../Components';
import config from '../../../config';



function Login ({setUsuario, usuario}) {

  const { deployedBackendURL, localBackendURL } = config;
  const URL = deployedBackendURL || localBackendURL;

  const { loginWithRedirect, logout, isLoading, user, isAuthenticated } =
    useAuth0();


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const [showRegisterDialog, setShowRegisterDialog] = useState(false); // Estado para controlar la visibilidad del diálogo

  const handleClose = () => {
    setShowRegisterDialog(false)
  }

  const handleOpen = () => {
    setShowRegisterDialog(true)
  }


  const onClick = async () => {
    console.log(credentials.email, credentials.password)
    if (!credentials.email || !credentials.password) {
      alert("Tienes campos incompletos");
      return;
    }

    const login = {
      email: credentials.email,
      password: credentials.password
    }

    try {
      const {data} = await axios.post(`${URL}users/api/login`, login)

      if (data.status == 'ok') {

        navigate("/"); 
        setTimeout(() => {
          alert("Login")
        }, 1000);
        }

    } catch (error) {
      alert("Email o contraseña incorrectos");
      setCredentials({
        email: "",
        password: ""
      })
    }
  }


  const handleChangeEmail = (evento) => {
    const valor = evento.target.value;
    setCredentials({ ...credentials, email: valor });
  };

  const handleChangePassword = (evento) => {
    const valor = evento.target.value;
    setCredentials({ ...credentials, password: valor });
  };

  const handleRegisterClick = () => {
    setShowRegisterDialog(true);
  };

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  return (
    <div className={styles.div}>
      <LoginPage style={{ height: 480 }}>
        <Title>¿Ya tienes cuenta en WearFashion? Inicia sesion</Title>

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
          visible={true}
        />
        <Submit onClick={() => onClick()}>Login</Submit>

        {isAuthenticated ? (
          <>
          <br></br>
          <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <>
            <br></br>
            <button onClick={() => loginWithRedirect()}>
              Login with Google
            </button>
          </>
        )}

        <Footer>
          ¿Do yo want to register?
          <button onClick={handleRegisterClick}>Register</button>
        </Footer>

        {showRegisterDialog && <RegisterDialog handleOpen={handleOpen} isAuthenticated={isAuthenticated} handleClose={handleClose}/>}
      </LoginPage>
    </div>
  );
}

export default Login;
