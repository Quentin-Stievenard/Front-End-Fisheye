//Mettre le code JavaScript lié à la page photographer.html

let totalLikes = 0;

async function getPhotographers() {
  const urlSearchId = window.location.search.split("=")[1];
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const photographer = data.photographers.find((x) => x.id == urlSearchId);
      displayPhotographers(photographer);
      const avatar = document.querySelector(".photograph-img");
      avatar.setAttribute(
        "src",
        `assets/photographers/${photographer.portrait}`
      );
      const main = document.querySelector(".main-container");
      const prices = document.createElement("div");
      const price = document.createElement("p");
      const likes = document.createElement("div");
      const number = document.createElement("p");
      const heart = document.createElement("i");

      likes.style.display = "flex";
      likes.style.alignItems = "center";

      number.id = "totalLikes";
      heart.className = "fa fa-heart";

      const photographerMedia = data.media.filter(
        (x) => x.photographerId == photographer.id
      );

      for (media of photographerMedia) {
        totalLikes += media.likes;
      }
      // photographerMedia.forEach((media) => {
      //   totalLikes += media.likes;
      // });
      number.innerText = totalLikes;
      likes.appendChild(number);
      likes.appendChild(heart);
      price.innerText = photographer.price + "/jour";
      prices.className = "prices-container";
      prices.appendChild(likes);
      prices.appendChild(price);
      main.appendChild(prices);

      const photographerName = document.querySelector(".photograph-name");
      photographerName.innerText = photographer.name;
    });
}

async function getPhotographerName(id) {
  let reponse;
  await fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const photographer = data.photographers.find((x) => x.id == id);
      reponse = photographer?.name;
    });
  return reponse;
}

async function getMedias(filter = "popularity") {
  const urlSearchId = window.location.search.split("=")[1];
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const media = data.media.filter((x) => x.photographerId == urlSearchId);
      let mediaSorted = [];
      switch (filter) {
        case "popularity":
          mediaSorted = media.sort((a, b) => b.likes - a.likes);
          break;
        case "date":
          mediaSorted = media.sort((a, b) => {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
          });
          console.log(mediaSorted);
          break;
        case "title":
          mediaSorted = media.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
          });
      }
      displayMedias(mediaSorted);
    });
}

function filtersMedia() {
  const filters = document.getElementById("filters");

  filters.addEventListener("change", function () {
    getMedias(filters.value);
  });
}

filtersMedia();

async function displayPhotographers(photographer) {
  const photographersSection = document.querySelector(
    ".photograph-information"
  );
  const photographerModel = photographerDetails(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographersSection.appendChild(userCardDOM);
}

async function displayMedias(medias) {
  const photographersMedia = document.querySelector(".photograph-media");
  photographersMedia.innerHTML = "<div></div>";
  medias.forEach((media) => {
    const photographerModel = photographerMedia(media);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersMedia.appendChild(userCardDOM);
  });
}

async function init() {
  getPhotographers();
  getMedias();
}

init();
