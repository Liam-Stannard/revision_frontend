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


export default function GroupSelection(props) {
  let { groups, setGroups, deleteGroup, getGroups, updateGroup, loadingGroups} = useContext(GroupContext);
  let [isReadOnlyGroup, setReadOnlyGroup] = useState(true);
  let [inputFields, setInputFields] = useState({}); 

  
  const toggleReadOnlyGroup = () => {
    setReadOnlyGroup(current => !current);
  }
  
   const handleInputFieldChange = (event) => {
    setInputFields(previousState => ({ ...previousState, [event.target.name]: event.target.value }));
    console.log(inputFields)
  }

  const onClickUpdateGroup = () => {
    console.log("ipdating group with ", inputFields.title, inputFields.description, props.id )
    updateGroup(inputFields.title, inputFields.description, props.id);
    setReadOnlyGroup(false);
    
  }


return(
    <Container component={'main'}>
      <Card elevation={5} className='home-section-two'>
        <Grid container spacing={4} direction='column'>
          <Grid item >
            <TextField
              disabled={isReadOnlyGroup}
              label='Title'
              className='home-group-title'
              defaultValue={props.title}
              onChange={handleInputFieldChange}
              name='title'
            />
          </Grid>
          <Grid item >
            <TextField
              disabled={isReadOnlyGroup}
              label='Description'
              className='home-group-description'
              defaultValue={props.description}
              multiline
              maxRows={4}
              minRows={4}
              onChange={handleInputFieldChange}
              name='description'
            />
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container>
          <Button onClick={toggleReadOnlyGroup}>Edit Group</Button>
          <Button onClick={deleteGroup(props.id)}>Delete Group</Button>
          <Button onClick={onClickUpdateGroup}>Save</Button>
          <Button>Exit</Button>
          
        </Grid>
      </Card>
    </Container>
  )
}