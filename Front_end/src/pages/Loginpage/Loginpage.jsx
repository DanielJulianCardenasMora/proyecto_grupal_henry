import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer, Title, Button } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';
import { useEffect } from 'react';
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

    if (!credentials.email || !credentials.password) {
      alert("Tienes campos incompletos");
      return;
    }

    try {
      const response = await fetch("https://proyectogrupalhenry-production-e8a4.up.railway.app/users/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email, 
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:");
        navigate("/"); // o la ruta que corresponda
      } else {
        alert("Error al iniciar sesión: " + data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servicio de autenticación.");

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

        {isAuthenticated ? (
          <>
            <RegisterDialog />
          </>
        ) : (
          <>
            <br></br>
            <button onClick={() => loginWithRedirect()}>
              Registrarme con Google
            </button>
          </>
        )}

        {isAuthenticated ? (
         <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <>
            <br></br>
            <button onClick={() => loginWithRedirect()}>
              Registrarme con Google
            </button>
          </>
        )}
        <Button>Logout</Button>
        <Footer>
          ¿Quieres registrarte?
          {/* Manejar la visibilidad del diálogo al hacer clic en el enlace */}
          <a onClick={handleRegisterClick}>Registrarme</a>
        </Footer>

        {/* Mostrar el diálogo cuando showRegisterDialog es true */}
        {showRegisterDialog && <RegisterDialog isAuthenticated={isAuthenticated} handleClose={handleClose}/>}
      </LoginPage>
    </div>
  );
}

export default Login;
