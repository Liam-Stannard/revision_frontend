import React, {useState } from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";


export default function QuestionCard(props) {
  const [helperText, setHelperText] = useState("Please select an option.");
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  console.log("props card " + props.card);

  const answer_list = [];

  answer_list.push(props.card.answer_a);
  answer_list.push(props.card.answer_b);
  answer_list.push(props.card.answer_c);
  answer_list.push(props.card.answer_d);

  const answer_elements = answer_list.map((answer,index) =>
    <FormControlLabel
      key={index}
      value={index}
      control={<Radio />}
      label={answer}>
    </FormControlLabel>);


  return (
    <><h3>{props.card.question}</h3>
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log("SUBMIT");
      console.log("value: " + value);
      console.log("ca: " + props.card.correct_answer);

      if (value === props.card.correct_answer) {
        console.log("correct")
        setHelperText('Correct');
        setError(false);
      } else if (value !== props.card.correct_answer) {
        console.log("Incorrect")
        setHelperText('Incorrect');
        setError(true);
      } else {
        setHelperText('Please select an option.');
        console.log("Please select an option")
        setError(true);
      }

    }} >
      <FormControl className='question-card' error={error}>
        <FormLabel id="demo-radio-buttons-group-label">
        {helperText}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="A"
          name="radio-buttons-group"
          value={value}
          onChange={(e) => {

            setHelperText('');
            setError(false);
            setValue(e.target.value);

            console.log("value: " + value);
            console.log("ca: " + props.card.correct_answer);
            console.log("target: " + e.target);

          }}
        >
          {answer_elements}
        </RadioGroup>
        <Button type="submit" variant="outlined" color="primary">
          Check Answer
        </Button>
      </FormControl>
    </form></>
  )
}


