// content display
// const URL = "https://api.tvmaze.com/shows";
const display = document.querySelector("#content-wrapper");
// const search = document.querySelector("#search");
// const searchResults = document.querySelector("#search-results");

function getShows(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayItem(data);
    })
    .catch((err) => console.log(err));
}

function displayItem(data) {
  const sortedResults = data.sort((a, b) => {
    if (a.rating.average && b.rating.average) {
      return b.rating.average - a.rating.average;
    }
  });
  const firstFiftyShows = sortedResults?.slice(0, 50);
  console.log(firstFiftyShows);

  firstFiftyShows.forEach((show) => {
    const showCard = document.createElement("div");
    // console.log(show);
    // console.log(show.image.original);
    showCard.classList.add("card");
    display.append(showCard);

    // thumbnail
    const imgWrapper = document.createElement("div");
    const thumb = `${show.image.original}`;
    // console.log(thumb);
    imgWrapper.classList.add("thumbnail");
    imgWrapper.style.backgroundImage = `url(${thumb})`;
    showCard.append(imgWrapper);

    // title
    const titleWrapper = document.createElement("div");
    const title = document.createElement("h2");
    title.innerText = show.name;
    titleWrapper.append(title);
    titleWrapper.addEventListener("click", () => {
      getSingleShow(URL, show.id);
    });

    showCard.append(titleWrapper);
  });
}

// // FILTER SHOWS
// function filterShows(query, container) {
//   const searchUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
//   fetch(searchUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       displayFilteredData(data, container);
//     })
//     .catch((err) => console.log(err));
// }

// function displayFilteredData(data, container) {
//   const firstTen = data?.slice(0, 10);
//   if (firstTen.length > 0) {
//     container.style.display = "block";
//     container.innerHTML = "";
//     firstTen.forEach((showItem) => {
//       const result = document.createElement("p");
//       result.id = showItem?.show?.id;
//       result.innerText = showItem?.show?.name;
//       container.append(result);
//       result.addEventListener("click", () => {
//         getSingleShow(URL, result.id, container);
//       });
//     });
//   }
//   console.log(firstTen);
// }

// function getSingleShow(baseURL, id, container) {
//   const url = `${baseURL}/${id}`;
//   console.log(url);
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       dispalySingleShowPage(data, container);
//     })
//     .catch((err) => console.log(err));
// }

// function dispalySingleShowPage(data, searchResultsContainer) {
//   if (searchResultsContainer) {
//     searchResultsContainer.style.display = "none";
//   }
//   // console.log(data);
//   localStorage.setItem("showDetails", JSON.stringify(data));
//   window.open("/single-show/single-show.html", "_self");
// }

// search.addEventListener("keyup", () => {
//   if (search.value.length === 0) {
//     searchResults.style.display = "none";
//   } else {
//     console.log(search.value);

//     filterShows(search.value, searchResults);
//   }
// });
window.addEventListener("load", () => {
  getShows(URL);
});
