/// <reference path="./interfaces.d.ts" />

import * as React from "react";
import { Component } from "react";
import "./StalkList.css";
import StalkListItem from "./StalkListItem";

class StalkList extends Component<IStalkListProps, {}> {
  render() {
    const itemList = this.props.sightings.map(sighting => (
      <li key={sighting.id}>
        <StalkListItem
          item={sighting}
          onClick={() => this.props.onClick(sighting.id)}
        />
      </li>
    ));

    return <ul className="StalkList">{itemList}</ul>;
  }
}

export default StalkList;
