//You can edit ALL of the code here
/*function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;*/

  function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
    populateSelect();
  }

  // get episodes  
  const episodes    = getAllEpisodes();

  // getting search & select from DOM
  const searchInput = document.getElementById('search-input');
  const selectEl    = document.getElementById('episode-select');

  // adding option value in select box   
  function populateSelect() {
    episodes.forEach(ep => {
      const option = document.createElement('option');
      option.value = ep.id;
      option.textContent = `${formatEpisodeCode(ep.season, ep.number)} - ${ep.name}`;
      selectEl.appendChild(option);
      });
    }

  // format the season & episode 
  function formatEpisodeCode(season, number) {
    const seasonNumber = String(season).padStart(2, '0');
    const epiNumber = String(number).padStart(2, '0');
    return `S${seasonNumber}E${epiNumber}`;
}

  //filtering select box
  function handleSelect() {
    const selectedId = selectEl.value;
  
    if (!selectedId) {
      makePageForEpisodes(episodes); // Show all episodes
      return;                   
    }
  
    const episode = episodes.find(ep => ep.id == selectedId);
    if (episode) {
      makePageForEpisodes([episode]); // Show selected episode
    }
  }

  //adding listener for select box
  selectEl.addEventListener('change', handleSelect);

  
  
  function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = ""; // clean container
  
    episodeList.forEach((episode) => {
      const episodeDiv = document.createElement("div");
      episodeDiv.classList.add("episode");
  
      const title = document.createElement("h2");
      title.textContent = `${episode.name} (S${String(episode.season).padStart(2, "0")}E${String(episode.number).padStart(2, "0")})`;
  
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