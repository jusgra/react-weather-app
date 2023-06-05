import React from "react";

function Temp(props) {
  return (
    <>
      <div className="temp-title">
        <p className="info-title">
          temperature<i className="bi bi-thermometer-half"></i>
        </p>
      </div>
      <div className="temp-temp">
        <p>{props.temp}</p>
        <p className="unit-class">ºc</p>
      </div>
      <div className="temp-feels-text">
        <p>feels like</p>
      </div>
      <div className="temp-feels-temp">
        <p>{props.feels}</p>
        <p className="unit-class">ºc</p>
      </div>
    </>
  );
}

export default Temp;
