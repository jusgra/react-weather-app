import React from "react";

function Temp(props) {
  function getUnits(system) {
    console.log(system);
    if (system === "metric") {
      return "ºC";
    } else {
      return "ºF";
    }
  }
  //ºc
  return (
    <>
      <div className="temp-title-cell">
        <p className="info-title">
          temperature<i className="bi bi-thermometer-half"></i>
        </p>
      </div>
      <div className="temp-temp-cell">
        <p>
          {Math.round(props.temp)}
          {getUnits(props.units)}
        </p>
      </div>
      <div className="temp-feels-text-cell">
        <p>
          feels
          <br />
          like
        </p>
      </div>
      <div className="temp-feels-temp-cell">
        <p>
          {props.feels.toFixed(1)}
          {/* <br />
          {getUnits(props.units)} */}
        </p>
      </div>
    </>
  );
}

export default Temp;
