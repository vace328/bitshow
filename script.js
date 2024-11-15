// footer year
const year = new Date().getFullYear();
const footer = document.querySelector("footer");
footer.innerText += ` ${year}`;

// content display
const URL = "https://api.tvmaze.com/shows";
const display = document.querySelector("#content-wrapper");

function getShows(url) {
  // const url = baseUrl + id;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayItem(data);
    })
    .catch((err) => console.log(err));
}

function displayItem(data) {
    const firstFiftyShows = data?.slice(0, 50);
    // console.log(firstFiftyShows.length);

    firstFiftyShows.forEach((show) => {
    const showCard = document.createElement("div");
    console.log(show);
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

    showCard.append(titleWrapper);
  });
}

window.addEventListener("load", () => {
  getShows(URL);
});
