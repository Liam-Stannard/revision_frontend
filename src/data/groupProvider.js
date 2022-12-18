import { useContext, useState, useEffect } from 'react'
import DataContext from './groupContext'
import AuthContext from '../auth/AuthContext'

export const GroupProvider = ({ children }) => {

    const [groups, setGroups] = useState([]);
    let { authTokens } = useContext(AuthContext);
    const groupsEndpoint = 'http://localhost:8000/api/groups/';

    let getGroups = async () => {
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
        })
    
        return () => {
          controller.abort()
        }
      };
    

    let deleteGroup = (id) => (event) => {
        console.log("deleting group with id ", id)
        var filtered = groups.filter(function (group, idx, arr) {
            return group.id != id;
        });

        const controller = new AbortController()
        fetch(groupsEndpoint + id, {
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
            return response
        });

        return () => {
            controller.abort()
        };
    }

    let contextData = {
        groups: groups,
        getGroups: getGroups,
        setGroups: setGroups,
        deleteGroup: deleteGroup,
    }

    return (
        <DataContext.Provider value={contextData}>
            {children}
        </DataContext.Provider>
    )
}