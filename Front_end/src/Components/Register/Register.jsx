import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

export default function RegisterDialog({ handleClose }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    country: '',
    phone: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const URL = "https://proyectogrupalhenry-production-e8a4.up.railway.app";

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (!validateEmail(formData.email)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Ingrese un correo electrónico válido.');
      setSnackbarOpen(true);
      return;
    }
    if (!validateName(formData.name)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('El nombre solo puede contener letras.');
      setSnackbarOpen(true);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('El número de teléfono solo puede contener números.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${URL}/users/api/register`, formData);
      if (response) {
        setSnackbarSeverity('success');
        setSnackbarMessage('User registered successfully!');
        setSnackbarOpen(true);
      }
      handleClose();
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al registrar el usuario');
      setSnackbarOpen(true);
    }

    handleClose();
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Expresión regular para validar solo letras
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validatePhone = (phone) => {
    // Expresión regular para validar solo números
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Complete the form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="country"
            name="country"
            label="Country"
            type="text"
            fullWidth
            variant="standard"
            value={formData.country}
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            fullWidth
            variant="standard"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
}
