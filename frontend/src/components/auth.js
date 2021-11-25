import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://craftingnexus.com/">
                Crafting Nexus
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function Auth() {
 
    const [formError, setFormError] = useState('')
    const [formMessage, setFormMessage] = useState('')
    const [isLoginView, setIsLoginView] = useState(true)

    const [, setToken] = useCookies(['craftingnexus'])
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (isLoginView) {
            API.loginUser({
                username: data.get('username'),
                password: data.get('password')
            })
                .then(resp => resp.json())
                .then(resp => {
                    setToken('craftingnexus', resp.token)
                    navigate('/app')
                })
                .catch(error => setFormError(error));

        } else {
            API.registerUser({
                username: data.get('username'),
                password: data.get('password')
            })
                .then(resp => {
                    resp.json()
                    setIsLoginView(true)
                    setFormMessage("You have been Registered")
                })
                .catch(error => setFormError(error));
        }
    };
  
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isLoginView ? 'Sign In' : 'Register'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="user name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {formError && (
                            <Alert severity="error" onClick={() => setFormError(null)}>
                                Unable to sign you - {formError.message}
                            </Alert>
                        )}
                        {formMessage && (
                            <Alert severity="success" onClick={() => setFormMessage(null)}>
                                {formMessage}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoginView ? 'Sign In' : 'Register'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>

                                {isLoginView ?
                                    <Link variant="body2" onClick={() => setIsLoginView(false)}>Don't have an account? Register Here!</Link> :
                                    <Link variant="body2" onClick={() => setIsLoginView(true)}>Have an account? Login Here!</Link>
                                }

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}