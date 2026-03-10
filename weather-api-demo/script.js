const apiKey = CONFIG.API_KEY;

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    const response = await fetch(url);
    const data = await response.json();

    const temp = data.main.temp;
    const description = data.weather[0].description;

    document.getElementById("result").innerText =
        `Temperature: ${temp}°F | Weather: ${description}`;
}
