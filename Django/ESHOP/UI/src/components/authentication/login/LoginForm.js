import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import axios from 'axios';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Container,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { token, apiUrl } from '../../../_mocks_/repo/data';

export default function LoginForm() {
  const navigate = useNavigate();

  const [logins, setUserLogins] = useState({
    username: '',
    password: ''
  });

  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const formData = new FormData();
  formData.append('username', logins.username);
  formData.append('password', logins.password);

  const handleLogin = async () => {
    await axios
      .post(`${apiUrl}/api/login/`, logins)
      .then((response) => {
        if (response.data.token != null) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('isLoggedIn', true);
          navigate('/dashboard', { replace: true });
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {
        setLoginError(true);
        console.log(error);
      });
  };

  const handleValueChanges = (e) => {
    setUserLogins({
      ...logins,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Stack spacing={3} mb={5}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          value={logins.username}
          onChange={handleValueChanges}
          fullWidth
        />

        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          value={logins.password}
          onChange={handleValueChanges}
          fullWidth
        />
      </Stack>

      {loginError ? (
        <Typography m={2} color="red">
          Login Credentials Incorrect...
        </Typography>
      ) : (
        <Container />
      )}
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </Container>
  );
}
