import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Form(props) {
  return (
    <div>
      FORM
    </div>
  )
}

function Stalk(props) {
  return (
    <div>
      STALK {this.props.id}
    </div>
  )
}

function StalkList(props) {
  return (
    <div>
      STALKLIST
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: true,
      id: -1
    }
  }
  		
  render() {
    return (
      <div className="App">
        <Form />
        <div>
	  ({ this.state.list } ? <StalkList /> : <Stalk id={ this.state.id } />) 
	</div>
      </div>
    );
  }
}

export default App;
