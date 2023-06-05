import React, { useEffect, useState, useRef } from "react";
import Results from "./Results";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [resultsState, setResults] = useState({
    timezone: 0,
    time: "",
    city: "",
    units: "",
    windSpeed: 0,
    windDirection: -1,
    temp: "",
    feelsLike: "",
    mainCondition: "",
    conditionDesc: "",
    conditionIcon: "",
  });
  const [inputState, setInput] = useState({ city: "", units: "metric", unitName: "C" });
  const shouldEffect = useRef(false);
  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  // +feelslike - list[0].main.feels_like
  // +main condition - list[0].weather[0].main
  // +condition desc - list[0].weather[0].description
  // +wind speed m/s - list[0].wind.speed
  // +cond icon - list[0].weather[0].icon
  // +wind direct - list[0].wind.deg

  async function submitClick(e) {
    e.preventDefault();

    const url = urlConstruct(inputState.city, inputState.units);
    let response = await fetch(url);
    if (response.ok) {
      setResults({ temp: "", time: "", city: "" });
      response = await response.json();
      const responseObject = {
        timezone: response.city.timezone,
        city: response.city.name,
        units: inputState.units,
        windSpeed: response.list[0].wind.speed,
        windDirection: response.list[0].wind.deg,
        temp: response.list[0].main.temp,
        feelsLike: response.list[0].main.feels_like,
        mainCondition: response.list[0].weather[0].main,
        conditionDesc: response.list[0].weather[0].description,
        conditionIcon: response.list[0].weather[0].icon,
      };

      const timeSearch = getLocalTime(response.city.timezone);
      if (!shouldEffect.current) shouldEffect.current = !shouldEffect.current;
      setResults({
        timezone: responseObject.timezone,
        time: timeSearch,
        city: responseObject.city,
        units: responseObject.units,
        windSpeed: responseObject.windSpeed,
        windDirection: responseObject.windDirection,
        // temp: Math.floor(responseObject.temp),
        temp: responseObject.temp,
        feelsLike: responseObject.feelsLike,
        mainCondition: responseObject.mainCondition,
        conditionDesc: responseObject.conditionDesc,
        conditionIcon: responseObject.conditionIcon,
      });
    } else if (response.status === 400) {
      console.log(response.status);
      toast.warn("Please provide a city name 🏢", toastOptions);
    } else if (response.status === 404) {
      console.log(response.status);
      toast.error("Sorry, we couldn't find that city 😥", toastOptions);
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

  // useEffect(() => {
  //   if (!shouldEffect.current) {
  //     return;
  //   }
  //   const int = setInterval(() => {
  //     setResults((prevRes) => {
  //       return {
  //         ...prevRes,
  //         time: getLocalTime(resultsState.timezone),
  //       };
  //     });
  //   }, 1000);
  //   return () => {
  //     clearInterval(int);
  //   };
  // }, [resultsState]);

  return (
    <>
      <div className="inputs-container">
        <div className="bg-image"></div>
        <ToastContainer />

        <form onSubmit={submitClick}>
          <input
            onChange={handleTextChange}
            autoComplete="off"
            spellCheck="false"
            value={inputState.city}
            type="text"
            name="city"
            placeholder="City name"
          />
          <div className="button-inputs">
            <button className="unit-button" type="button" onClick={unitClick}>
              &deg;{inputState.unitName}
            </button>
            <button className="submit-button" type="submit">
              Find
            </button>
          </div>
        </form>
      </div>
      {resultsState.city && (
        <Results
          city={resultsState.city}
          units={resultsState.units}
          windSpeed={resultsState.windSpeed}
          windDirection={resultsState.windDirection}
          temp={resultsState.temp}
          feelsLike={resultsState.feelsLike}
          mainCondition={resultsState.mainCondition}
          conditionDesc={resultsState.conditionDesc}
          conditionIcon={resultsState.conditionIcon}

          // time={resultsState.time}
        />
      )}

      {/* {resultsState.temp && (
        <Results city={resultsState.city} temp={resultsState.temp} unit={resultsState.units} time={resultsState.time} />
      )} */}
    </>
  );
}

function getLocalTime(timezone) {
  const dateNow = new Date();
  const offSet = timezone / 3600;
  const localHours = dateNow.getUTCHours() + offSet;
  dateNow.setHours(localHours);
  return dateNow.toLocaleTimeString();
  //return dateNow.toLocaleTimeString("en-GB");
}

function urlConstruct(city, unit) {
  const apiKey = process.env.REACT_APP_API_KEY;
  let urlFinal = "http://api.openweathermap.org/data/2.5/forecast?q=";
  urlFinal += city + "&appid=" + apiKey + "&units=" + unit;

  return urlFinal;
}

export default App;
