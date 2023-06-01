import React from "react";

function Temp() {
  return (
    <div className="temp-box">
      <div className="temp-title">
        <p className="info-title">temperature AA</p>
      </div>
      <div className="temp-bottom">
        <div className="temp-temp">
          <p>23ºc</p>
        </div>
        <div className="temp-feels">
          <p>feels like</p>
          <p>21ºc</p>
          {/* <div className="temp-feels-text">
            <p>feels like</p>
          </div>
          <div className="temp-feels-temp">
            <p>21ºc</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Temp;
