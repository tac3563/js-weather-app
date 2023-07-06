# JS Weather App

A simple weather web app that retrieves and displays weather information using the WeatherAPI. The main purpose of this app was to help me grow my JS skills by working with modern asynchronous programming techniques such as async/await and retrieving and utilising data using the Fetch API.

## Features

- Displays the current temperature and weather conditions.
- Provides a 7-day forecast with daily temperature details.
- Supports searching for weather information by location.

## Technologies Used

- JavaScript
- HTML
- CSS/SASS
- WeatherAPI

## Getting Started

Follow the instructions below to get a local copy of the project up and running on your machine.

### Prerequisites

- Node.js and npm installed globally on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tac3563/js-weather-app.git
   ```

2. Navigate to project directory:

   ```bash
    cd js-weather-app
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Watch for changes:

   ```bash
      npm run watch
   ```

### Usage

- Obtain an API key from the WeatherAPI website.
- Rename the .env.example file to .env and replace <YOUR_API_KEY> with your actual WeatherAPI key.
- Open the index.html file in a web browser.

### Configuration

- The configuration file .env is used to store the API key. Make sure to provide your own API key in the .env file.

### API Reference

- This project uses the WeatherAPI to retrieve weather data. Visit the WeatherAPI documentation for more information on available endpoints and parameters: https://www.weatherapi.com/docs/

### Contributing

- Contributions are welcome! If you have any suggestions or improvements, please submit a pull request. Ensure that your code adheres to the project's coding style and conventions.

### License

- This project is licensed under the MIT License.

### Acknowledgments

- WeatherAPI for providing the weather data.
