import React, { useState } from "react";
import Results from "./Results";

function App() {
  const [temp, setTemp] = useState("");
  const [input, setInput] = useState("");

  async function fetchData() {
    const url = urlConstruct(input);
    const res = await (await fetch(url)).json();

    const temperature = res.list[0].main.temp;
    setTemp(temperature);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <input onChange={handleChange} value={input} type="text" name="city"></input>
      <button onClick={fetchData}>Find</button>

      <Results temp={temp} />
    </>
  );
}

function urlConstruct(city) {
  let urlFinal = "http://api.openweathermap.org/data/2.5/forecast?q=";
  urlFinal += city;
  urlFinal += "&appid=07114249c56ab90d33cd37ba77f078b5&units=metric";
  return urlFinal;
}

export default App;
