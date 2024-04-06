import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LoginPage, { Logo, Password, Footer, Title, Button } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';
import { RegisterDialog } from '../../Components';




function Login ({setUsuario, usuario}) {

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
      const {data} = await axios.post(`https://proyectogrupalhenry-production-e8a4.up.railway.app/users/api/login`, login)
      if (data.status == 'ok') {
          navigate("/") 
        }

    } catch (error) {
      alert("Error al conectar con el servicio de autenticación." + error);
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
    // Mostrar el diálogo de registro al hacer clic en el enlace
    console.log(showRegisterDialog)
    setShowRegisterDialog(true);
  };

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

        {user ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <button onClick={() => loginWithRedirect()}>
            Registrarme con Google
          </button>
        )}

        <Button>Logout</Button>
        <Footer>
          ¿Quieres registrarte?
          <button onClick={handleRegisterClick}>Registrarme</button>
        </Footer>

        {showRegisterDialog && (
          <RegisterDialog
            handleClose={handleClose}
          />
        )}
      </LoginPage>
    </div>
  );
}

export default Login;
