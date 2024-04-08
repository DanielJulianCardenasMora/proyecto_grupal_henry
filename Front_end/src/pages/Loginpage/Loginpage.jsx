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
      alert("You have uncompleted fields");
      return;
    }

    const login = {
      email: credentials.email,
      password: credentials.password
    }

    try {
      const {data} = await axios.post(`https://proyectogrupalhenry-production-e8a4.up.railway.app/users/api/login`, login)

      if (data.status == 'ok') {

        const loginDone = {
          email: login.email
        }
        
        alert("Login successful")
        navigate("/") 
        }

    } catch (error) {
      alert("Email or password are invalid");
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
        <Title>Do you have an account at WearFashion already? Log in!</Title>

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
              Register with Google
            </button>
          </>
        )}

        {isAuthenticated ? (
         <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <>
            <br></br>
            <button onClick={() => loginWithRedirect()}>
              Register with Google
            </button>
          </>
        )}
        <Button>Logout</Button>
        <Footer>
          Do you want to register?
          {/* Manejar la visibilidad del diálogo al hacer clic en el enlace */}
          <a onClick={handleRegisterClick}>Register</a>
        </Footer>

        {/* Mostrar el diálogo cuando showRegisterDialog es true */}
        {showRegisterDialog && <RegisterDialog isAuthenticated={isAuthenticated} handleClose={handleClose}/>}
      </LoginPage>
    </div>
  );
}

export default Login;
