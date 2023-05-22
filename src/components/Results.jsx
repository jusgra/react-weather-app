import React from "react";

function Results(props) {
  return (
    <div>
      <p>
        {props.city} - {props.temp} - {props.time}
      </p>
    </div>
  );
}

export default Results;
