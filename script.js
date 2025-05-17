const apiKey = "6b5e25adb8e88061802a56d9baa7ce62";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("error");

  if (!city) {
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = "Please enter a city.";
    weatherDiv.classList.add("hidden");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temp").textContent = Math.round(data.main.temp);
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.classList.remove("hidden");
    errorDiv.classList.add("hidden");
  } catch (err) {
    errorDiv.textContent = "City not found. Please try again.";
    errorDiv.classList.remove("hidden");
    weatherDiv.classList.add("hidden");
  }
}
