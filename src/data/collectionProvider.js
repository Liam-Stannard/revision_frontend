import { useContext, useState } from 'react'
import DataContext from './collectionContext'
import AuthContext from '../auth/AuthContext'

export const CollectionProvider = ({ children }) => {

  const [collections, setCollections] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  let { authTokens } = useContext(AuthContext);
  const COLLECTION_ENDPOINT = 'http://localhost:8000/api/collections/';

  let createCollection = (title, description) => (event) => {
    console.log("create with title/desc ", title, description)
    setIsWorking(true);
    const controller = new AbortController()
    fetch(COLLECTION_ENDPOINT, {
      signal: controller.signal,
      method: 'POST',
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
      getCollections()
      setIsWorking(false);
      return response
    });

    return () => {
      controller.abort()
    };
  }

  const getCollections = async () => {
    console.log("getting collections");
    setIsWorking(true);
    const controller = new AbortController()
    fetch(COLLECTION_ENDPOINT, {
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
      setCollections(json);
      setIsWorking(false);
    })

    return () => {
      controller.abort()
    }
  };


  const deleteCollection = (id) => (event) => {
    console.log("deleting group with id ", id)
    setIsWorking(true);
    const filtered = collections.filter(function (group, idx, arr) {
      return group.id !== id;
    });

    const controller = new AbortController()
    fetch(COLLECTION_ENDPOINT + id + '/', {
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
      setCollections(filtered);
      setIsWorking(false);
    });

    return () => {
      controller.abort()
    };
  };

  const updateCollection = (title, description, id) => (event) => {
    console.log("updating with id ", id)
    setIsWorking(true);
    const newCollections = collections.map(group => {
      if (group.id === id) {
        return { ...group, title: title, description: description, id: id}
      }

      return group;
    })

    const controller = new AbortController()
    fetch(COLLECTION_ENDPOINT + id + '/', {
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
      setCollections(newCollections);
      setIsWorking(false);
      return response
    });

    return () => {
      controller.abort()
    };
  }

  let contextData = {
    collections: collections,
    isWorking: isWorking,
    getCollections: getCollections,
    setCollections: setCollections,
    deleteCollection: deleteCollection,
    updateCollection: updateCollection,
    createCollection: createCollection,
  }

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}