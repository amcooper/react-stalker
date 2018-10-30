/// <reference path="interfaces.d.ts" />

import * as React from "react";
import { Component } from "react";
import "./Form.css";

export default class Form extends Component<{}, IFormState> {
  constructor(props: {}) {
    super(props);
    let date = new Date(Date.now());
    this.state = {
      celebrity: "",
      stalker: "",
      date: `${date.toISOString().slice(0, -1)}`,
      location: "",
      comment: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let data = new URLSearchParams();
    data.append("celebrity", this.state.celebrity);
    data.append("stalker", this.state.stalker);
    data.append("date", this.state.date);
    data.append("location", this.state.location);
    data.append("comment", this.state.comment);

    event.preventDefault();

    let fetchURL = `/api/v1/sightings${
      this.props.isEditForm
        ? `/${this.props.item ? this.props.item.id : ""}`
        : ""
    }`;
    let fetchMethod = this.props.isEditForm ? "PUT" : "POST";

    fetch(fetchURL, {
      method: fetchMethod,
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: data,
      mode: "cors"
    })
      .then(res => {
        this.resetForm();
        this.props.resetAppState();
        this.props.getSightings();
        return res.json();
      })
      .catch(e => {
        console.error(e.stack);
      });
  }

  resetForm() {
    let date = new Date(Date.now());
    this.setState({
      celebrity: "",
      stalker: "",
      date: `${date.toISOString().slice(0, -1)}`,
      location: "",
      comment: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      this.setState({
        celebrity: nextProps.item.celebrity || "",
        stalker: nextProps.item.stalker || "",
        date: nextProps.item.date.toISOString().slice(0, -1) || "",
        location: nextProps.item.location || "",
        comment: nextProps.item.comment || ""
      });
    }
  }

  render() {
    return (
      <form id="input-form" onSubmit={this.handleSubmit}>
        <div>
          <label>Celebrity:</label>
          <input
            type="text"
            name="celebrity"
            value={this.state.celebrity}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Stalker:</label>
          <input
            type="text"
            name="stalker"
            value={this.state.stalker}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Date & time:</label>
          <input
            type="datetime-local"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </div>
        <input
          type="submit"
          value={this.props.isEditForm ? "Update" : "Create"}
        />
      </form>
    );
  }
}
