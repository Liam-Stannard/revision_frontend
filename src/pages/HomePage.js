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

  let {groups, setGroups, deleteGroup} = useContext(GroupContext);
  let {authTokens} = useContext(AuthContext);
  let [groupIdx, setGroupIdx] = useState(0);
  let [isReadOnlyGroup, setReadOnlyGroup] = useState(true);


  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    setReadOnlyGroup(true);
  }, [groupIdx]);


  let getGroups = async () => {
    const controller = new AbortController()
    fetch('http://localhost:8000/api/groups/', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },

    }).then(response => {
      console.log("response is ", response)
      if (!response.ok) {
        throw new Error(response.status)
      }
      else {
        return response.json()
      }
    }).then(json => {
      setGroups(json);
    })

    return () => {
      controller.abort()
    }
  };

  const handleGroupSelect = (event) => {
    console.log("onchange", event.target.value);
    setGroupIdx(event.target.value);
  };

  const toggleReadOnlyGroup = () => {
    console.log("read only is set to", isReadOnlyGroup);
    setReadOnlyGroup(current => !current);
  }

 

  const groupList = groups.map((grp, index) =>
    <MenuItem key={index} value={index}>{grp.title}</MenuItem>)

  return (
    <Box component={'main'} 
          className="home-container" 
      >
          
    <Container className='home-section-one' >
    
      <h2>Welcome to the Home Page!</h2>
      <FormControl>
        <InputLabel id="group-select-label">Group</InputLabel>
        <Select
          className='group-simple-select'
          labelId="group-select-label"
          id="group-simple-select"
          value={groupIdx}
          label="Group"
          onChange={handleGroupSelect}
          disabled={!isReadOnlyGroup}
        >
          {groupList}
        </Select>
      </FormControl>
      </Container>
      
      {groups[groupIdx] && (
          
          <Container component={'main'}>
           <Card  elevation={5} className='home-section-two'>
           <Grid container spacing={4}
           direction='column'>
           <Grid item ><TextField 
                  disabled={isReadOnlyGroup}
                  label='Title'
                  className='home-group-title'
                  value={groups[groupIdx].title}        
                /></Grid>

              <Grid item >   <TextField 
                  disabled={isReadOnlyGroup}
                  label='Description'
                  className='home-group-description'
                  value={groups[groupIdx].description}
                  multiline
                  maxRows={4}
                  minRows={4}
                  
                /></Grid>
                
                </Grid>
              <Divider variant="middle"/>  
              <Grid container> 
                <Button onClick={toggleReadOnlyGroup} >Edit Group</Button>
                <Button onClick={deleteGroup(groups[groupIdx].id)}>Delete Group</Button>
              </Grid>
            </Card> 
            </Container>
            
      )}
    </Box>

  );

};
export default HomePage;

