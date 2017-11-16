import React, { Component } from 'react';
import './App.css';
// import sightings from './sightings.json';
import config from './config.js';

class Form extends Component {
// this should be a controlled component, more like the guide

  constructor(props) {
    super(props);
    this.state = {
      celebrity: '',
      stalker: '',
      date: '',
      location: '',
      comment: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( event ) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // let data = new FormData();
    let data = new URLSearchParams();
    data.append('celebrity', this.state.celebrity);
    data.append('stalker', this.state.stalker);
    data.append('date', this.state.date);
    data.append('location', this.state.location);
    data.append('comment', this.state.comment);
    console.info(data);

    event.preventDefault();
    console.log('Handle submit here');

    fetch(config.apiURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: data,
      mode: 'cors'
    })
    .then((res) => {
      this.resetForm();
      this.props.getSightings();
      return res.json();
    })
    .catch((e) => {console.error(e.stack); });
  }

  resetForm() {
    this.setState({
      celebrity: '',
      stalker: '',
      date: '',
      location: '',
      comment: ''
    });
  }

  render() {
    return (
      <form id='input-form' onSubmit={this.handleSubmit}>
        <label>
          Celebrity: <input type="text" name="celebrity" value={this.state.celebrity} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Stalker: <input type="text" name="stalker" value={this.state.stalker} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Date and time: <input type="datetime-local" name="date" value={this.state.date} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Location: <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Comment: <textarea name="comment" value={this.state.comment} onChange={this.handleChange} />
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
      id: 19,
      sightings: []
      // formValues: {
      //   celebrity: '',
      //   stalker: '',
      //   date: '',
      //   location: '',
      //   comment: ''
      // }
    }
    this.getSightings = this.getSightings.bind( this ); // debug
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
        console.log('GET req'); // debug
        this.setState({ sightings: json });
      })
      .catch( e => console.error( e.stack ));
  }

  // resetForm() {
  //   this.setState({
  //     formValues: {
  //       celebrity: '',
  //       stalker: '',
  //       date: '',
  //       location: '',
  //       comment: ''
  //     }
  //   });
  // }

  componentDidMount() {
    this.getSightings();
  }

  render() {
    let item = this.state.sightings.find((sighting) =>
          sighting.id === this.state.id
        );

    // console.info( item );

    return (
      <div className="App">
        <Form getSightings={this.getSightings} />
        { item !== undefined && <Stalk item={ item } /> }
        <StalkList sightings={this.state.sightings} />
      </div>
    );
  }
}

export default App;
