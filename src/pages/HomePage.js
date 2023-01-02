import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/AuthContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Card, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import '../css/home.css'
import { Box } from '@mui/system';
import GroupContext from '../data/groupContext';
import GroupForm from '../components/groupForm';

const HomePage = () => {
  const { authTokens } = useContext(AuthContext);

  return (
    <GroupForm></GroupForm>
  );
};

export default HomePage;

