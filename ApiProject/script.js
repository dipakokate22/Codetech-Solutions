const apiKey = 'Enter_your_key'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city');
const fetchWeatherButton = document.getElementById('fetchWeather');
const weatherResult = document.getElementById('weatherResult');

fetchWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.innerHTML = '<p id="error">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found or API error');
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p id="error">Error: ${error.message}</p>`;
    }
});
