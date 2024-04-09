const apiKey = "6033ac5783b92f9678884bffa667a7db";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
document.title = "ClimaView";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        // updating the data as per the api

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./assests/icons8-clouds-100.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./assests/icons8-summer-100.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./assests/icons8-heavy-rain-100.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./assests/icons8-rain-100.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./assests/icons8-haze-100.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
