import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Logo, Password, Footer, Title } from '@react-login-page/page5';
import { Submit } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page5';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './loginpage.module.css';



function Login ({setUsuario, usuario}) {
  const { loginWithRedirect, logout, isLoading, user, isAuthenticated } =
    useAuth0();

  useEffect(() => {
    if (user && user.email) {
      setUsuario(user.email)
      console.log(usuario)
    }
    
  },[user])
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onClick = async () => {
    // Verificar credenciales aquí

    if (!credentials.email || !credentials.password) {
      alert("Tienes campos incompletos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/api/login", {
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
        <Submit onClick={onClick}>Login</Submit>
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
          ¿Quieres registrarte?{" "}
          <a onClick={() => loginWithRedirect()} href="#">
            Registrarme
          </a>
        </Footer>
      </LoginPage>
    </div>
  );
} 

export default Login;
