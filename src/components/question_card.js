import React, { useEffect, useState } from 'react'
import Axios from 'axios'

class QuestionCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: props.title,
      answer: props.description
    };
  }


  render() {
    return (
      <div>
        <div>Question: {this.state.question}</div>
        <div>Answer: {this.state.answer}</div>
      </div>

    )
  }

}

export default QuestionCard;