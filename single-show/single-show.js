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
const seasonsURL = `https://api.tvmaze.com/shows/${singleShow.id}/seasons`;
const castURL = `https://api.tvmaze.com/shows/${singleShow.id}/cast`;
console.log(seasonsTitle);

title.innerText = singleShow.name;
img.src =
  singleShow?.image?.original ??
  `https://placehold.co/500x700/orange/white?text=Poster+unavailable`;
const summaryContent = singleShow?.summary ?? "N/A";
summary.innerHTML += summaryContent;

// SEASONS
function getSeasons(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displaySeasons(data, seasons, seasonsTitle);
    })
    .catch((err) => console.log(err));
}

function displaySeasons(data, container, title) {
  console.log(data);
  if (data.length > 0) {
    title.innerText += ` (${data.length})`;
    const seasons = document.createElement("ul");
    data.forEach((season) => {
      const seasonDuration = document.createElement("li");
      seasonDuration.innerText = `${season.premiereDate ?? "N/A"} - ${
        season.endDate ?? "N/A"
      }`;
      seasons.append(seasonDuration);
      container.append(seasons);
    });
  } else {
    const msg = document.createElement("p");
    msg.innerText = "No data available";
    cast.append(msg);
  }
}

// CAST
function getCast(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCast(data, cast);
    })
    .catch((err) => console.log(err));
}

function displayCast(data, container) {
  console.log(data);
  if (data.length > 0) {
    let firstTen;
    let castRemainder;
    const castList = document.createElement("ul");
    if (data.length > 10) {
      firstTen = data.slice(0, 10);
      castRemainder = data.slice(10);
      const castRemainderContainer = document.createElement("ul");
      castRemainderContainer.classList.add("hide-container");
      const castRemainderBtn = document.createElement("button");
      castRemainderBtn.innerText = `Show Full Cast List`;
      castRemainderBtn.classList.add("btn-show-more");
      firstTen.forEach((actor) => {
        const actorListItem = document.createElement("li");
        actorListItem.innerText = `${actor.person.name ?? "N/A"}`;
        castList.append(actorListItem);
        container.append(castList);
      });
      castRemainder.forEach((actor) => {
        const actorListItem = document.createElement("li");
        actorListItem.innerText = `${actor.person.name ?? "N/A"}`;
        castRemainderContainer.append(actorListItem);
        container.append(castRemainderContainer);
      });
      castRemainderBtn.addEventListener("click", () => {
        castRemainderContainer.classList.toggle("show-container");
        castRemainderContainer.classList.toggle("hide-container");
      });
      
      container.append(castRemainderBtn);
    } else {
      data.forEach((actor) => {
        const actorListItem = document.createElement("li");
        actorListItem.innerText = `${actor.person.name ?? "N/A"}`;
        castList.append(actorListItem);
        container.append(castList);
      });
    }
  } else {
    const msg = document.createElement("p");
    msg.innerText = "No data available";
    cast.append(msg);
  }
}

function toggleClass(element, cssClass) {
  element.classList.toggle(cssClass);
}

window.addEventListener("load", () => {
  getCast(castURL);
  getSeasons(seasonsURL);
});
