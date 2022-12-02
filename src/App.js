import GroupList from "./components/group_list";
import React from 'react'
import Axios from 'axios'
import './App.css';
import { AppBar, Toolbar, Container, Offset, Typography} from "@mui/material";

class App extends React.Component {

  state = {
    groups: null
  }


  render() {

    if (this.state.groups == null) {
      console.log("groups is null");
      return null;
    }
    console.log("groups is not null");
    return (

      <div>
        <AppBar position="static">
          <Toolbar variant="dense">          
          </Toolbar>
        </AppBar>
          <GroupList groups={this.state.groups}></GroupList>
      </div>

    );
  }

  async getData() {
    const res = await Axios.get(' http://localhost:8000/group/')
    const { data } = await res;
    console.log(data);
    this.setState({ groups: data })
  }

  componentDidMount() {
    console.log("MOUNTED")
    this.getData()
  }

}



export default App;
