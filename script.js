//You can edit ALL of the code here

function setup() {
  fetchEpisodes();
}

// get episodes

let episodes = [];

// getting search & select from DOM
const container = document.getElementById("root");
const searchInput = document.getElementById("search-input");
const selectEl = document.getElementById("episode-select");
const statusMessage = document.getElementById("status-message");
function showStatus(message) {
  statusMessage.textContent = message;
}

// clear status message
function clearStatus() {
  statusMessage.textContent = "";
}
//fetching data from API
async function fetchEpisodes() {
  try {
    showStatus("Loading episodes...");

    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    episodes = data;

    clearStatus();
    populateSelect();
    makePageForEpisodes(episodes);
  } catch (error) {
    showStatus("Failed to load episodes. Please try again later.");
  }
}
// adding option value in select box
function populateSelect() {
  episodes.forEach((ep) => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = `${formatEpisodeCode(ep.season, ep.number)} - ${
      ep.name
    }`;
    selectEl.appendChild(option);
  });
}

// format the season & episode
function formatEpisodeCode(season, number) {
  const seasonNumber = String(season).padStart(2, "0");
  const epiNumber = String(number).padStart(2, "0");
  return `S${seasonNumber}E${epiNumber}`;
}

//filtering select box
function handleSelect() {
  const selectedId = selectEl.value;

  if (!selectedId) {
    makePageForEpisodes(episodes); // Show all episodes
    return;
  }

  const episode = episodes.find((ep) => ep.id == selectedId);
  if (episode) {
    makePageForEpisodes([episode]); // Show selected episode
  }
}

//adding listener for select box
selectEl.addEventListener("change", handleSelect);

//filtering search
function handleSearch() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) {
    makePageForEpisodes(episodes);
    return;
  }
  const filtered = episodes.filter((ep) => {
    const inName = ep.name.toLowerCase().includes(term);
    const inSummary = ep.summary.toLowerCase().includes(term);

    return inName || inSummary;
  });
  makePageForEpisodes(filtered);
}

// adding listener for search box
searchInput.addEventListener("input", handleSearch);

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // clean container

  episodeList.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");

    const title = document.createElement("h2");
    title.textContent = `${episode.name} (S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")})`;

    const image = document.createElement("img");
    image.src = episode.image.medium;
    image.alt = episode.name;

    const summary = document.createElement("div");
    summary.innerHTML = episode.summary;

    episodeDiv.appendChild(title);
    episodeDiv.appendChild(image);
    episodeDiv.appendChild(summary);

    rootElem.appendChild(episodeDiv);
  });
}

window.onload = setup;
