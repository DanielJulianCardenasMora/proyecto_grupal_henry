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
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { alertsActive } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Login ({setUsuario, usuario}) {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch()
  const register = useSelector((state) => state.register)

  //! URL -------------------

  const URL = "http://localhost:3001"
  // const URL = "https://proyectogrupalhenry-production-e8a4.up.railway.app"

  //! ------------------------

  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } =
    useAuth0();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showRegisterDialog, setShowRegisterDialog] = useState(false); // Estado para controlar la visibilidad del diálogo

  const handleClose = () => {
    setShowRegisterDialog(false);
  }

  const handleOpen = () => {
    setShowRegisterDialog(true);
  }

  const onClick = async () => {
    

    if (!credentials.email || !credentials.password) {
      setSnackbarSeverity("error");
      setSnackbarMessage('You have uncompleted fields')
      setSnackbarOpen(true);
      return;
    }
    
    const login = {
      email: credentials.email,
      password: credentials.password
    }
    
    try {
      const { data } = await axios.post(`${URL}/users/api/login`, login);
      if (data.status === 'ok') {
        localStorage.setItem("usuario", login.email);
        localStorage.setItem("role", data.role)
        dispatch(alertsActive(true))
        navigate("/");
        
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage('Email or password incorrect');
      setSnackbarOpen(true);
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

  const handleGoogle = () => {
      console.log("entre al handle")
      console.log(user)
      console.log(isAuthenticated)
  }

  useEffect(()=> {
    handleGoogle()
  }, [isAuthenticated])

  useEffect(() => {
    if(register == true){
      setSnackbarSeverity('success');
      setSnackbarMessage('User registered successfully!');
      setSnackbarOpen(true);
    }
  }, [register])


  return (
    <div className={styles.div}>
      <button className={styles.closeButton} onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faX} />
      </button>
      <LoginPage style={{ height: 480 }}>
        <Title>Do you already have a WearFashion account? Log in</Title>

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

        <>
          <br></br>
          <button
            className={styles.googleLogin}
            onClick={() => loginWithRedirect()}
          >
            Log in with Google
          </button>
        </>

        <Footer>
          ¿Do yo want to register?
          <button onClick={handleRegisterClick} className={styles.register}>
            Register
          </button>
        </Footer>

        {showRegisterDialog && (
          <RegisterDialog
            handleOpen={handleOpen}
            isAuthenticated={isAuthenticated}
            handleClose={handleClose}
          />
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </LoginPage>
    </div>
  );
}

export default Login;
