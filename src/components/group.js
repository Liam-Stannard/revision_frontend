import React, {useState } from 'react'
import QuestionCard from './questionCard'
import { Box, Button } from "@mui/material";

export default function Group(props) {
  const [cardIdx, setCardIdx] = useState(0);


  const nextCard = (() => {
    setCardIdx(currentIdx => {
      return currentIdx + 1
    })
  });

  return (
    <Box className='group'>
      <h2 className='group-title'>
        {props.title}
      </h2>
      <p className='group-desc'>{props.description}</p>
      {props.cards[cardIdx] && (
        <Box>
          <QuestionCard
            card={props.cards[cardIdx]}
          ></QuestionCard>
          <Button onClick={nextCard}>Next</Button>
          <Button>Previous</Button>
        </Box>)}

    </Box>
  );
}





