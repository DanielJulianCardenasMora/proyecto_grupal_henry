import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'


export default function RegisterDialog({ isAuthenticated, handleClose }) {
  const [open, setOpen] = useState(false); // Establecer el estado inicial basado en isAuthenticated

  useEffect(() => {
    setOpen(isAuthenticated === true); // Si isAuthenticated es true, abrir el diálogo, de lo contrario, mantenerlo cerrado
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    //! Nuevo usuario
    const newUser = {
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password'),
      country: formData.get('location'),
      phone: formData.get('phone')
    }

    try {
      
      await axios.post('https://proyectogrupalhenry-production-e8a4.up.railway.app/users/api/register', newUser)
      console.log('Registro exitoso:', newUser);
      handleClose();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
   
    handleClose();
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Porfavor ingresa tus datos</DialogTitle>
      <DialogContent>

      <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="email"
          type="email"
          fullWidth
          variant="standard"
        />

<TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="name"
          type="name"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="password"
          type="password"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="location"
          name="location"
          label="location"
          type="location"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="phone"
          name="phone"
          label="Phone"
          type="phone"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Register</Button>
      </DialogActions>
    </Dialog>
  );
}
