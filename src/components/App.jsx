import React, { useEffect, useState, useRef } from "react";
import Results from "./Results";

function App() {
  const [resultsState, setResults] = useState({ temp: "", time: "", city: "", timezone: "0" });
  const [inputState, setInput] = useState({ city: "", units: "metric" });
  const shouldEffect = useRef(false);

  async function buttonClick() {
    setResults({ temp: "", time: "", city: "" });
    const url = urlConstruct(inputState.city, inputState.units);
    let response = await fetch(url);

    if (response.ok) {
      response = await response.json();
      //console.log(response);
      const resTemp = response.list[0].main.temp;
      const resCity = response.city.name;
      const resTimezone = response.city.timezone;

      const timeSearch = getLocalTime(response.city.timezone);
      shouldEffect.current = !shouldEffect.current;
      setResults({
        temp: Math.floor(resTemp),
        time: timeSearch,
        city: resCity,
        timezone: resTimezone,
      });
    } else console.log("Response ERROR");
  }

  function stop() {
    shouldEffect.current = !shouldEffect.current;
  }

  useEffect(() => {
    if (!shouldEffect.current) {
      return;
    }
    const int = setInterval(() => {
      setResults((prevRes) => {
        return {
          ...prevRes,
          time: getLocalTime(resultsState.timezone),
        };
      });
    }, 1000);
    // setTimeout(() => {
    //   setResults((prevRes) => {
    //     return {
    //       ...prevRes,
    //       time: getLocalTime(resultsState.timezone),
    //     };
    //   });
    // }, 1000);
    return () => {
      clearInterval(int);
    };
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <>
      <input onChange={handleChange} value={inputState.city} type="text" name="city"></input>
      <select onChange={handleChange} name="units">
        <option value="metric">C</option>
        <option value="imperial">F</option>
      </select>
      <button onClick={buttonClick}>Find</button>
      <button onClick={stop}>ST</button>

      <Results city={resultsState.city} temp={resultsState.temp} time={resultsState.time} />
    </>
  );
}

function getLocalTime(timezone) {
  // const utc = new Date();
  // const offset = timezone / 3600;
  // const utcH = utc.getUTCHours() + offset;
  // const utcM = utc.getUTCMinutes();
  // const utcS = utc.getUTCSeconds();
  // return utcH + ":" + utcM + ":" + utcS;

  const dateNow = new Date();
  const offSet = timezone / 3600;
  //console.log(timezone / 3600);
  //console.log("dN - " + dateNow);
  const localHours = dateNow.getUTCHours() + offSet;
  dateNow.setHours(localHours);
  return dateNow.toLocaleTimeString();
}

function urlConstruct(city, unit) {
  const apiKey = process.env.REACT_APP_API_KEY;
  let urlFinal = "http://api.openweathermap.org/data/2.5/forecast?q=";

  urlFinal += city;
  urlFinal += "&appid=" + apiKey + "&units=" + unit;
  return urlFinal;
}

export default App;
