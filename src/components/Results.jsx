import React from "react";

function asibdjads() {
  console.log("changed");
}

function Results(props) {
  props = { city: "asdasd", temp: 25, unit: "C", time: "14:59:23 PM" };
  return (
    <>
      <div className="results-top-layer">
        <p className="city-parg">{props.city}</p>
        <p className="temp-parg">{props.temp && props.temp + "º" + props.unit}</p>
      </div>
      <p className="time-parg">{props.time}</p>
    </>
  );
}

export default Results;
