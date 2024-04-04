import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';



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

    if (credentials.email && credentials.password) {
      navigate("/landing");
    } else {
      alert("Debes ingresar un Email y Contraseña Valido");
    }
  };

  const handleChangeEmail = (evento) => {
    const valor = evento.target.value;
    setCredentials({ ...credentials, email: valor });
  };

  const handleChangePassword = (evento) => {
    const valor = evento.target.value;
    setCredentials({ ...credentials, password: valor });
  };

  return (
    <div className={styles.div}>
      <LoginPage style={{ height: 480 }}>
        <h2>¿Ya tienes cuenta en WearFashion? Inicia sesion</h2>
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
        {isAuthenticated ? (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>Nombre: {user.name}</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => logout({ returnTo: "/landing" })}>
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            {" "}
            <button onClick={() => loginWithRedirect()}>Registrarme con Google</button>
          </>
        )}
        <Footer>
          ¿Quieres registrarte? <a href="#">Registrarme</a>
        </Footer>
      </LoginPage>
    </div>
  );
} 

export default Login;
