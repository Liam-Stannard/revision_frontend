import React, { useContext, useState } from 'react'
import { Button, Card, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import CollectionContext from '../data/collectionContext';

export default function Collection(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [isReadOnlyCollection, setIsReadOnlyCollection] = useState(true);
  const { collections, setCollections, deleteCollection, getCollections, updateCollection, isWorking} = useContext(CollectionContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const toggleReadOnlyCollection = () => {
    setIsReadOnlyCollection(current => !current);
  }
 

  return (
    <Container  component={'main'}>
          <Card  elevation={5} className='home-section-two'>
            <Grid  container spacing={4} direction='column'>
              <Grid item >
                <TextField
                  disabled={isReadOnlyCollection}
                  label='Title'
                  className='home-collection-title'
                  value={title}
                  onChange={handleTitleChange}
                  name='title'
                />
              </Grid>
              <Grid item >
                <TextField
                  disabled={isReadOnlyCollection}
                  label='Description'
                  className='home-collection-description'
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
              <Button onClick={toggleReadOnlyCollection}>Edit Collection</Button>
              <Button onClick={deleteCollection(id)}>Delete Collection</Button>
              <Button onClick={updateCollection(title, description, id)}>Save</Button>
              <Button>Cancel</Button>
            </Grid>
          </Card>
        </Container>
  );
}





