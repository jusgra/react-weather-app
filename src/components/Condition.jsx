import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Condition(props) {
  return (
    <>
      <div className="condition-title">
        <p className="info-title">
          condition <i className="bi bi-globe2"></i>
        </p>
      </div>
      <div className="condition-condition">
        <p>{props.condDesc}</p>
      </div>
      <div className="condition-icon">
        <p>
          <i className="bi bi-cloud-drizzle"></i>
        </p>
      </div>
    </>
  );
}
