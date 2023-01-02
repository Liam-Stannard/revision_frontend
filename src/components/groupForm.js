import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/AuthContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Card, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GroupContext from '../data/groupContext';
import Group from './group';


export default function GroupForm(props) {
  
  const { groups, setGroups, deleteGroup, getGroups, updateGroup, isWorking, createGroup} = useContext(GroupContext);
  const { authTokens } = useContext(AuthContext);
  const [groupIdx, setGroupIdx] = useState(0);
  const [isReadOnlyGroup, setIsReadOnlyGroup] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [owner, setOwner] = useState(2)

  useEffect(() => {
    console.log("fetching groups");
    getGroups();    
  }, []);


  useEffect(() => {
    setIsReadOnlyGroup(true);
    if(groups.length > groupIdx){
      setTitle(groups[groupIdx].title);
      setDescription(groups[groupIdx].description);
      setId(groups[groupIdx].id);
      setOwner(groups[groupIdx].owner);
    }
    else {
      setTitle("");
      setDescription("");
      setId(null);
      setOwner(2);
    }
  }, [isWorking, groupIdx]);

  const handleGroupSelect = (event) => {
    console.log("onchange", event.target.value);
    setGroupIdx(event.target.value);

  }

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
    <Box component={'main'} className="home-container">
      <Container className='home-section-one' >
        <h2>Welcome to the Home Page!</h2>
        <FormControl fullWidth>
          <InputLabel id="group-select-label">Group</InputLabel>
          <Select
            className='group-simple-select'
            labelId="group-select-label"
            id="group-simple-select"
            value={isWorking ? ''  : groupIdx}
            label="Group"
            onChange={handleGroupSelect}
            disabled={!isReadOnlyGroup}>
              {groups.length > 0 && (groups.map((grp, index) => <MenuItem key={index} value={index}>{grp.title}</MenuItem>))}
            
          </Select>
        </FormControl>
      </Container>
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
            <Button onClick={createGroup(title, description, owner)}>Create Group</Button>
              <Button onClick={toggleReadOnlyGroup}>Edit Group</Button>
              <Button onClick={deleteGroup(id)}>Delete Group</Button>
              <Button onClick={updateGroup(title, description, id)}>Save</Button>
              <Button>Cancel</Button>
            </Grid>
          </Card>
        </Container>
    </Box>);
}