//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => displayPhotographers(data.photographers[1]))
    .then(() => {
      const picture = "assets/photographers/MimiKeel.jpg";
      const avatar = document.querySelector(".photograph-img");
      avatar.setAttribute("src", picture);
    });
}

async function getMedias() {
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => console.log(data.media));
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
