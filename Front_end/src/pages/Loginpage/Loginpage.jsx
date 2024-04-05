import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer, Title } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';
import { useEffect } from 'react';
import { validateEmail, validatePassword, Register } from './validaciones';
import { RegisterDialog } from '../../Components';


function Login () {
  const { loginWithRedirect, logout, isLoading, user, isAuthenticated } =
    useAuth0();

  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onClick = () => {
    // Verificar credenciales aquí
    const email = validateEmail(credentials)
    const password = validatePassword(credentials)

    if(!email){
      alert("El email que ingreso no esta registrado")
    }else if(!password){
      alert("Contraseña incorrecta")
    }else{
      alert("Login exitoso")
      navigate("/");
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

  useEffect(()  => {
    console.log(user)
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
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>Nombre: {user.name}</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => logout({ returnTo: "/" })}>
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            <br></br>
            <button onClick={() => loginWithRedirect()}>
              Registrarme con Google
            </button>
          </>
        )}
        <Footer>
          ¿Quieres registrarte?
          <a onClick={() => <RegisterDialog />} >
            Registrarme
          </a>
        </Footer>
      </LoginPage>
    </div>
  );
}

export default Login;
