import React from 'react';
import LoginPage, { Logo, Password, Footer } from '@react-login-page/page5';
import LoginLogo from 'react-login-page/logo-rect';
import styles from './loginpage.module.css'

function Login () {
    return (
      <div className={styles.div}>
        <LoginPage style={{ height: 480 }}>
          <Logo>
            <LoginLogo />
          </Logo>
          <Password/>
          <Footer>
            Not a member? <a href="#">Sign up now</a>
          </Footer>
        </LoginPage>
      </div>
    );
} 

export default Login;