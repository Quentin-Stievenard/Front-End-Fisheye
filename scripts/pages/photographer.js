//Mettre le code JavaScript lié à la page photographer.html

let totalLikes = 0;
const mediaContainer = document.getElementById("media-container");
const nextMediaIcon = document.getElementById("next-media");
const previousMediaIcon = document.getElementById("previous-media");
const lightbox = document.querySelector(".lightbox_modal");
const contactModal = document.getElementById("contact_modal");
const labelLightbox = document.querySelector(".lightbox_label");

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
      avatar.setAttribute("tabindex", 0);
      avatar.ariaLabel = photographer.name;
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

      function showNextMedia(current) {
        let idx = photographerMedia.indexOf(current);
        let nextMedia = photographerMedia[idx + 1];
        if (nextMedia === undefined) {
          nextMedia = photographerMedia[0];
        }

        if (nextMedia.image !== undefined) {
          // it's an image
          mediaContainer.innerHTML = `<img class="lightbox_media" src="assets/photographers/media/${nextMedia.image}">`;
          localStorage.setItem(
            "current-media",
            nextMedia.image.split("/").slice(-1)[0]
          );
          labelLightbox.innerHTML = `<p>${nextMedia.title}</p>`;
        } else {
          mediaContainer.innerHTML = `<video class="lightbox_media" src="assets/photographers/media/${nextMedia.video}" controls></video>`;
          localStorage.setItem(
            "current-media",
            nextMedia.video.split("/").slice(-1)[0]
          );
          labelLightbox.innerHTML = `<p>${nextMedia.title}</p>`;
        }
      }

      nextMediaIcon.addEventListener("click", function (e) {
        let currentMedia = localStorage.getItem("current-media");
        let media = photographerMedia.find(
          (media) => media.image == currentMedia
        );
        if (media !== undefined) {
          // it's a photo
          showNextMedia(media);
        } else {
          // it's a video
          let media = photographerMedia.find(
            (media) => media.video == currentMedia
          );
          showNextMedia(media);
        }
      });

      function showPreviousMedia(current) {
        let idx = photographerMedia.indexOf(current);
        let previousMedia = photographerMedia[idx - 1];

        if (previousMedia === undefined) {
          previousMedia = photographerMedia[photographerMedia.length - 1];
        }

        if (previousMedia.image !== undefined) {
          // it's an image
          mediaContainer.innerHTML = `<img class="lightbox_media" src="assets/photographers/media/${previousMedia.image}">`;
          localStorage.setItem(
            "current-media",
            previousMedia.image.split("/").slice(-1)[0]
          );
          labelLightbox.innerHTML = `<p>${previousMedia.title}</p>`;
        } else {
          mediaContainer.innerHTML = `<video class="lightbox_media" src="assets/photographers/media/${previousMedia.video}" controls></video>`;
          localStorage.setItem(
            "current-media",
            previousMedia.video.split("/").slice(-1)[0]
          );
          labelLightbox.innerHTML = `<p>${previousMedia.title}</p>`;
        }
      }

      previousMediaIcon.addEventListener("click", function (e) {
        let currentMedia = localStorage.getItem("current-media");
        let media = photographerMedia.find(
          (media) => media.image == currentMedia
        );
        if (media !== undefined) {
          // it's a photo
          showPreviousMedia(media);
        } else {
          // it's a video
          let media = photographerMedia.find(
            (media) => media.video == currentMedia
          );
          showPreviousMedia(media);
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.code == "ArrowRight") {
          if (lightbox.style.display == "block") {
            let currentMedia = localStorage.getItem("current-media");
            let media = photographerMedia.find(
              (media) => media.image == currentMedia
            );
            if (media !== undefined) {
              // it's a photo
              showNextMedia(media);
            } else {
              // it's a video
              let media = photographerMedia.find(
                (media) => media.video == currentMedia
              );
              showNextMedia(media);
            }
          }
        } else if (event.code == "ArrowLeft") {
          if (lightbox.style.display == "block") {
            let currentMedia = localStorage.getItem("current-media");
            let media = photographerMedia.find(
              (media) => media.image == currentMedia
            );
            if (media !== undefined) {
              // it's a photo
              showPreviousMedia(media);
            } else {
              // it's a video
              let media = photographerMedia.find(
                (media) => media.video == currentMedia
              );
              showPreviousMedia(media);
            }
          }
        } else if (event.code == "Escape") {
          if (lightbox.style.display == "block") {
            closeModal();
          }
          if (contactModal.style.display == "block") {
            closeModal();
          }
        }
      });

      for (media of photographerMedia) {
        totalLikes += media.likes;
      }
      // photographerMedia.forEach((media) => {
      //   totalLikes += media.likes;
      // });
      number.innerText = totalLikes;
      likes.append(number, heart);
      setAttributes(price, {
        tabIndex: 0,
        ariaLabel: photographer.price,
      });
      price.innerText = photographer.price + "/jour";
      prices.className = "prices-container";

      prices.append(likes, price);
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
      reponse = photographer.name;
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
