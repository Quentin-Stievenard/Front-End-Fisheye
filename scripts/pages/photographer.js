//Mettre le code JavaScript lié à la page photographer.html
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

async function getMedias() {
  const urlSearchId = window.location.search.split("=")[1];
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) =>
      displayMedias(data.media.filter((x) => x.photographerId == urlSearchId))
    );
}

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
