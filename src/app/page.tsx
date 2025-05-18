'use client';

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from "react";
import { Login } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  useEffect(() => {
    let valid = true;

    if (!validateEmail(email)) valid = false;
    if (password.length < 8) valid = false;

    setIsFormValid(valid);
  }, [email, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password is too short');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '12341234') {
        router.push('/index');
      } else {
        setLoginError('Email or password was wrong');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Realtime validation for email format
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    // Realtime validation for password length
    if (e.target.value.length < 8) {
      setPasswordError('Password is too short');
    } else {
      setPasswordError('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Login sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Login>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            placeholder="example@email.com"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {loginError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid || isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Grid container justifyContent="space-between">
            <Link href="/resetpass" variant="body2">
              Forgot password?
            </Link>
            <Link href="#" variant="body2">
              Create Account
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
