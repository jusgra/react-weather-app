import React from "react";

function Results(props) {
  //props = { city: "asdasd", temp: 25, time: "20:20:20" };
  return (
    <>
      <div className="outputTop">
        <p className="cityP">{props.city}</p>
        <p className="tempP">{props.temp && props.temp + "º" + props.unit}</p>
      </div>
      <p className="timeP">{props.time}</p>
    </>
  );
}

export default Results;
