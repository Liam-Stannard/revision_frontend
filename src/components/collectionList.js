 /** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Card, Container, Divider, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CollectionContext from '../data/collectionContext';
import '../css/collectionList.css';
import CollectionCard from './collectionCard';


export default function CollectionList(props) {

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

  let collectionList = []


  if (collections && collections.length > 0) {
    collectionList = collections.map((collection, index) => 
    <Grid item xs={4} sm={8} md={12} key={index} sx={{margin: "auto"}}>
    <CollectionCard
        title={collection.title}
        description={collection.description}>
    </CollectionCard>
    </Grid>
    );
 
  }

  return (
    <Container className="collection-list-container">
        <Grid   container
                columnGap={3} 
                className="collection-list-grid" 
                spacing={{ xs: 2, md: 2 }} 
                columns={{ xs: 4, sm: 8, md: 12 }
                }>
            {collections && collections.length > 0 && (collectionList)}
        </Grid>
    </Container>);
}