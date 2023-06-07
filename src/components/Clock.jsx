import React from "react";

export default function Clock(props) {
  return (
    <div className="results-bottom">
      <div className="grid-container-clock">
        <div className="clock-time">
          <p>{props.time}</p>
        </div>
        <div className="clock-city">
          <p>{props.city}</p>
        </div>
        <div className="clock-date">
          <p>{converToDate(props.date)}</p>
        </div>
      </div>
    </div>
  );
}

function converToDate(unixStamp) {
  var date = new Date(unixStamp * 1000);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
}
