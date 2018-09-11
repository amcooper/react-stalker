import React, { Component } from "react";
import "./StalkList.css";
import StalkListItem from "./StalkListItem";

class StalkList extends Component {
  render() {

    const itemList = this.props.sightings.map(( sighting ) =>
      <li key={sighting.id}><StalkListItem item={sighting} onClick={() => this.props.onClick( sighting.id )} /></li>
    );

    return (
      <ul id="StalkList">
        { itemList }
      </ul>
    )
  }
}

export default StalkList;
