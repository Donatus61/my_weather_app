const apiKey = 'e55a640d41c2715ce7db32ca17fdab8c';


const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const error = document.getElementById('error');


searchBtn.addEventListener('click', () => {
const city = cityInput.value.trim();
if (city) {
fetchWeather(city);
}
});


async function fetchWeather(city) {
try {
error.textContent = '';


const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);


if (!response.ok) {
throw new Error('City not found');
}


const data = await response.json();
displayWeather(data);
} catch (err) {
weatherCard.style.display = 'none';
error.textContent = err.message;
}
}


function displayWeather(data) {
document.getElementById('cityName').textContent = data.name;
document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
document.getElementById('description').textContent = data.weather[0].description;
document.getElementById('humidity').textContent = `💧 ${data.main.humidity}%`;
document.getElementById('wind').textContent = `🌬️ ${data.wind.speed} m/s`;


document.getElementById('weatherIcon').src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


weatherCard.style.display = 'block';


}
