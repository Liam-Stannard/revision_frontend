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

const HomePage = () => {

  const { groups, setGroups, deleteGroup, getGroups, updateGroup, isWorking} = useContext(GroupContext);
  const { authTokens } = useContext(AuthContext);
  const [groupIdx, setGroupIdx] = useState(0);
  const [isReadOnlyGroup, setReadOnlyGroup] = useState(true);
  const [inputFields, setInputFields] = useState({}); 
 

  useEffect(() => {
    console.log("fetching groups");
    getGroups();    
  }, []);


  useEffect(() => {
    setReadOnlyGroup(true);
    if(groups.length > groupIdx){
      setInputFields((previousState => ({...previousState, ["title"]: groups[groupIdx].title, ["description"]: groups[groupIdx].description})));
    }
    else {
      setInputFields((previousState => ({...previousState, ["title"]: "", ["description"]: ""})));
    }
  }, [isWorking]);
  
 

  useEffect(() => {
    setReadOnlyGroup(true);
    if(groups.length > groupIdx){
      setInputFields((previousState => ({...previousState, ["title"]: groups[groupIdx].title, ["description"]: groups[groupIdx].description})));
    }
    else {
      setInputFields((previousState => ({...previousState, ["title"]: "", ["description"]: ""})));
    }
  }, [groupIdx]);


  const handleGroupSelect = (event) => {
    console.log("onchange", event.target.value);
    setGroupIdx(event.target.value);

  };

  const toggleReadOnlyGroup = () => {
    setReadOnlyGroup(current => !current);
  }
 
   const handleInputFieldChange = (event) => {
    setInputFields(previousState => ({ ...previousState, [event.target.name]: event.target.value }));
  }

  const onClickUpdateGroup = () => {
    console.log("updating with", inputFields.title, inputFields.description, groups[groupIdx].id);
    {};
    toggleReadOnlyGroup();
    console.log("updating group finished");
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
              {groups.map((grp, index) => <MenuItem key={index} value={index}>{grp.title}</MenuItem>)}
            
          </Select>
        </FormControl>
      </Container>
      {groups[groupIdx] && (
        <Container   component={'main'}>
          <Card  elevation={5} className='home-section-two'>
            <Grid  container spacing={4} direction='column'>
              <Grid item >
                <TextField
                  disabled={isReadOnlyGroup}
                  label='Title'
                  className='home-group-title'
                  value={inputFields.title}
                  onChange={handleInputFieldChange}
                  name='title'
                />
              </Grid>
              <Grid item >
                <TextField
                  disabled={isReadOnlyGroup}
                  label='Description'
                  className='home-group-description'
                  value={inputFields.description}
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
              <Button onClick={deleteGroup(groups[groupIdx].id)}>Delete Group</Button>
              <Button onClick={updateGroup(inputFields.title, inputFields.description, groups[groupIdx].id)}>Save</Button>
              <Button>Exit</Button>
            </Grid>
          </Card>
        </Container>
      )}
    </Box>
  );
};

export default HomePage;

