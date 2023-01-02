import { useContext, useState, useEffect } from 'react'
import DataContext from './groupContext'
import AuthContext from '../auth/AuthContext'

export const GroupProvider = ({ children }) => {

  const [groups, setGroups] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  let { authTokens } = useContext(AuthContext);
  const groupsEndpoint = 'http://localhost:8000/api/card-groups/';

  let createGroup = (title, description, owner) => (event) => {
    console.log("create group with title/desc ", title, description, owner)
    setIsWorking(true);
    const newGroups = { ...groups, title: title, description: description };
    const controller = new AbortController()
    fetch(groupsEndpoint, {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "owner": owner,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      setGroups(newGroups);
      setIsWorking(false);
      return response
    });

    return () => {
      controller.abort()
    };
  }

  const getGroups = async () => {
    setIsWorking(true);
    const controller = new AbortController()
    fetch(groupsEndpoint, {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },

    }).then(response => {

      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()

    }).then(json => {
      setGroups(json);
      setIsWorking(false);
    })

    return () => {
      controller.abort()
    }
  };


  const deleteGroup = (id) => (event) => {
    console.log("deleting group with id ", id)
    setIsWorking(true);
    const filtered = groups.filter(function (group, idx, arr) {
      return group.id != id;
    });

    const controller = new AbortController()
    fetch(groupsEndpoint + id + '/', {
      signal: controller.signal,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },

    }).then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      setGroups(filtered);
      setIsWorking(false);
    });

    return () => {
      controller.abort()
    };
  };

  const updateGroup = (title, description, id) => (event) => {
    console.log("updating group with id ", id)
    setIsWorking(true);
    const newGroups = groups.map(group => {
      if (group.id === id) {
        return { ...group, title: title, description: description }
      }

      return group;
    })

    const controller = new AbortController()
    fetch(groupsEndpoint + id + '/', {
      signal: controller.signal,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      setGroups(newGroups);
      setIsWorking(false);
      return response
    });

    return () => {
      controller.abort()
    };
  }

  let contextData = {
    groups: groups,
    isWorking, isWorking,
    getGroups: getGroups,
    setGroups: setGroups,
    deleteGroup: deleteGroup,
    updateGroup: updateGroup,
    createGroup: createGroup,
  }

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}