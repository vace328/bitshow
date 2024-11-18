const search = document.querySelector("#search");
const searchResults = document.querySelector("#search-results");
const URL = "https://api.tvmaze.com/shows";
// FILTER SHOWS
function filterShows(query, container) {
    const searchUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        displayFilteredData(data, container);
      })
      .catch((err) => console.log(err));
  }
  
  function displayFilteredData(data, container) {
    const firstTen = data?.slice(0, 10);
    if (firstTen.length > 0) {
      container.style.display = "block";
      container.innerHTML = "";
      firstTen.forEach((showItem) => {
        const result = document.createElement("p");
        result.id = showItem?.show?.id;
        result.innerText = showItem?.show?.name;
        container.append(result);
        result.addEventListener("click", () => {
          getSingleShow(URL, result.id, container);
        });
      });
    }
    console.log(firstTen);
  }
  
  function getSingleShow(baseURL, id, container) {
    const url = `${baseURL}/${id}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispalySingleShowPage(data, container);
      })
      .catch((err) => console.log(err));
  }
  
  function dispalySingleShowPage(data, searchResultsContainer) {
    if (searchResultsContainer) {
      searchResultsContainer.style.display = "none";
    }
    // console.log(data);
    localStorage.setItem("showDetails", JSON.stringify(data));
    window.open("/single-show/single-show.html", "_self");
  }
  
  search.addEventListener("keyup", () => {
    if (search.value.length === 0) {
      searchResults.style.display = "none";
    } else {
      console.log(search.value);
  
      filterShows(search.value, searchResults);
    }
  });