import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar} from "@mui/material";
import AuthContext from '../auth/AuthContext';

const NavigationBar = () => {
  let {user, logoutUser} = useContext(AuthContext)
    return(
        <AppBar position="static">
          <Toolbar variant="dense"> 
          {user ? (<p onClick={logoutUser}>Logout</p>) : (<Link to="/login">Login</Link>)}       
          </Toolbar>
        </AppBar>
    )
}

export default NavigationBar