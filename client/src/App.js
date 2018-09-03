import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let data = new URLSearchParams();
    data.append('celebrity', this.state.celebrity);
    data.append('stalker', this.state.stalker);
    data.append('date', this.state.date);
    data.append('location', this.state.location);
    data.append('comment', this.state.comment);

    event.preventDefault();

    let fetchURL = `
      ${config.apiURL[ process.env.NODE_ENV ]}${( this.props.isEditForm ? `/${this.props.item ? this.props.item.id : ''}` : '' )}`;
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
      this.props.resetAppState();
      this.props.getSightings();
      return res.json();
    })
    .catch((e) => {console.error(e.stack); });
  }

  resetForm() {
    let date = new Date( Date.now());
    this.setState({
      celebrity: '',
      stalker: '',
      date: `${ date.toISOString().slice( 0, -1 )}`,
      location: '',
      comment: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.item ) {
      this.setState({
        celebrity: nextProps.item.celebrity || '',
        stalker: nextProps.item.stalker || '',
        date: nextProps.item.date.toISOString().slice( 0, -1 ) || '',
        location: nextProps.item.location || '',
        comment: nextProps.item.comment || '',
      });
    }
  }

  render() {
    return (
      <form id='input-form' onSubmit={this.handleSubmit}>
        <div>
          <label>Celebrity:</label>
          <input type="text" name="celebrity" value={this.state.celebrity} onChange={this.handleChange} />
        </div>
        <div>
          <label>Stalker:</label>
          <input type="text" name="stalker" value={this.state.stalker} onChange={this.handleChange} />
        </div>
        <div>
          <label>Date and time:</label>
          <input type="datetime-local" name="date" value={this.state.date} onChange={this.handleChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
        </div>
        <div>
          <label>Comment:</label>
          <textarea name="comment" value={this.state.comment} onChange={this.handleChange} />
        </div>
        <input type="submit" value={this.props.isEditForm ? "Update" : "Create"} />
      </form>
    )
  }
}

function Stalk( props ) {
  return (
    <div id="Stalk">
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
    <div className="StalkListItem" onClick={() => props.onClick()}>
    <Link to={`${ props.item.id }`}>
      <p>{ props.item.celebrity } on { props.item.date.toDateString() }</p>
    </Link>
    </div>
  )
}

class StalkList extends Component {
  render() {
    const itemList = this.props.sightings.map(( sighting ) =>
      <li key={ sighting.id }><StalkListItem item={sighting} onClick={() => this.props.onClick( sighting.id )} /></li>
    );

    return (
      <ul id="StalkList">
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
    this.resetAppState = this.resetAppState.bind( this );
    this.getSightings = this.getSightings.bind( this );
    this.handleClick = this.handleClick.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.editItem = this.editItem.bind( this );
  }

  resetAppState() {
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
      <Router>
      <div className="App">
        <Form resetAppState={this.resetAppState} getSightings={this.getSightings} isEditForm={this.state.isEditForm} item={ this.state.isEditForm ? item : null} />
        {/* { item !== undefined && <Stalk item={ item } onEdit={( id ) => this.editItem( id )} onDelete={( id ) => this.deleteItem( id )} /> } */}
        <Route 
          path={`/${this.state.id}`} 
          render = {props => {<Stalk { ...props } />}}
        />
        <StalkList sightings={this.state.sightings} onClick={( id ) => this.handleClick( id )} />
      </div>
      </Router>
    );
  }
}

export default App;
