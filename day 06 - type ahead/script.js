const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const URI =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const toJson = raw => raw.json();

const handleListeners = event =>
  searchInput.addEventListener(event, displayMatches);

const numberWithCommas = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const findMatches = (wordToMatch, cities) =>
  cities.filter(({ city, state }) => {
    const regex = new RegExp(wordToMatch, "gi");
    return city.match(regex) || state.match(regex);
  });

const displayHtml = (place, value) => {
  const regex = new RegExp(value, "gi");
  const cityName = place.city.replace(
    regex,
    `<span class="hl">${value}</span>`
  );
  const stateName = place.state.replace(
    regex,
    `<span class="hl">${value}</span>`
  );

  return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
};

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => displayHtml(place, this.value));
  suggestions.innerHTML = html.join("");
}

fetch(URI)
  .then(toJson)
  .then(data => cities.push(...data));

handleListeners("change");
handleListeners("keyup");
