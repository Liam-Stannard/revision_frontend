import { useContext, useState, useEffect } from 'react'
import DataContext from './groupContext'
import AuthContext from '../auth/AuthContext'

export const GroupProvider = ({ children }) => {

    const [groups, setGroups] = useState([]);
    let { authTokens } = useContext(AuthContext);


    let deleteGroup = (id) => (event) => {
        console.log("deleting group with id ", id)
        var filtered = groups.filter(function (group, idx, arr) {
            return group.id != id;
        });
        console.log("deleting group with id ", filtered)
        

        const controller = new AbortController()
        fetch('http://localhost:8000/api/groups/'+id, {
            signal: controller.signal,
            method: 'DELETE',
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
                return response
            }
        }).then(reso => {
            setGroups(filtered);
        })

        return () => {
            controller.abort()
        }


    }

    let contextData = {
        groups: groups,
        setGroups: setGroups,
        deleteGroup: deleteGroup,
    }



    return (
        <DataContext.Provider value={contextData}>
            {children}
        </DataContext.Provider>
    )
}