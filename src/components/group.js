import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/AuthContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Card, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GroupContext from '../data/groupContext';

export default function Group(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [isReadOnlyGroup, setIsReadOnlyGroup] = useState(true);
  const { groups, setGroups, deleteGroup, getGroups, updateGroup, isWorking} = useContext(GroupContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const toggleReadOnlyGroup = () => {
    setIsReadOnlyGroup(current => !current);
  }
 

  return (
    <Container  component={'main'}>
          <Card  elevation={5} className='home-section-two'>
            <Grid  container spacing={4} direction='column'>
              <Grid item >
                <TextField
                  disabled={isReadOnlyGroup}
                  label='Title'
                  className='home-group-title'
                  value={title}
                  onChange={handleTitleChange}
                  name='title'
                />
              </Grid>
              <Grid item >
                <TextField
                  disabled={isReadOnlyGroup}
                  label='Description'
                  className='home-group-description'
                  value={description}
                  multiline
                  maxRows={4}
                  minRows={4}
                  onChange={handleDescriptionChange}
                  name='description'
                />
              </Grid>
            </Grid>
            <Divider variant="middle" />
            <Grid container>
              <Button onClick={toggleReadOnlyGroup}>Edit Group</Button>
              <Button onClick={deleteGroup(id)}>Delete Group</Button>
              <Button onClick={updateGroup(title, description, id)}>Save</Button>
              <Button>Cancel</Button>
            </Grid>
          </Card>
        </Container>
  );
}





