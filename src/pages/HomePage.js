import React, { useContext, useEffect, useState } from 'react'
import Group from '../components/group';
import AuthContext from '../auth/AuthContext';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const HomePage = () => {

  let [groups, setGroups] = useState([]);
  let { authTokens } = useContext(AuthContext);
  let [groupIdx, setGroupIdx] = useState(0);
  

  useEffect(() => {
    getGroups();
  }, []);

 


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

  const handleChange = (event) => {
    console.log("onchange", event.target.value);
    setGroupIdx(event.target.value);
  };

  const groupList = groups.map((grp, index) =>
  <MenuItem key={index} value={index}>{grp.title}</MenuItem>)

  return (
    <Box className="GroupsPage">
      <h2>Welcome to the Home Page!</h2>
      <FormControl fullWidth>
        <InputLabel id="group-select-label">Group</InputLabel>
        <Select
          labelId="group-select-label"
          id="group-simple-select"
          value={groupIdx}
          label="Group"
          onChange={handleChange}
        >
        {groupList}
        </Select>
      </FormControl>
      {groups[groupIdx] && (<Group
                title={groups[groupIdx].title}
                description={groups[groupIdx].description}
                cards={groups[groupIdx].cards}
                groupIdx={groupIdx}
            > </Group>)}
    </Box>

  );

};
export default HomePage;

