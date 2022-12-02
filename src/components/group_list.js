import React from 'react'
import Axios from 'axios'
import Group from './group'
import { Button, Container} from "@mui/material";

class GroupList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "Liam Stannard",
            groups: props.groups,
            group: null,
            group_idx: 0,
        };
    }

    componentDidMount(){
        if(this.state.group_idx < this.state.groups.length)
        {
            this.setState({group: this.state.groups[this.state.group_idx] }); 
        }
    }

  


    render() {

        if(this.state.group == null) 
        {
            return null
        }

        return (
            <Container maxWidth="sm">
                <Group 
                    title = {this.state.group.title}
                    description = {this.state.group.description}
                    cards = {this.state.group.cards}
                    > </Group>
                <Button
                    type="button"
                >Next</Button>
                <Button
                    type="button"
                >Answer</Button>
            </Container>
        );
    }

}

export default GroupList;