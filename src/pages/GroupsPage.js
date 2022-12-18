import React, { useContext, useEffect, useState } from 'react'
import Group from '../components/group';
import AuthContext from '../auth/AuthContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/material';

const HomePage = () => {

  let [groups, setGroups] = useState([]);
  let { authTokens } = useContext(AuthContext);
  let [groupIdx, setGroupIdx] = useState(0);
  

  useEffect(() => {
    getGroups();
  }, []);

  const handleSelectGroup = (event) => {
    console.log("onchange", event.target.value);
    setGroupIdx(event.target.value);
  };

  const groupList = groups.map((grp, index) =>
  <MenuItem key={index} value={index}>{grp.title}</MenuItem>)

  return (
    <Container className="GroupsPage">
      <h2>Welcome to the Home Page!</h2>
      <FormControl fullWidth>
        <InputLabel id="group-select-label">Group</InputLabel>
        <Select
          labelId="group-select-label"
          id="group-simple-select"
          value={groupIdx}
          label="Group"
          onChange={handleSelectGroup}
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
    </Container>

  );

};
export default HomePage;

