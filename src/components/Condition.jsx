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
  console.log("icon- " + icon);
  // return conditions.clearSky.icon;
  const found = conditions.find((cond) => {
    //console.log(cond.icon);
    return cond.icon === icon;
  });
  console.log(found);
  // console.log(found);
  //console.log("found - " + found[0].number);
  // return found.class;
  return found.class;
}
