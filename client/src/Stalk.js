import React from "react";
import "./Stalk.css";

function Stalk(props) {
  return (
    <div id="Stalk">
      <p>
        <button onClick={() => props.onEdit(props.item.id)}>edit</button>
        <button onClick={() => props.onDelete(props.item.id)}>delete</button>
        {props.item.stalker} spotted {props.item.celebrity}
        {" on "}
        {props.item.date.toDateString()} in {props.item.location}: &quot;
        {props.item.comment}
        &quot;
      </p>
    </div>
  );
}

export default Stalk;
