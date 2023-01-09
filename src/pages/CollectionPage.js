import React from 'react'

import CollectionForm from '../components/collectionForm';
import CollectionList from '../components/collectionList';
import BasePage from './basePage';

import { Typography } from '@mui/material';

import '../css/collectionPage.css'

const CollectionPage = () => {

  return (
    <BasePage title="Collections" content={
      <CollectionList></CollectionList>
    } />
  );
};
export default CollectionPage;

