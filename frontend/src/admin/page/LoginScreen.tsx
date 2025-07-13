// src/admin/pages/LoginPage.tsx

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { adminApi } from '../api'; 
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginScreen= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate()
  const login = useAuthStore((state)=> state.login);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
  
    try {
      // CSRF Cookieの取得（Laravel Sanctumの仕様）
      await axios.get('http://localhost:8080/sanctum/csrf-cookie', {
        withCredentials: true,
      });
  
      // ログインリクエスト
      const res = await adminApi.post('admin/login', {
        email,
        password
      });
  
      login(res.data.user)
      navigate("/admin/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error('ログイン失敗', err?.response?.data);
      setErrorMsg(err?.response?.data?.message || 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          管理者ログイン
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="メールアドレス"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'ログイン'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
