import React, { useContext } from 'react'
import AuthContext from '../auth/AuthContext';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import '../css/homePage.css'



const HomePage = () => {
  const { user } = useContext(AuthContext);

  
  return (
    <Box className='root'>
      <Container component={'main'} className='content'>
            <Typography className='title' variant='h2'>Welcome to revis.io {user.username}</Typography>
            <Container className='text'>View, edit and create your collections from the collections page above, it's time to revise away!</Container>
      </Container>
    </Box>
    
    
  );
};

export default HomePage;

