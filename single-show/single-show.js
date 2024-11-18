const backBtn = document.querySelector("#btn-back");
backBtn.addEventListener("click", () => {
  window.history.go(-1);
  return false;
});

const singleShow = JSON.parse(localStorage.getItem("showDetails"));
const title = document.querySelector("#show-title");
const img = document.querySelector("#show-img");
const seasons = document.querySelector("#seasons");
const cast = document.querySelector("#cast");
const summary = document.querySelector("#summary");
const seasonsTitle = document.querySelector("#seasons-title");
// console.log(singleShow);
const seasonsURL = `https://api.tvmaze.com/shows/${singleShow.id}/seasons`;
const castURL = `https://api.tvmaze.com/shows/${singleShow.id}/cast`;
console.log(seasonsTitle);

title.innerText = singleShow.name;
img.src = singleShow?.image?.medium ?? `https://placehold.co/500x700/orange/white?text=Poster+unavailable`;
const summaryContent = singleShow?.summary ?? "N/A";
summary.innerHTML += summaryContent;

// SEASONS
function getSeasons(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displaySeasons(data, seasons, seasonsTitle)
    })
    .catch((err) => console.log(err));
}

function displaySeasons(data, container, title) {
  console.log(data);
  title.innerText += ` (${data.length})`;
  data.forEach((season) => {
    const seasonDuration = document.createElement("li");
    seasonDuration.innerText = `${season.premiereDate ?? "N/A"} - ${season.endDate ?? "N/A"}`;
    container.append(seasonDuration);
  });
}

// CAST
function getCast(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCast(data, cast)
    })
    .catch((err) => console.log(err));
}

function displayCast(data, container) {
  console.log(data);
  data.forEach((actor) => {
    const cast = document.createElement("li");
    cast.innerText = `${actor.person.name ?? "N/A"}`;
    container.append(cast);
  });
}


window.addEventListener("load", () => {
  getCast(castURL)
  getSeasons(seasonsURL);
});
