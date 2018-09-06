import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from "./Form";
import Stalk from "./Stalk";
import StalkList from "./StalkList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isEditForm: false,
      id: null,
      sightings: []
    }
    this.resetAppState = this.resetAppState.bind( this );
    this.getSightings = this.getSightings.bind( this );
    this.handleClick = this.handleClick.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.editItem = this.editItem.bind( this );
  }

  resetAppState() {
    console.log( `
      ***********************
      *
      *  ${this.state.isEditForm ? "PUT" : "POST"}
      *  We expect the App state to reset on PUT and POST.
      *
    ` );
    this.setState({
      id: null,
      isEditForm: false
    });
  }

  getSightings() {
    fetch( config.apiURL[ process.env.NODE_ENV || 'development' ], { mode: 'cors' })
      .then(( res ) => {
        if (res.status !== 200) {
          console.error( `HTTP status code: ${res.status}` );
          return;
        }

        return res.json()
      })
      .then(( json ) => {
        let sightings = json.map(( sighting ) => {
          let [y,mo,d,h,min] = sighting.date.split(/[-T:Z]/);
          sighting.date = new Date(y, mo - 1, d, h, min);
          return sighting;
        });
        return sightings;
      })
      .then(( sightings ) => {
        this.setState({ sightings: sightings });
      })
      .catch( e => console.error( e.stack ));
  }

  handleClick( id ) {
    this.setState({ id: id });
  }

  editItem( id ) {
    this.setState({ isEditForm: true });
  }

  deleteItem( id ) {
    fetch( `${config.apiURL[ process.env.NODE_ENV ]}/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(( res ) => {
        if (res.status !== 200) {
          console.error( `HTTP status code: ${res.status}` );
          return;
        }
        this.setState({ id: null });
        this.getSightings();
      })
      .catch( e => console.error( e.stack ));
  }

  componentDidMount() {
    this.getSightings();
  }

  render() {
    let item = this.state.sightings.find((sighting) =>
      sighting.id === this.state.id
    );

    return (
      <div className="App">

          <Form resetAppState={this.resetAppState} getSightings={this.getSightings} isEditForm={this.state.isEditForm} item={ this.state.isEditForm ? item : null} />
          <Route
            path="/:id"
            render={props => <Stalk { ...props } item={ item } onEdit={( id ) => this.editItem( id )} onDelete={( id ) => this.deleteItem( id )} />}
          />
          <Route
            path="/"
            render={ props => <StalkList { ...props} sightings={this.state.sightings} onClick={( id ) => this.handleClick( id )} />}
          />
      </div>
    );
  }
}

export default App;
