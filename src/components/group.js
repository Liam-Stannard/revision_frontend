import React from 'react'
import Axios from 'axios'
import QuestionCard from './question_card'
import { AppBar, Toolbar, Container, Offset, Typography } from "@mui/material";

class Group extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      cards: props.cards,
      card: null,
      card_idx: 0,
    };
  }

  componentDidMount() {
    if (this.state.card_idx < this.state.cards.length) {
      this.setState({ card: this.state.cards[this.state.card_idx] });
    }
  }


  render() {

    if (this.state.card == null) {
      return null
    }

    return (
      <Container className='group'>
        <h2>
          {this.state.title}
        </h2>
        <p>{this.state.description}</p>
        <QuestionCard
          question={this.state.card.question}
          answer={this.state.card.answer}
        ></QuestionCard>
      </Container>
    );
  }


}

export default Group;



