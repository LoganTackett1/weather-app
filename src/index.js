// eslint-disable-next-line no-unused-vars
import css from "./index.css";

const form = document.getElementById("search-bar");
const input = document.getElementById("search");

const location = document.getElementById("location");
const temp = document.getElementById("temperature");
const toggleBtn = document.getElementById("temp-toggle");
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
  console.log(data);
  return data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(input.value).then((data) => {
    current = { ...data };
    location.textContent = `${data.location.name}, ${data.location.region}`;
    temp.textContent = `${data.current[`temp_${tempToggle}`]}°`;
  });
});
