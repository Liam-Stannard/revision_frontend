import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CollectionCard(props) {
  return (
    <Card sx={{ width: "50vw" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Answer Questions</Button>
      </CardActions>
    </Card>
  );
}
