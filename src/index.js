// eslint-disable-next-line no-unused-vars
import css from "./index.css";

const form = document.getElementById("search-bar");
const input = document.getElementById("search");

const location = document.getElementById("location");
const temp = document.getElementById("temperature");
const toggleBtn = document.getElementById("temp-toggle");
const weatherData = document.getElementById("weather-data");
weatherData.classList.add("fade");
let tempToggle = "f";
let current = null;

toggleBtn.addEventListener("click", () => {
  if (tempToggle === "f") {
    tempToggle = "c";
    toggleBtn.textContent = "°C";
    if (current !== null) {
      temp.textContent = `${current.current[`temp_${tempToggle}`]}°`;
    }
  } else {
    tempToggle = "f";
    toggleBtn.textContent = "°F";
    if (current !== null) {
      temp.textContent = `${current.current[`temp_${tempToggle}`]}°`;
    }
  }
});

async function getData(loc) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=903a2f5e3cc649fc881174419230908&q=${loc}`,
    { mode: "cors" }
  ).then((res) => res.json());
  return data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  location.textContent = "";
  temp.textContent = "";
  weatherData.classList.remove("fade");
  getData(input.value).then((data) => {
    current = { ...data };
    setTimeout(() => {
      if (data.error) {
        if (data.error.code === 1003) {
          location.textContent = `No Location Selected`;
          temp.textContent = ``;
        } else if (data.error.code === 1006) {
          location.textContent = `Invalid Location`;
          temp.textContent = ``;
        }
      } else {
        location.textContent = `${data.location.name}, ${data.location.region}`;
        temp.textContent = `${data.current[`temp_${tempToggle}`]}°`;
      }
      weatherData.classList.add("fade");
    }, 500);
  });
});

let hDiff = 0;
let wDiff = 0;

window.addEventListener("mousemove", (e) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  hDiff = e.clientY - height;
  wDiff = e.clientX - width;
});

const stars = document.getElementById("stars");
let deg = 0;
function animationLoop() {
  setTimeout(() => {
    stars.style.transform = `translate(${-wDiff / 100}px,${
      -hDiff / 100
    }px) rotate(${deg}deg)`;
    deg += 0.01125;
    animationLoop();
  }, 20);
}
animationLoop();
