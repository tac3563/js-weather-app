import "./styles/main.scss";

const baseUrl = "https://api.weatherapi.com/v1";
const weatherApiKey = "ecc04dd12dfc427a81f192018230307";
const currentWeatherIconEl = document.getElementById("header-img");
const currentTempEl = document.getElementById("current-temp");
const currentMinTempEl = document.getElementById("current-min-temp");
const currentMaxTempEl = document.getElementById("current-max-temp");
const forecastEl = document.getElementById("weekly-forecast-container");
const currentPrecipEl = document.getElementById("current-precip");
const currentHumidityEl = document.getElementById("current-humidity");
const currentWindEl = document.getElementById("current-wind");
const hourlyForecastContainerEl = document.querySelector(
  ".hourly-forecast-container"
);
const currentDayEl = document.querySelector(".today-date");

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network error");
  }
  return response.json();
}

async function getCurrentWeather(location) {
  try {
    const url = `${baseUrl}/current.json?key=${weatherApiKey}&q=${location}`;
    const data = await fetchData(url);
    const currentWeather = data.current;
    const { temp_c, condition, humidity, gust_kph, precip_mm } = currentWeather;

    currentWeatherIconEl.src = condition.icon;
    currentTempEl.textContent = `${temp_c}\u00B0`;
    currentHumidityEl.textContent = `${humidity}%`;
    currentWindEl.textContent = `${Math.round(gust_kph)}/kph`;
    currentPrecipEl.textContent = `${precip_mm}mm`;
  } catch (error) {
    displayErrorMessage(
      "Failed to fetch current weather data. Please try again later."
    );
    console.log("Error:", error);
  }
}

async function getForecast(location) {
  try {
    const url = `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=7`;
    const data = await fetchData(url);
    const forecast = data.forecast;
    const dailyForecast = forecast.forecastday[0];
    const weeklyForecast = data.forecast.forecastday;

    setCurrentDay(dailyForecast);
    setWeeklyForecast(weeklyForecast);
    setHourlyForecast(dailyForecast);
  } catch (error) {
    displayErrorMessage(
      "Failed to fetch forecast data. Please try again later."
    );

    console.log("Error:", error);
  }
}

function setCurrentDay(dailyForecast) {
  try {
    const { date, day } = dailyForecast;
    const currentDay = new Date(date);
    const options = { day: "numeric", month: "long" };
    const formattedDate = currentDay.toLocaleDateString("en-US", options);

    currentDayEl.textContent = formattedDate;
    currentMinTempEl.textContent = `Min: ${Math.round(day.mintemp_c)}\u00B0`;
    currentMaxTempEl.textContent = `Max: ${Math.round(day.maxtemp_c)}\u00B0`;
  } catch (error) {
    displayErrorMessage(
      "Failed to set daily forecast data. Please try again later."
    );
    console.error("Error:", error);
  }
}

function setWeeklyForecast(weeklyForecast) {
  try {
    weeklyForecast.forEach((forecast) => {
      const { date, day } = forecast;
      const forecastDate = new Date(date);
      const dayOfWeek = forecastDate.toLocaleString("en-GB", {
        weekday: "long",
      });

      const forecastItem = createForecastItem(dayOfWeek);
      const forecastIcon = createForecastIcon(day.condition.icon);
      const forecastTempContainer = createForecastTempContainer();
      const forecastTempMin = createForecastTemp(day.mintemp_c);
      const forecastTempMax = createForecastTemp(day.maxtemp_c);

      forecastItem.appendChild(forecastIcon);
      forecastItem.appendChild(forecastTempContainer);
      forecastTempContainer.appendChild(forecastTempMin);
      forecastTempContainer.appendChild(forecastTempMax);
      forecastEl.appendChild(forecastItem);
    });
  } catch (error) {
    displayErrorMessage(
      "Failed to set weekly forecast data. Please try again later."
    );
    console.error("Error:", error);
  }
}

function createForecastItem(dayOfWeek) {
  const forecastItem = document.createElement("div");
  forecastItem.classList.add("forecast-item");

  const forecastDateEl = document.createElement("div");
  forecastDateEl.textContent = dayOfWeek;
  forecastDateEl.classList.add("forecast-date");

  forecastItem.appendChild(forecastDateEl);
  return forecastItem;
}

function createForecastIcon(iconUrl) {
  const forecastIconEl = document.createElement("img");
  forecastIconEl.src = iconUrl;
  forecastIconEl.classList.add("forecast-icon");
  return forecastIconEl;
}

function createForecastTempContainer() {
  const forecastTempContainerEL = document.createElement("div");
  forecastTempContainerEL.classList.add("forecast-temp-container");
  return forecastTempContainerEL;
}

function createForecastTemp(maxTemp, minTemp) {
  const forecastTempMinEl = document.createElement("div");
  const forecastTempMaxEl = document.createElement("div");

  forecastTempMinEl.textContent = `${Math.round(maxTemp)}\u00B0`;
  forecastTempMaxEl.textContent = `${Math.round(maxTemp)}\u00B0`;

  return forecastTempMinEl, forecastTempMaxEl;
}

function setHourlyForecast(dailyForecast) {
  try {
    const forecastHour = dailyForecast.hour;
    hourlyForecastContainerEl.innerHTML = "";

    forecastHour.forEach((hour) => {
      const hourlyTemp = Math.round(hour.temp_c);
      const hourlyWeatherIcon = hour.condition.icon;
      const hourlyTime = hour.time;
      const hourlyTimeFormatted = hourlyTime.slice(11, 16);

      const hourlyForecastEl = createHourlyForecast(
        hourlyTemp,
        hourlyWeatherIcon,
        hourlyTimeFormatted
      );
      hourlyForecastContainerEl.appendChild(hourlyForecastEl);
    });
  } catch (error) {
    displayErrorMessage(
      "Failed to set hourly forecast data. Please try again later."
    );
    console.error("Error:", error);
  }
}

function createHourlyForecast(temp, weatherIcon, time) {
  const hourlyForecastEl = document.createElement("div");
  hourlyForecastEl.classList.add("hourly-forecast");

  const hourlyTempForecastEl = document.createElement("p");
  hourlyTempForecastEl.textContent = `${temp}\u00B0C`;
  hourlyTempForecastEl.classList.add("hourly-forecast-temp");

  const hourlyWeatherIconEl = document.createElement("img");
  hourlyWeatherIconEl.src = weatherIcon;
  hourlyWeatherIconEl.classList.add("hourly-forecast-icon");

  const hourlyTimeEl = document.createElement("p");
  hourlyTimeEl.textContent = time;
  hourlyTimeEl.classList.add("hourly-forecast-hour");

  hourlyForecastEl.appendChild(hourlyTempForecastEl);
  hourlyForecastEl.appendChild(hourlyWeatherIconEl);
  hourlyForecastEl.appendChild(hourlyTimeEl);

  return hourlyForecastEl;
}

getForecast("Leicester");
getCurrentWeather("Leicester");
