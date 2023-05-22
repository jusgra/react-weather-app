import React from "react";

function Results(props) {
  return (
    <div>
      <p>City</p>
      <p>Time</p>
      <p>{props.temp} C</p>
    </div>
  );
}

export default Results;
