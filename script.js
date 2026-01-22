document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDsiplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMesage = document.getElementById("error-message");

  const API_KEY = "YOUR_API_KEY"; //REMARK: replace YOUR_API_KEY_HERE with your actual API key from OpenWeatherMap

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return; //empty string is considerd to be false

    //REMARK: tro importent thing about API server call and databace call
    //1. it may throw some error so always maintain try-catch type error handeling cases
    //2. the server may be in different continant so it may take few time to send responds so always maintain async await type synchronous process

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    cityInput.value = "";
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const responce = await fetch(url);

    /*console.log(typeof responce);
    console.log("RESPONCE", responce);  //jusct for checking the api call is perfectly works or not

    if (!responce.ok) {
      throw new Error("City Not Found!");
      }*/

    const data = await responce.json(); //.json() → converts it into a JavaScript object
    return data;
  }
  function displayWeatherData(data) {
    //display the data
    console.log(data);
    const { name, main, weather } = data; //destructuring of variable
    cityNameDsiplay.textContent = `${name}`;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMesage.classList.add("hidden");
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMesage.classList.remove("hidden");
  }
});
