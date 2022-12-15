import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import AuthContext from '../auth/AuthContext';
import '../css/navigationBar.css'

const NavigationBar = () => {
  let { user, logoutUser } = useContext(AuthContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user ? (<Button color="inherit" onClick={logoutUser}>Logout</Button>) : (<Button color="inherit" component={Link} to="/login">Login</Button>)}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar