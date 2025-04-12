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
  }
  
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