import React from "react";
import { Link } from "react-router-dom";

function StalkListItem(props) {
  return (
    <Link to={`/${props.item.id}`}>
      <p className="StalkListItem" onClick={() => props.onClick()}>
        {props.item.celebrity} on {props.item.date.toDateString()}
      </p>
    </Link>
  );
}

export default StalkListItem;
