import React, { useEffect, useState, useRef } from "react";
import Results from "./Results";

function App() {
  const [resultsState, setResults] = useState({ city: "", temp: "", time: "", timezone: "0", units: "" });
  const [inputState, setInput] = useState({ city: "", units: "metric", unitName: "C" });
  const shouldEffect = useRef(false);

  async function submitClick(e) {
    console.log("request sent to API");
    e.preventDefault();

    const url = urlConstruct(inputState.city, inputState.units);
    let response = await fetch(url);

    if (response.ok) {
      setResults({ temp: "", time: "", city: "" });
      response = await response.json();
      const resTemp = response.list[0].main.temp;
      const resCity = response.city.name;
      const resTimezone = response.city.timezone;
      const resUnit = inputState.unitName;

      const timeSearch = getLocalTime(response.city.timezone);
      if (!shouldEffect.current) shouldEffect.current = !shouldEffect.current;
      setResults({
        temp: Math.floor(resTemp),
        time: timeSearch,
        city: resCity,
        timezone: resTimezone,
        units: resUnit,
      });
    } else {
      console.log("inside response error -" + shouldEffect.current);
      //if (shouldEffect.current) shouldEffect.current = !shouldEffect.current;
      console.log("Response ERROR");
    }
  }

  function handleTextChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function unitClick() {
    if (inputState.unitName === "C") {
      setInput((prevInput) => {
        return { ...prevInput, units: "imperial", unitName: "F" };
      });
    } else {
      setInput((prevInput) => {
        return { ...prevInput, units: "metric", unitName: "C" };
      });
    }
  }

  useEffect(() => {
    if (!shouldEffect.current) {
      return;
    }
    const int = setInterval(() => {
      console.log("inside interval");
      setResults((prevRes) => {
        return {
          ...prevRes,
          time: getLocalTime(resultsState.timezone),
        };
      });
    }, 1000);
    return () => {
      clearInterval(int);
    };
  });

  // useEffect(() => {
  //   if (!shouldEffect.current) {
  //     return;
  //   }
  //   const int = runInterval();
  //   return () => {
  //     clearInterval(int);
  //   };
  // });

  // function runInterval() {
  //   setInterval(() => {
  //     console.log("inside interval");
  //     setResults((prevRes) => {
  //       return {
  //         ...prevRes,
  //         time: getLocalTime(resultsState.timezone),
  //       };
  //     });
  //   }, 1000);
  // }

  return (
    <>
      {/* <div className="bg-image"></div> */}

      <form onSubmit={submitClick}>
        <input
          onChange={handleTextChange}
          autoComplete="off"
          value={inputState.city}
          type="text"
          name="city"
          placeholder="City name"
        ></input>
        <div className="inputs">
          <button className="unitButton" type="button" onClick={unitClick}>
            &deg;{inputState.unitName}
          </button>
          <button className="submitButton" type="submit">
            Find
          </button>
        </div>
      </form>

      <Results
        className="results"
        city={resultsState.city}
        temp={resultsState.temp}
        unit={resultsState.units}
        time={resultsState.time}
      />
    </>
  );
}

function getLocalTime(timezone) {
  const dateNow = new Date();
  const offSet = timezone / 3600;
  const localHours = dateNow.getUTCHours() + offSet;
  dateNow.setHours(localHours);
  return dateNow.toLocaleTimeString("en-GB");
}

function urlConstruct(city, unit) {
  const apiKey = process.env.REACT_APP_API_KEY;
  let urlFinal = "http://api.openweathermap.org/data/2.5/forecast?q=";

  urlFinal += city;
  urlFinal += "&appid=" + apiKey + "&units=" + unit;
  return urlFinal;
}

export default App;
