const weatherForm = document.querySelector(".container");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "36017273e15c1d35d1c411e743fa3be8";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;
  if (city) {
    try {
      const data = await getWeatherData(city);
      displayInfo(data);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("please enter city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Enter valid City");
  }

  return await response.json();
}

function displayInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  // creating all the elements
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("h1");
  const humidityDisplay = document.createElement("p");
  const statusDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("span");

  // entering text in the elements
  cityDisplay.textContent = city;
  tempDisplay.textContent = (temp - 273.15).toFixed(1) + "°C";
  humidityDisplay.textContent = "Humidity: " + humidity + "%";
  statusDisplay.textContent = description;
  emojiDisplay.textContent = getWeatherEmoji(id);

  // adding classes accordingly
  cityDisplay.classList.add("city-name");
  tempDisplay.classList.add("temperature");
  humidityDisplay.classList.add("humidity");
  statusDisplay.classList.add("weather-status");
  emojiDisplay.classList.add("weather-emoji");

  // adding text to card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(statusDisplay);
  card.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 600:
      return "⛈️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌁";
    case weatherId == 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "🙂‍↔️";
  }
}

function displayError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(error);
}
