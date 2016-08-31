import React from "react";

// Components
import NavBar from './components/navbar';
import Mentions from './components/mentions';

var App = React.createClass({
  render(){
    return (
      <div>
        <NavBar />
        <Mentions />
      </div>
    )
  }
})
export default App;
