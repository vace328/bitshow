const display = document.querySelector("#content-wrapper");

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
    const thumb = `${show.image.medium}`;
    const img = document.createElement("img");
    imgWrapper.classList.add("thumbnail");
    img.src = thumb;
    imgWrapper.append(img);
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

window.addEventListener("load", () => {
  getShows(URL);
});
