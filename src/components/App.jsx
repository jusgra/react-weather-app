import React, { useEffect, useState, useRef } from "react";
import Results from "./Results";

function App() {
  const [resultsState, setResults] = useState({ temp: "", time: "", city: "", timezone: "0" });
  const [inputState, setInput] = useState({ city: "", units: "metric" });
  const shouldEffect = useRef(false);

  async function buttonClick(e) {
    console.log("buttoned");
    e.preventDefault();
    setResults({ temp: "", time: "", city: "" });
    const url = urlConstruct(inputState.city, inputState.units);
    let response = await fetch(url);

    if (response.ok) {
      response = await response.json();
      const resTemp = response.list[0].main.temp;
      const resCity = response.city.name;
      const resTimezone = response.city.timezone;

      const timeSearch = getLocalTime(response.city.timezone);
      if (!shouldEffect.current) shouldEffect.current = !shouldEffect.current;
      setResults({
        temp: Math.floor(resTemp),
        time: timeSearch,
        city: resCity,
        timezone: resTimezone,
      });
    } else console.log("Response ERROR");
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
      {/* <div className="bg-image"></div> */}
      <Results className="results" city={resultsState.city} temp={resultsState.temp} time={resultsState.time} />

      <form onSubmit={buttonClick}>
        <input
          onChange={handleChange}
          autocomplete="off"
          value={inputState.city}
          type="text"
          name="city"
          placeholder="City name"
        ></input>
        <div className="inputs">
          <select onChange={handleChange} name="units">
            <option value="metric">&deg;C</option>
            <option value="imperial">&deg;F</option>
          </select>
          <button type="submit">Find</button>
        </div>
      </form>
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
