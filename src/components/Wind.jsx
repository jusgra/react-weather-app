import React from "react";

function Wind(props) {
  const calculatedSpeed = {
    lowerSpeed: lowerUnitSpeed(props.speed),
    upperSpeed: lowerUnitSpeed(props.speed * 3.6),
  };

  function unitImperial() {
    return (
      <div className="wind-speed-3">
        <p>{calculatedSpeed.lowerSpeed}</p>
        <p className="unit-class">m/ph</p>
      </div>
    );
  }

  function unitMetric() {
    return (
      <>
        <div className="wind-speed-1">
          <p>{calculatedSpeed.lowerSpeed}</p>
          <p className="unit-class">m/s</p>
        </div>
        <div className="wind-speed-2">
          <p>{calculatedSpeed.upperSpeed}</p>
          <p className="unit-class">km/h</p>
        </div>
      </>
    );
  }

  function arrowDisplay(degree) {
    return (
      <>
        <p style={{ transform: "rotate(" + degree + "deg)" }} className="wind-arrow">
          <i className="bi bi-arrow-up" />
        </p>
      </>
    );
  }

  return (
    <>
      <div className="wind-title">
        <p className="info-title">
          wind <i className="bi bi-wind"></i>
        </p>
      </div>
      {props.units === "metric" ? unitMetric() : unitImperial()}
      <div className="wind-dir">
        <p>{windDirection(props.dir)}</p>
        {arrowDisplay(props.dir + 180)}
      </div>
    </>
  );
}

function lowerUnitSpeed(speed) {
  const calculated = Math.round(speed * 10) / 10;
  return calculated;
}

function windDirection(degree) {
  console.log("degree from api - " + degree);
  const directions = [
    "n",
    "n/ne",
    "ne",
    "e/ne",
    "e",
    "e/se",
    "se",
    "s/se",
    "s",
    "s/sw",
    "sw",
    "w/sw",
    "w",
    "w/nw",
    "nw",
    "n/nw",
    "n",
  ];
  //console.log(directions[0]);
  const windSectionSplitDegree = 11.25;
  degree = 85;
  var loopCount = 0;
  for (var i = 0; i <= 360; i += windSectionSplitDegree) {
    if (i >= degree) return directions[Math.floor(loopCount)];
    loopCount += 0.5;
  }
}

export default Wind;
