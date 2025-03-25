import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Link as MuiLink
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const isRegister = type === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(payload));

    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/auth/${type}`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 10,
        mx: 'auto',
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        {isRegister ? 'Register' : 'Login'}
      </Typography>

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        variant="filled"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        variant="filled"
        required
      />

      <MuiLink
        component={Link}
        to={isRegister ? '/login' : '/register'}
        underline="hover"
        sx={{ fontSize: '0.9rem', color: '#00bcd4' }}
      >
        {isRegister ? 'Already got an account?' : 'Create an account'}
      </MuiLink>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          px: 4,
          py: 1,
          borderRadius: '20px',
          backgroundColor: '#00bcd4',
          textTransform: 'none'
        }}
      >
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </Box>
  );
};

export default AuthForm;
