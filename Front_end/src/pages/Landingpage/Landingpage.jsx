import React, { useEffect, useState } from "react";
import { Landing } from "../../Components";
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const LandingPage = () => {
    const alerts = useSelector((state) => state.alerts)
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const userName = localStorage.getItem("usuario")

    useEffect(() => {
        setSnackbarMessage('Logged ')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
    }, [alerts])


    return (
        <div>
            <Landing/>
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
          {snackbarMessage + 
            '   '
             + userName + '  ✅'}
        </MuiAlert>
      </Snackbar>
        </div>
    )
}