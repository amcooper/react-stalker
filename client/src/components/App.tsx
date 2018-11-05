/// <reference path="interfaces.d.ts" />

import * as React from "react";
import { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Form from "./Form";
import Stalk from "./Stalk";
import StalkList from "./StalkList";

export class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isEditForm: false,
      id: null,
      sightings: []
    };
    this.resetAppState = this.resetAppState.bind(this);
    this.getSightings = this.getSightings.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  public resetAppState() {
    this.setState({
      id: null,
      isEditForm: false
    });
  }

  public getSightings() {
    fetch("/api/v1/sightings", {
      mode: "cors"
    })
      .then(res => {
        if (res.status !== 200) {
          console.error(`HTTP status code: ${res.status}`);
          return;
        }

        return res.json();
      })
      .then(json => {
        let sightings = json.map((sighting: ISighting) => {
          let [y, mo, d, h, min] = sighting.date.split(/[-T:Z]/);
          sighting.date = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(min));
          return sighting;
        });
        return sightings;
      })
      .then(sightings => {
        this.setState({ sightings: sightings });
      })
      .catch(e => console.error(e.stack));
  }

  public handleClick(id: number) {
    this.setState({ id: id });
  }

  public editItem() {
    this.setState({ isEditForm: true });
  }

  public deleteItem(id: number) {
    fetch(`api/v1/sightings/${id}`, {
      method: "DELETE",
      mode: "cors"
    })
      .then(res => {
        if (res.status !== 200) {
          console.error(`HTTP status code: ${res.status}`);
          return;
        }
        this.setState({ id: null });
        this.getSightings();
      })
      .catch(e => console.error(e.stack));
  }

  public componentDidMount() {
    this.getSightings();
  }

  public render() {
    let item = this.state.sightings.find(
      (sighting: ISighting) => sighting.id === this.state.id
    );

    return (
      <div className="App">
        <Form
          resetAppState={this.resetAppState}
          getSightings={this.getSightings}
          isEditForm={this.state.isEditForm} // TODO Refactor; this is probably spurious.
          item={this.state.isEditForm ? item : null}
        />
        <Route
          path="/:id"
          render={props =>
            item == null ? (
              <Redirect to="/" />
            ) : (
              <Stalk
                {...props}
                item={item}
                onEdit={this.editItem}
                onDelete={(id: number) => this.deleteItem(id)}
              />
            )
          }
        />
        <Route
          path="/"
          render={props => (
            <StalkList
              {...props}
              sightings={this.state.sightings}
              onClick={id => this.handleClick(id)}
            />
          )}
        />
      </div>
    );
  }
}
