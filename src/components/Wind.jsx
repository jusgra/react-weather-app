import React from "react";

function Wind(props) {
  const convertedSpeed = {
    lowerSpeed: lowerUnitSpeed(props.speed),
    upperSpeed: lowerUnitSpeed(props.speed * 3.6),
  };

  function unitMetric() {
    return (
      <>
        <div className="wind-speed-1-cell">
          <p className="wind-numeral">{convertedSpeed.lowerSpeed}</p>
          <p className="wind-text">m/s</p>
        </div>
        <div className="wind-speed-2-cell">
          <p className="wind-numeral">{convertedSpeed.upperSpeed}</p>
          <p className="wind-text">km/h</p>
        </div>
      </>
    );
  }

  function unitImperial() {
    return (
      <div className="wind-speed-3-cell">
        <p className="wind-numeral">{convertedSpeed.lowerSpeed}</p>
        <p className="wind-text">m/ph</p>
      </div>
    );
  }

  function arrowDisplay(degree) {
    return (
      <>
        <p className="wind-numeral" style={{ transform: "rotate(" + degree + "deg)" }}>
          <i className="bi bi-arrow-up" />
        </p>
      </>
    );
  }

  return (
    <>
      <div className="wind-title-cell">
        <p className="info-title">
          wind <i className="bi bi-wind"></i>
        </p>
      </div>
      {props.units === "metric" ? unitMetric() : unitImperial()}
      <div className="wind-dir-cell">
        <p className="wind-text">wind direction</p>
        <div className="wind-directions">
          <p className="wind-numeral">{windDirection(props.dir)}</p>
          {arrowDisplay(props.dir + 180)}
        </div>
      </div>
    </>
  );
}

function lowerUnitSpeed(speed) {
  const calculated = (Math.round(speed * 10) / 10).toFixed(1);
  return calculated;
}

function windDirection(degree) {
  // console.log("degree from api - " + degree);
  const directions = [
    "N",
    "N/NE",
    "NE",
    "E/NE",
    "E",
    "E/SE",
    "SE",
    "S/SE",
    "S",
    "S/SW",
    "SW",
    "W/SW",
    "W",
    "W/NW",
    "NW",
    "N/NW",
    "N",
  ];
  //console.log(directions[0]);
  const windSectionSplitDegree = 11.25;
  //degree = 85;
  var loopCount = 0;
  for (var i = 0; i <= 360; i += windSectionSplitDegree) {
    if (i >= degree) return directions[Math.floor(loopCount)];
    loopCount += 0.5;
  }
}

export default Wind;
