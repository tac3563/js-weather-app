import "./styles/main.scss";

/*  1. Authenticate API with the API Key 
    2. Data to be fetched by the API:
        2a. Todays Temperature 
        2b. Todays min/max temp
        2c. Todays chance of rain, humidity, wind
        2d. Todays 24 hour forecast in a side scroll
        2e. Weekly forecast and convert dates into days of the week
    3. Fetch relevant data and handle any errors
    4. Add event listeners to fetch the data when triggered (location selected from dropdown)
    5. Add logic to change the icons depending on the data retrieved
    6. Set up Jest and create mock tests for the api retrieval and event handlers
*/

const weatherApiKey = "ecc04dd12dfc427a81f192018230307";
const baseUrl = "http://api.weatherapi.com/v1";
const currentWeatherIconElement = document.getElementById("header-img");
const currentTempElement = document.getElementById("current-temp");
const currentMinTempElement = document.getElementById("current-min-temp");
const currentMaxTempElement = document.getElementById("current-max-temp");
const forecastElement = document.getElementById("weekly-forecast-container");
const currentPrecipElement = document.getElementById('current-precip');
const currentHumidityElement = document.getElementById('current-humidity')
const currentWindElement = document.getElementById('current-wind')


async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network error");
  }
  return response.json();
}

async function getCurrentTemp(location) {
  try {
    const url = `${baseUrl}/current.json?key=${weatherApiKey}&q=${location}`;
    const data = await fetchData(url);
    const currentTemp = data.current.temp_c;
    const currentWeather = data.current.condition.icon;
    currentWeatherIconElement.src = `${currentWeather}`;
    currentTempElement.textContent = `${currentTemp}\u00B0`;

    

    const currentHumidity = data.current.humidity;
    const currentWindSpeed = Math.round(data.current.gust_kph);
    const currentPreciptiation = data.current.precip_mm;
    
    currentPrecipElement.textContent = `${currentPreciptiation}%`;
    currentHumidityElement.textContent = `${currentHumidity}%`;
    currentWindElement.textContent = `${currentWindSpeed}/kph`;

  } catch (error) {
    console.log("Error:", error);
  }
}

async function getCurrentMinMaxTemp(location) {
  try {
    const url = `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${location}`;
    const data = await fetchData(url);
    const foreCastDay = data.forecast.forecastday;
    const currentMinTemp = Math.round(foreCastDay[0].day.mintemp_c);
    const currentMaxTemp = Math.round(foreCastDay[0].day.maxtemp_c);

    currentMinTempElement.textContent = `Min: ${currentMinTemp}\u00B0`;
    currentMaxTempElement.textContent = `Max: ${currentMaxTemp}\u00B0`;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getWeeklyForecast(location) {
  try {
    const url = `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=7`;
    const data = await fetchData(url);
    const weeklyForecast = data.forecast.forecastday;

    forecastElement.innterHTML = "";

    weeklyForecast.forEach((forecast) => {
      const dayMinTemp = Math.round(forecast.day.mintemp_c);
      const dayMaxTemp = Math.round(forecast.day.maxtemp_c);

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");

      const forecastDateElement = document.createElement("div");
      const forecastDate = new Date(forecast.date);
      const dayOfWeek = forecastDate.toLocaleString("en-GB", {
        weekday: "long",
      });
      forecastDateElement.textContent = dayOfWeek;
      forecastDateElement.classList.add("forecast-date");

      const forecastIconContainerElement = document.createElement("div");
      forecastIconContainerElement.classList.add("forecast-icon-container");

      const forecastIconElement = document.createElement("img");
      const forecastIcon = forecast.day.condition.icon;
      forecastIconElement.src = `${forecastIcon}`;
      forecastIconElement.classList.add("forecast-icon");

      const forecastTempElement = document.createElement("div");
      forecastTempElement.textContent = `${dayMaxTemp}\u00B0 ${dayMinTemp}\u00B0`;
      forecastTempElement.classList.add("forecast-temp");

      forecastElement.appendChild(forecastItem);
      forecastItem.appendChild(forecastDateElement);
      forecastItem.appendChild(forecastIconContainerElement);
      forecastIconContainerElement.appendChild(forecastIconElement);
      forecastItem.appendChild(forecastTempElement);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

getWeeklyForecast("Leicester");
getCurrentTemp("Leicester");
getCurrentMinMaxTemp("Leicester");
