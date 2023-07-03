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
const currentTempElement = document.getElementById("current-temp");
const forecastElement = document.getElementById("weekly-forecast-container");

async function getCurrentTemp(location) {
  try {
    const response = await fetch(
      `${baseUrl}/current.json?key=${weatherApiKey}&q=${location}`
    );
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    const currentTemp = data.current.temp_c;
    currentTempElement.textContent = `${currentTemp}`;
  } catch (error) {
    console.log(`ERROR!!!`, error);
  }
}

async function getWeeklyForecast(location) {
  try {
    const response = await fetch(
      `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=7`
    );
    if (!response.ok) {
      throw new Error("network error");
    }
    const data = await response.json();
    const weeklyForecast = data.forecast.forecastday;

    forecastElement.innterHTML = "";

    for (let key in weeklyForecast) {
      if (weeklyForecast.hasOwnProperty(key)) {
        const forecast = weeklyForecast[key];
        const dayMinTemp = forecast.day.mintemp_c;
        const dayMaxTemp = forecast.day.maxtemp_c;

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastElement.appendChild(forecastItem);

        const forecastDateElement = document.createElement("div");
        forecastDateElement.textContent = weeklyForecast[key].date;
        forecastDateElement.classList.add("forecast-date");

        const forecastTempElement = document.createElement("div");
        forecastTempElement.textContent = `${dayMaxTemp}, ${dayMinTemp}`;
        forecastTempElement.classList.add("forecast-temp");

        forecastItem.appendChild(forecastDateElement);
        forecastItem.appendChild(forecastTempElement);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
}

getWeeklyForecast("Leicester");
getCurrentTemp("Leicester");
