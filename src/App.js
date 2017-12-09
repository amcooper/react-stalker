import React, { Component } from 'react';
import './App.css';
import config from './config.js';

class Form extends Component {

  constructor(props) {
    super(props);
    let date = new Date( Date.now());
    this.state = {
      celebrity: '',
      stalker: '',
      date: `${ date.toISOString().slice( 0, -1 )}`,
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
    console.info( 'handleChange', name, value );
    this.setState({
      [name]: value
    });
  }

  // handleChange( event ) {
  //   var partialState = {};
  //   partialState.formValues = {};
  //   partialState.formValues[ event.target.name ] = event.target.value;
  //   console.info( 'handleChange:', event.target.name, event.target.value );
  //   this.setState({ partialState });
  //   console.info( 'formValues', this.state.formValues );
  // }

  handleSubmit(event) {
    let data = new URLSearchParams();
    data.append('celebrity', this.state.celebrity);
    data.append('stalker', this.state.stalker);
    data.append('date', this.state.date);
    data.append('location', this.state.location);
    data.append('comment', this.state.comment);
    console.info(data.toString()); // debug

    event.preventDefault();
    console.log('Handle submit here'); // debug

    let fetchURL = config.apiURL + ( this.props.isEditForm ? `/${this.props.item ? this.props.item.id : ''}` : '' );
    console.info( 'config' );
    console.info( config );
    console.info( 'fetchURL', fetchURL );
    // if ( this.props.isEditForm ) {
    //   fetchURL += 
    // }
    let fetchMethod = this.props.isEditForm ? 'PUT' : 'POST';

    fetch(fetchURL, {
      method: fetchMethod,
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

  componentWillReceiveProps(nextProps) {
    if ( nextProps.item ) {
      this.setState({
      // set something
        celebrity: nextProps.item.celebrity || '',
        stalker: nextProps.item.stalker || '',
        date: nextProps.item.date.toISOString().slice( 0, -1 ) || '',
        location: nextProps.item.location || '',
        comment: nextProps.item.comment || '',
      });
    }
  }

  render() {
    console.info( 'render Form', this.props.item, this.state ); // debug

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
        <input type="submit" value={this.props.isEditForm ? "Update" : "Create"} />
      </form>
    )
  }
}

function Stalk(props) {
  return (
    <div>
      <p>
        <button onClick={() => props.onEdit( props.item.id )}>edit</button>
        <button onClick={() => props.onDelete( props.item.id )}>delete</button>
        { props.item.stalker } spotted { props.item.celebrity } on { props.item.date.toDateString() } in { props.item.location }: "{ props.item.comment }"
      </p>
    </div>
  )
}

function StalkListItem( props ) {
  return (
    <div onClick={() => props.onClick()}>
      <p>{ props.item.celebrity } on { props.item.date.toDateString() }</p>
    </div>
  )
}

class StalkList extends Component {
  render() {
    const itemList = this.props.sightings.map(( sighting ) =>
      <li key={ sighting.id }><StalkListItem item={sighting} onClick={() => this.props.onClick( sighting.id )} /></li>
    );

    return (
      <ul>
        { itemList }
      </ul>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isEditForm: false,
      id: null,
      sightings: []
    }
    this.getSightings = this.getSightings.bind( this );
    this.handleClick = this.handleClick.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.editItem = this.editItem.bind( this );
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
        console.info( 'json', json );
        let sightings = json.map(( sighting ) => {
          let [y,mo,d,h,min] = sighting.date.split(/[-T:Z]/); 
          sighting.date = new Date(y, mo, d, h, min);
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
    console.info('handleClick', id);
    this.setState({ id: id });
  }

  editItem( id ) {
    this.setState({
      // id: id,
      isEditForm: true
    });
  }

  deleteItem( id ) {
    fetch( `${config.apiURL}/${id}`, {
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
        // return res.json();
      })
      .catch( e => console.error( e.stack ));
      // .then(( res ))
  }

  componentDidMount() {
    this.getSightings();
  }

  render() {
    console.info( 'render App' ); // debug

    let item = this.state.sightings.find((sighting) =>
          sighting.id === this.state.id
        );

    return (
      <div className="App">
        <Form getSightings={this.getSightings} isEditForm={this.state.isEditForm} item={ this.state.isEditForm ? item : null} />
        { item !== undefined && <Stalk item={ item } onEdit={( id ) => this.editItem( id )} onDelete={( id ) => this.deleteItem( id )} /> }
        <StalkList sightings={this.state.sightings} onClick={( id ) => this.handleClick( id )} />
      </div>
    );
  }
}

export default App;
