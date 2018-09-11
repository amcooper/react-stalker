import React from "react";
import { Link } from "react-router-dom";

function StalkListItem( props ) {
  return (
    <Link to={`/${ props.item.id }`}>
      <div className="StalkListItem" onClick={() => props.onClick()}>
        {/* <p>{ props.item.celebrity } on { props.item.date.toDateString() }</p> */}
        <p>{ props.item.celebrity } at { props.item.location }</p>
      </div>
    </Link>
  )
}

export default StalkListItem;
