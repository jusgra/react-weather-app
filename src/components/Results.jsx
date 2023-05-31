import React from "react";
import Wind from "./Wind";
import Temp from "./Temp";

function Results(props) {
  props = { city: "asdasd", temp: 25, unit: "C", time: "14:59:23 PM" };
  return (
    <div className="result-container">
      <div className="results-top">
        <Wind />
        {/* <Temp /> */}
        {/* <Condition /> */}
      </div>
      {/* <div className="results-bottom">
        <p className="time-parg">{props.time}</p>
        <p className="city-parg">{props.city}</p>
        <p className="city-parg">{props.country}</p>
        <p className="temp-parg">{props.temp + "º" + props.unit}</p>
      </div> */}
    </div>
  );
}

export default Results;
