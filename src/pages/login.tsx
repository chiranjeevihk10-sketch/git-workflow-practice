
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Alert } from '@mui/material';
import MyButton from '../components/Button';
import useAuth from '../hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login({ email, password });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>

        <Typography textAlign="center" color="text.secondary" mb={3}>
          Welcome back to FitPulse!
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Box mt={3}>
          <MyButton
            text="Login"
            onClick={() => {}}
            variant="contained"
            loading={loading}
            disabled={!email || !password}
          />
        </Box>

        <Typography textAlign="center" mt={3}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>

        <Typography textAlign="center" mt={2}>
          <Link to="/">Back to Home</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
