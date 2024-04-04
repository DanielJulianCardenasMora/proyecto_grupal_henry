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


        {isAuthenticated ? 
        <div>
          <img src={user.picture} alt={user.name}/>
        <h2>Nombre: {user.name}</h2>
        <p>Email: {user.email}</p>
        </div>
        :
        <> <h1>No estas Logeado</h1> </>
      }

      
        <Footer>
          Not a member? <a href="#">Sign up now</a>
        </Footer>
        <br></br> <br></br>
        <button onClick={() => loginWithRedirect()}>Login Google</button>
        <br></br> <br></br>
        <button onClick={() => logout({ returnTo: "/landing" })}>
          Logout
        </button>
      </LoginPage>
    </div>
  );
} 

export default Login;
