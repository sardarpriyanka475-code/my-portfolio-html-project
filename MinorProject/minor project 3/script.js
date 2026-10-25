
const MOVIE_API_KEY = "e2158d2";

// PAGE NAVIGATION

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

function showPage(pageName) {
  pages.forEach(page => {
    page.classList.toggle("hidden", page.id !== pageName);
  });

  navButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// WEATHER APP - OPEN-METEO, NO API KEY NEEDED

const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherMessage = document.getElementById("weather-message");
const weatherResult = document.getElementById("weather-result");

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code === 85 || code === 86) return "❄️";
  if (code >= 95 && code <= 99) return "⛈️";

  return "🌍";
}

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with hail"
  };

  return descriptions[code] || "Current weather conditions";
}

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    weatherMessage.textContent = "Please enter a city name.";
    return;
  }

  weatherResult.classList.add("hidden");
  weatherMessage.textContent = "Finding your city...";

  try {
    const geoURL =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

    const geoResponse = await fetch(geoURL);

    if (!geoResponse.ok) {
      throw new Error("Unable to search for the city. Please try again.");
    }

    const geoData = await geoResponse.json();
    const places = geoData.results || [];

    // Prefer an exact city name match.
    // For duplicate city names, prefer the Indian location.

    const exactMatches = places.filter(place =>
      place.name.toLowerCase() === city.toLowerCase()
    );

    const location =
      exactMatches.find(place => place.country_code === "IN") ||
      exactMatches[0] ||
      places.find(place => place.country_code === "IN") ||
      places[0];

    if (!location) {
      weatherMessage.textContent =
        "City not found. Please check the spelling and try again.";
      return;
    }

    weatherMessage.textContent = "Getting current weather...";

    const weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherURL);

    if (!weatherResponse.ok) {
      throw new Error("Weather information is unavailable right now.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    document.getElementById("weather-city").textContent =
      `${location.name}, ${location.country}`;

    document.getElementById("temperature").textContent =
      Math.round(current.temperature_2m);

    document.getElementById("weather-condition").textContent =
      getWeatherDescription(current.weather_code);

    document.getElementById("humidity").textContent =
      `${current.relative_humidity_2m}%`;

    document.getElementById("wind").textContent =
      `${current.wind_speed_10m} km/h`;

    document.getElementById("feels-like").textContent =
      `Feels like ${Math.round(current.apparent_temperature)}°C`;

    document.getElementById("weather-icon").textContent =
      getWeatherIcon(current.weather_code);

    weatherResult.classList.remove("hidden");
    weatherMessage.textContent = "";

  } catch (error) {
    weatherMessage.textContent =
      error.message === "Failed to fetch"
        ? "Connection problem. Check your internet and try again."
        : error.message;
  }
});

// MOVIE SEARCH APP - OMDb API

const movieForm = document.getElementById("movie-form");
const movieInput = document.getElementById("movie-input");
const movieMessage = document.getElementById("movie-message");
const movieResults = document.getElementById("movie-results");
const movieDetail = document.getElementById("movie-detail");

movieForm.addEventListener("submit", async event => {
  event.preventDefault();

  const search = movieInput.value.trim();

  if (!search) {
    movieMessage.textContent = "Enter a movie name to start exploring.";
    return;
  }

  if (MOVIE_API_KEY === "YOUR_OMDB_API_KEY") {
    movieMessage.textContent =
      "Movie search is not set up yet. Add your activated OMDb key in script.js.";
    movieResults.innerHTML = "";
    movieDetail.classList.add("hidden");
    return;
  }

  movieMessage.textContent = "Searching for movies...";
  movieResults.innerHTML = "";
  movieDetail.classList.add("hidden");

  try {
    const url =
      `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${MOVIE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Unable to contact the movie service.");
    }

    if (data.Response === "False") {
      throw new Error(
        data.Error === "Movie not found!"
          ? "No movies found. Try another title."
          : data.Error
      );
    }

    movieMessage.textContent =
      `Movie results for "${search}"`;

    data.Search.forEach(movie => {
      const card = document.createElement("article");
      card.className = "movie-card";

      const poster = document.createElement("img");
      poster.alt = `${movie.Title} poster`;
      poster.loading = "lazy";
      poster.src =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://placehold.co/300x440/202033/ffffff?text=No+Poster";

      poster.onerror = () => {
        poster.onerror = null;
        poster.src =
          "https://placehold.co/300x440/202033/ffffff?text=No+Poster";
      };

      const info = document.createElement("div");
      info.className = "movie-info";

      const title = document.createElement("h3");
      title.textContent = movie.Title;

      const year = document.createElement("p");
      year.textContent = `Year: ${movie.Year}`;

      const type = document.createElement("p");
      type.textContent =
        `Type: ${movie.Type}`;

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "View Details";
      button.addEventListener("click", () => {
        getMovieDetails(movie.imdbID);
      });

      info.append(title, year, type, button);
      card.append(poster, info);
      movieResults.appendChild(card);
    });

  } catch (error) {
    movieMessage.textContent =
      error.message === "Failed to fetch"
        ? "Connection problem. Check your internet and try again."
        : error.message;
  }
});

// DISPLAY DETAILS FOR A SELECTED MOVIE

async function getMovieDetails(movieId) {
  movieMessage.textContent = "Loading movie details...";
  movieDetail.classList.add("hidden");

  try {
    const url =
      `https://www.omdbapi.com/?i=${encodeURIComponent(movieId)}&plot=full&apikey=${MOVIE_API_KEY}`;

    const response = await fetch(url);
    const movie = await response.json();

    if (!response.ok || movie.Response === "False") {
      throw new Error("Movie details could not be loaded.");
    }

    movieDetail.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = movie.Title;

    const rating = document.createElement("p");
    rating.textContent = `IMDb Rating: ${movie.imdbRating || "N/A"}`;

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${movie.Genre || "N/A"}`;

    const director = document.createElement("p");
    director.textContent = `Director: ${movie.Director || "N/A"}`;

    const plot = document.createElement("p");
    plot.textContent = `Plot: ${movie.Plot || "No plot available."}`;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "primary-btn";
    closeButton.textContent = "Close Details";
    closeButton.addEventListener("click", () => {
      movieDetail.classList.add("hidden");
    });

    movieDetail.append(title, rating, genre, director, plot, closeButton);
    movieDetail.classList.remove("hidden");

    movieMessage.textContent = "";

    movieDetail.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } catch (error) {
    movieMessage.textContent =
      error.message === "Failed to fetch"
        ? "Connection problem. Check your internet and try again."
        : error.message;
  }
}
