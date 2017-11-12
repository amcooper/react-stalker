import React, { Component } from 'react';
import './App.css';
// import sightings from './sightings.json';
import config from './config.js';

class Form extends Component {
// this should be a controlled component, more like the guide

  constructor(props) {
    super(props);
    this.state = {
      sightings: {
        celebrity: '',
        stalker: '',
        date: null,
        location: '',
        comment: ''
      }
    };

    this.handleChange = this.handleChange.bind( this );
  }
  
  handleChange( event ) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Celebrity: <input type="text" value={this.props.formValues.celebrity} />
        </label>
        <br />
        <label>
          Stalker: <input type="text" value={this.props.formValues.stalker} />
        </label>
        <br />
        <label>
          Date and time: <input type="datetime-local" value={this.props.formValues.date} />
        </label>
        <br />
        <label>
          Location: <input type="text" value={this.props.formValues.location} />
        </label>
        <br />
        <label>
          Comment: <textarea value={this.props.formValues.comment} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

function Stalk(props) {
  return (
    <div>
      <p>{ props.item.celebrity } - { props.item.stalker } - { props.item.date } - { props.item.location } - { props.item.comment }</p>
    </div>
  )
}

function StalkListItem( props ) {
  return (
    <div>
      <p>{ props.item.celebrity } on { props.item.date }</p>
    </div>
  )
}

function StalkList(props) {
  const itemList = props.sightings.map( (sighting) =>
    <li key={ sighting.id }><StalkListItem item={sighting} /></li>
  );
  return (
    <ul>
      { itemList }
    </ul>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: true,
      id: 0,
      sightings: [],
      formValues: {
        celebrity: '',
        stalker: '',
        date: '',
        location: '',
        comment: ''
      }
    }
  }
  
  getSightings() {
    fetch( config.apiURL, { mode: 'cors' })
      .then(( res ) => { 
        if (res.status !== 200) {
          console.error( `HTTP status code: ${res.status}` );
          return;
        }

        return res.json()
      })
      .then(( json ) => {
        console.info( json ); // debug
        this.setState({ sightings: json });
      })
      .catch( e => console.error( e.stack ));
  }

  resetForm() {
    this.setState({
      formValues: {
        celebrity: '',
        stalker: '',
        date: '',
        location: '',
        comment: ''
      }
    });
  }
  
  handleSubmit(event) {
    const newSightings = this.state.sightings.slice();
    newSightings.push(event.target);
    this.setState({sightings: newSightings});
    // probably can reset form values here
    this.resetForm();
    event.preventDefault();
  }
  
  componentDidMount() {
    this.getSightings();
  }	

  render() {
    let item = this.state.sightings.find((sighting) =>
          sighting.id === this.state.id
        );

    console.info( item );

    return (
      <div className="App">
        <Form formValues={ this.state.formValues } handleSubmit={ this.handleSubmit } />
        
        <StalkList sightings={this.state.sightings} /> 
      </div>
    );
  }
}

export default App;
