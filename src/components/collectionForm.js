/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Card, Container, Divider, FormLabel, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CollectionContext from '../data/collectionContext';
import '../css/collectionForm.css';


export default function CollectionForm(props) {

  const { collections, deleteCollection, getCollections, updateCollection, isWorking, createCollection } = useContext(CollectionContext);
  const [collectionIdx, setCollectionIdx] = useState(0);
  const [isReadOnlyCollection, setIsReadOnlyCollection] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [isEditingCollection, setIsEditingCollection] = useState(false);
  const [isCollectionToEdit, setIsCollectionToEdit] = useState(false);
  useEffect(() => {
    console.log("fetching");
    getCollections();
  }, []);

  useEffect(() => {
    
  }, [collections]);


  useEffect(() => {
    console.log("collectings changed in efffect", collections, collectionIdx);
    setIsReadOnlyCollection(true);
    setIsCreatingCollection(false);
    setIsEditingCollection(false);

    if (collections && collections.length > collectionIdx) {
      setTitle(collections[collectionIdx].title);
      setDescription(collections[collectionIdx].description);
      setId(collections[collectionIdx].id);

      setOriginalTitle(collections[collectionIdx].title);
      setOriginalDescription(collections[collectionIdx].description);

      setIsCollectionToEdit(true);
    }
    else {
      setTitle("");
      setDescription("");
      setId(null);
      setIsCollectionToEdit(false);
    }
  }, [isWorking, collectionIdx, collections]);


  useEffect(()=>{setCollectionIdx(0);}, [isWorking])

  const handleCollectionSelect = (event) => {
    console.log("onchange", event.target.value);
    setCollectionIdx(event.target.value);

  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const toggleIsReadOnlyCollection = () => {
    setIsReadOnlyCollection(current => !current);
  }

  const toggleIsCreatingCollection = () => {
    setIsCreatingCollection(current => !current);
    setIsReadOnlyCollection(false);
    setDescription("");
    setTitle("");
    setId(null);
  }

  const toggleIsEditingCollection = () => {
    setIsEditingCollection(current => !current);
    setIsReadOnlyCollection(false);
  }

  const cancelCollectionEditing = () => {
    setDescription(originalDescription);
    setTitle(originalTitle);
    setIsReadOnlyCollection(true);
    setIsCreatingCollection(false);
    setIsEditingCollection(false);
  }

  return (
    <Container className="collection-form-container">
      <Grid container spacing={4} direction='column'>
            <FormLabel className='title'>Collections</FormLabel>
            <Grid item >
              <TextField
                disabled={isReadOnlyCollection}
                label='Title'
                className='textField'
                value={title}
                onChange={handleTitleChange}
                name='title'
                fullWidth
              />
            </Grid>
            <Grid item >
              <TextField
                disabled={isReadOnlyCollection}
                label='Description'
                className='textField'
                value={description}
                multiline
                maxRows={4}
                minRows={4}
                onChange={handleDescriptionChange}
                name='description'
                fullWidth
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container className='buttonGrid'>

            {!isCreatingCollection && !isEditingCollection && (
              <>
              <Button onClick={toggleIsCreatingCollection}>New Collection</Button>
              {isCollectionToEdit && (<>
                <Button onClick={toggleIsEditingCollection}>Edit Collection</Button>
                <Button onClick={deleteCollection(id)}>Delete Collection</Button>
                </>)}
              </>
            )}
            {isEditingCollection && (
              <>
                <Button onClick={updateCollection(title, description, id)}>Save</Button>
                <Button onClick={cancelCollectionEditing}>Cancel</Button>
              </>
            )}
            {isCreatingCollection && (
              <>
                <Button onClick={createCollection(title, description)}>Create Collection</Button>
                <Button onClick={cancelCollectionEditing}>Cancel</Button>
              </>
            )}

            {/*  */}
      </Grid>
    </Container>);
}