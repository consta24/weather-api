const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "68f00d0b4bdc8cdcad15bf540552e94e";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      error404.classList.add("fadeOut");
      weatherBox.classList.add("fadeOut");
      weatherDetails.classList.add("fadeOut");

      setTimeout(() => {
        if (json.cod === "404" || json.cod === "401") {
          error404.classList.remove("fadeOut");
          error404.classList.add("fadeIn");
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherDetails.style.display = "none";
          error404.style.display = "block";
          return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.classList.remove("fadeOut");
        weatherDetails.classList.remove("fadeOut");
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        weatherBox.style.display = "block";
        weatherDetails.style.display = "flex";
        container.style.height = "590px";
      }, 500);
    });
});
