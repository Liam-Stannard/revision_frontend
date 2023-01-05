import React from 'react'
import {Typography } from '@mui/material';
import CollectionForm from '../components/collectionForm';

const CollectionPage = () => {

  return (
    <> 
      <Typography variant='h2'>Collections</Typography>
      <CollectionForm></CollectionForm>
    </>
    
  );
};
export default CollectionPage;

