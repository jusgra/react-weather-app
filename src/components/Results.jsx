import React from "react";
import Wind from "./Wind";
import Temp from "./Temp";
import Condition from "./Condition";

function Results(props) {
  // props = { city: "asdasd", temp: 25, unit: "C", time: "14:59:23 PM" };

  return (
    <div className="results-top">
      <div className="grid-container">
        <Wind speed={props.windSpeed} dir={props.windDirection} units={props.units} />
        <Temp temp={props.temp} feels={props.feelsLike} />
        <Condition condDesc={props.conditionDesc} />
        {/* <div className="results-bottom">
        <p className="time-parg">{props.time}</p>
        <p className="city-parg">{props.city}</p>
        <p className="city-parg">{props.country}</p>
        <p className="temp-parg">{props.temp + "º" + props.unit}</p>
      </div> */}
      </div>
    </div>
  );
}

export default Results;
