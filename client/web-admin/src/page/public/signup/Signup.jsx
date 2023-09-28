import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUploadRounded';
import React from 'react';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
    },
    secondary: {
      main: '#808080',
    },
  },
});

function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid component="main" container sx={{ height: '100vh', width: '100vw' }}>
        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng kí
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Tên"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Họ"
                name="lastName"
                autoComplete="lastName"
                autoFocus
              />
            </Box>
            <TextField fullWidth />
            <Button variant="contained" startIcon={<CloudUploadIcon />}>
              Upload a file
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default Signup;
