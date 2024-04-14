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


export default function RegisterDialog({ handleClose }) {
  const [open, setOpen] = useState(false); // Establecer el estado inicial basado en isAuthenticated


  //! URL -------------------

  // const URL = "http://localhost:3001"
  const URL = "https://proyectogrupalhenry-production-e8a4.up.railway.app"

  //! ------------------------



  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newUser = {
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password'),
      country: formData.get('location'),
      phone: formData.get('phone')
    }

    try {
      const response = await axios.post(`${URL}/users/api/register`, newUser)
      if(response){
        alert("User registed")
      }
      handleClose();
    } catch (error) {
      alert('Error al registrar el usuario', error);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
   
    handleClose();
  };

  useEffect(() => {
    setOpen(true)
  }, [])


  return (
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
          label="Name"
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
          label="Password"
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
          label="Location"
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
