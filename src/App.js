import React, { Component } from 'react';
import './App.css';
// import sightings from './sightings.json';

class Form extends Component {
// this should be a controlled component, more like the guide
  constructor(props) {
    super(props);

  }
  
  handleChange(){
      
  }
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Celebrity: <input type="text" value={this.props.formValues.celeb} />
        </label>
        <label>
          Stalker: <input type="text" value={this.props.formValues.stalker} />
        </label>
        <label>
          Date and time: <input type="datetime-local" value={this.props.formValues.dateTime} />
        </label>
        <label>
          Location: <input type="text" value={this.props.formValues.location} />
        </label>
        <label>
          Comment: <textarea value={this.props.formValues.comment} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

function Stalk(props) {
  return (
    <div>
      <p>{ props.item.celeb } - { props.item.stalker } - { props.item.dateTime } - { props.item.location } - { props.item.comment }</p>
    </div>
  )
}

function StalkListItem( props ) {
  return (
    <div>
      <p>{ props.item.celeb } on { props.item.dateTime }</p>
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
        celeb: '',
        stalker: '',
        dateTime: '',
        location: '',
        comment: ''
      }
    }
  }
  
  resetForm() {
    this.setState({
      formValues: {
        celeb: '',
        stalker: '',
        dateTime: '',
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
    fetch( 'sightings.json' )
      .then(( response ) => { return response.json(); })
      .then(( data ) => { 
        // console.log( data, '***' );
        this.setState({ sightings: data }); 
        // return 
      });
  }
  		
  render() {
    const item = this.state.sightings.find(( sighting ) => sighting.id === this.state.id );

    console.info( this.state.id, this.state.sightings, item ); // debug
    return (
      <div className="App">
        <Form formValues={ this.state.formValues } handleSubmit={ this.handleSubmit } />
        <Stalk item={ item } />
        <StalkList sightings={this.state.sightings} /> 
      </div>
    );
  }
}

export default App;
