import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import conditions from "../conditions";

export default function Condition(props) {
  //console.log(props.conditionIcon);
  // console.log(conditions[1].number);

  return (
    <>
      <div className="condition-title-cell">
        <p className="info-title">
          condition <i className="bi bi-globe-americas"></i>
        </p>
      </div>
      <div className="condition-condition-cell">
        <p>{props.conditionDesc}</p>
      </div>
      <div className="condition-icon-cell">
        <p>
          <i className={"bi " + getConditionIcon(props.conditionIcon)}></i>
        </p>
      </div>
    </>
  );
}

function getConditionIcon(icon) {
  const found = conditions.find((cond) => {
    return cond.icon === icon;
  });
  return found.class;
}
