import React, { useContext } from 'react'

import AuthContext from '../auth/authContext'

import BasePage from './basePage';

import { Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../css/loginPage.css';

const LoginPage = () => {

    let { loginUser } = useContext(AuthContext)
   
    return (
        <BasePage title='login' content={
            <Grid className='login-grid'>
            <Paper elevation={10} className='login-paper'>
                <Grid align='center'>
                    <Typography variant='h4' className='login-header'>Sign in</Typography>
                    <form onSubmit={loginUser}>
                        <FormControl fullWidth>
                            <TextField type="text" name="username" placeholder='Enter Username' variant="standard" fullWidth required />
                            <TextField type="password" name="password" placeholder='Enter Password' variant="standard" fullWidth required />
                            <Button type="submit" color='primary' variant="contained" fullWidth className='login-form-element'>Sign in</Button>
                        </FormControl>
                    </form>
                </Grid>
            </Paper>
        </Grid>
        }/>
        
    )
}
export default LoginPage