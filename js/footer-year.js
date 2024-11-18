// footer year
const year = new Date().getFullYear();
const footer = document.querySelector("footer");
footer.innerText += ` ${year}`;